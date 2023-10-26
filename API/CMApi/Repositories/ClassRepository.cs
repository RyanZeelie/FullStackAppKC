using CMApi.Data;
using CMApi.Models.DomainModels;
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
        var query = @"SELECT 
                            c.*,
                            g.Name AS GradeName,
                            cr.Name AS CourseName,
                            l.Name AS LevelName
                        FROM Class c
                        JOIN GradeCourse gc
                            ON gc.Id = c.GradeCourseId
                        JOIN Grade g 
                            ON g.Id = gc.GradeId
                        JOIN Course cr 
                            ON cr.Id = gc.CourseId
                        JOIN Level l
                            ON l.Id = c.LevelId";

        return await _dbConnection.QueryAsync<Class>(query, _dbTransaction);
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
}
