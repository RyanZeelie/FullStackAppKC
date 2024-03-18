using CMApi.Data;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using Dapper;
using System.Data;

namespace CMApi.Repositories;

public class ClassRepository : IClassRepository
{
    private IDbConnection _dbConnection { get { return _dataContext.DbConnection; } }
    private IDbTransaction _dbTransaction { get { return _dataContext.DbTransaction; } }
    private IDataContext _dataContext;
 
    public ClassRepository(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<IEnumerable<Class>> GetClasses()
    {
        var procName = "GetClasses";

        return await _dbConnection.QueryAsync<Class>(procName, _dbTransaction, commandType : CommandType.StoredProcedure);
    }

    public async Task<IEnumerable<Class>> GetClassesByGradeCourseId(int gradeCourseId)
    {
        var query = @"SELECT 
	                    c.Id AS Id,
                        c.Name AS Name,
	                    c.LevelId AS LevelId,
	                    sm.SemesterNumber,
                        sm.Id AS SemesterId,
	                    sm.StartDate,
	                    sm.EndDate,
	                    c.GradeCourseId AS GradeCourseId,
                        g.Name AS GradeName,
                        g.Id AS GradeId,
                        cr.Name AS CourseName,
                        l.Name AS LevelName,
                        l.Total AS TotalScore
                    FROM Class c
                    LEFT JOIN Semester sm
	                    ON sm.ClassId = c.Id
                            AND sm.EndDate IS NULL
                    JOIN GradeCourse gc
                        ON gc.Id = c.GradeCourseId
                    JOIN Grade g 
                        ON g.Id = gc.GradeId
                    JOIN Course cr 
                        ON cr.Id = gc.CourseId
                    JOIN Level l
                        ON l.Id = c.LevelId
                    WHERE gc.Id = @GradeCourseId";

        return await _dbConnection.QueryAsync<Class>(query, new { GradeCourseId = gradeCourseId },  _dbTransaction);
    }

    public Task CreateClass(Class classModel)
    {
        var query = @"INSERT INTO Class
                        (Name, GradeCourseId, LevelId, StartDate, EndDate)
                    VALUES(@Name, @GradeCourseId, @LevelId, @StartDate, @EndDate)";
        
        return _dbConnection.ExecuteAsync(query ,classModel, _dbTransaction);
    }

    public Task UpdateClass(Class classModel)
    {
        var query = @"UPDATE Class
                    SET Name = @Name, GradeCourseId = @GradeCourseId,
                        LevelId = @LevelId, StartDate = @StartDate, 
                        EndDate = @EndDate
                    WHERE Id = @Id";

        return _dbConnection.ExecuteAsync(query, classModel, _dbTransaction);
    }

    public Task<int> StartClass(int classId, int semesterNumber)
    {
        var startDate = DateTime.Now;

        var query = @"INSERT INTO Semester
                        (SemesterNumber, ClassId, StartDate)
                    VALUES
                        (@SemesterNumber, @ClassId, @StartDate)
                    SELECT SCOPE_IDENTITY()";
                    
        return _dbConnection.QueryFirstOrDefaultAsync<int>(query, new { StartDate = startDate, SemesterNumber = semesterNumber , ClassId = classId } , _dbTransaction);
    }

    public Task EndClass(int classId)
    {
        var endDate = DateTime.Now;

        var query = @"UPDATE Semester
                    SET EndDate = @EndDate
                    WHERE ClassId = @ClassId
                        AND EndDate is null";

        return _dbConnection.ExecuteAsync(query, new { EndDate = endDate, ClassId = classId }, _dbTransaction);
    }
}
