using System.Data;
using CMApi.Data;
using CMApi.Models.DomainModels;
using Dapper;

namespace CMApi.Repositories;

public class AdminRepository : IAdminRepository
{
    private IDbConnection _dbConnection { get { return _dataContext.DbConnection; } }
    private IDbTransaction _dbTransaction { get { return _dataContext.DbTransaction; } }
    private IDataContext _dataContext;

    public AdminRepository(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<IEnumerable<Course>> GetCourses()
    {
        var query = @"SELECT
                        * 
                    FROM Course";

        return await _dbConnection.QueryAsync<Course>(query, _dbTransaction);
    }

    public async Task<IEnumerable<Grade>> GetGrades()
    {
        var query = @"SELECT
                        * 
                    FROM Grade";

        return await _dbConnection.QueryAsync<Grade>(query, _dbTransaction);
    }

    public async Task<IEnumerable<Level>> GetLevels()
    {
        var query = @"SELECT
                        * 
                    FROM Level";

        return await _dbConnection.QueryAsync<Level>(query, _dbTransaction);
    }

    public async Task<IEnumerable<GradeCourse>> GetGradesCourses()
    {
        var query = @"SELECT
                        gc.*,
                        g.Name AS GradeName,
                        c.Name AS CourseName
                    FROM GradeCourse gc
                    JOIN Grade g
                        ON g.Id = gc.GradeId
                    JOIN Course c
                        ON c.Id = gc.CourseId ";

        return await _dbConnection.QueryAsync<GradeCourse>(query, _dbTransaction);
    }


    public Task CreateCourse(Course course)
    {
        var query = @"INSERT INTO Course (Name)
                    VALUES (@Name)";

        return _dbConnection.ExecuteAsync(query, new { Name = course.Name }, _dbTransaction);
    }

    public Task CreateGrade(Grade grade)
    {
        var query = @"INSERT INTO Grade (Name)
                    VALUES (@Name)";

        return _dbConnection.ExecuteAsync(query, new { Name = grade.Name }, _dbTransaction);
    }

    public Task CreateLevel(Level level)
    {
        var query = @"INSERT INTO Level (Name, Total)
                    VALUES (@Name, @Total)";

        return _dbConnection.ExecuteAsync(query, new { Name = level.Name, Total = level.Total }, _dbTransaction);
    }

    public Task CreateGradeCourse(GradeCourse gradeCourse)
    {
        var query = @"INSERT INTO GradeCourse (GradeId, CourseId)
                    VALUES (@GradeId, @CourseId)";

        return _dbConnection.ExecuteAsync(query, gradeCourse, _dbTransaction);
    }


    public Task UpdateCourse(Course course)
    {
        var query = @"UPDATE Course
                    SET Name = @Name 
                    WHERE Id = @Id";

        return _dbConnection.ExecuteAsync(query, course, _dbTransaction);
    }

    public Task UpdateGrade(Grade grade)
    {
        var query = @"UPDATE Grade
                    SET Name = @Name 
                    WHERE Id = @Id";

        return _dbConnection.ExecuteAsync(query, grade, _dbTransaction);
    }

    public Task UpdateLevel(Level level)
    {
        var query = @"UPDATE Level
                    SET Name = @Name, Total = @Total 
                    WHERE Id = @Id"
        ;

        return _dbConnection.ExecuteAsync(query, level, _dbTransaction);
    }

    public Task UpdateGradeCourse(GradeCourse gradeCourse)
    {
        var query = @"UPDATE GradeCourse
                    SET GradeId = @GradeId, CourseId = @CourseId 
                    WHERE Id = @Id"
        ;

        return _dbConnection.ExecuteAsync(query, gradeCourse, _dbTransaction);
    }
}
