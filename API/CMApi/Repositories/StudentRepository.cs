using CMApi.Data;
using System.Data;
using CMApi.Models.DomainModels;
using Dapper;

namespace CMApi.Repositories;

public class StudentRepository : IStudentRepository
{
    private IDbConnection _dbConnection { get { return _dataContext.DbConnection; } }
    private IDbTransaction _dbTransaction { get { return _dataContext.DbTransaction; } }
    private IDataContext _dataContext;

    public StudentRepository(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<IEnumerable<Student>> GetStudents()
    {
        var query = @"SELECT
                        s.*,
                        c.Name AS ClassName,
                        g.Name AS GradeName,
                        cr.Name AS CourseName
                    FROM Student s
                    JOIN Class c 
                        ON c.Id = s.ClassId
                    JOIN GradeCourse gc 
                        ON gc.Id = c.GradeCourseId
                    JOIN Grade g 
                        ON g.Id = gc.GradeId
                    JOIN Course cr
                        ON cr.Id = gc.CourseId";

        return await _dbConnection.QueryAsync<Student>(query, _dbTransaction);
    }

    public Task CreateStudent(Student student)
    {
        var query = @"INSERT INTO Student (EnglishName, Surname, ChineseName, ClassId)
                    VALUES (@EnglishName, @Surname, @ChineseName, @ClassId)";

        return _dbConnection.ExecuteAsync(query, student, _dbTransaction);
    }

    public Task UpdateStudent(Student student)
    {
        var query = @"UPDATE Student 
                        SET EnglishName = @EnglishName , Surname = @Surname,
                        ChineseName = @ChineseName, ClassId = @ClassId
                        WHERE Id = @Id";

        return _dbConnection.ExecuteAsync(query, student, _dbTransaction);
    }
}
