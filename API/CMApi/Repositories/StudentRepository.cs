using CMApi.Data;
using System.Data;
using CMApi.Models.DomainModels;
using Dapper;
using CMApi.Models.Responses;

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
	                    ISNULL(g.Name, 'Unassigned') AS GradeName,
	                    ISNULL(c.Name, 'Unassigned') AS CourseName,
	                    ISNULL(cl.Name, 'Unnasigned') AS ClassName
                    FROM Student s
                    LEFT JOIN GradeCourse gc
                        ON gc.Id = s.GradeCourseId
                    LEFT JOIN Grade g
                        ON g.Id = gc.GradeId
                    LEFT JOIN Course c
                        ON c.Id = gc.CourseId
                    LEFT JOIN (
	                    SELECT 
		                    sc.*,
		                    s.ClassId AS ClassID
	                    FROM Score sc 
	                    INNER JOIN Semester s
		                    ON s.Id = sc.SemesterId 
			                    AND s.EndDate is null
                        WHERE sc.IsActive = 1
			                    ) AS sc
	                    ON sc.StudentId = s.Id
                    LEFT JOIN Class cl
	                    ON cl.Id = sc.ClassID";

        return await _dbConnection.QueryAsync<Student>(query, _dbTransaction);
    }

    public async Task<List<Student>> GetUnassignedStudents(int gradeCourseId)
    {
        var query = @"SELECT
	                    s.*     
                    FROM Student s
                    LEFT JOIN (
                    SELECT 
	                    sc.*,
	                    s.ClassId AS ClassID
                    FROM Score sc 
                    INNER JOIN Semester s
	                    ON s.Id = sc.SemesterId 
		                    AND s.EndDate is null
                    WHERE sc.IsActive = 1
		                    ) AS sc
	                    ON sc.StudentId = s.Id
                    LEFT JOIN Class cl
	                    ON cl.Id = sc.ClassID
                    WHERE s.GradeCourseId = @GradeCourseId
	                    AND cl.Name is null";

        var results =  await _dbConnection.QueryAsync<Student>(query, new { GradeCourseId = gradeCourseId }, _dbTransaction);

        return results.ToList();
    }

    public async Task<List<Student>> GetCurrentSemesterStudents(int semesterId)
    {
        var query = @"SELECT
                        s.*
                    FROM Student s
					INNER JOIN Score sc 
                        ON SC.StudentId = s.Id
					WHERE sc.SemesterId = @SemesterId
                        AND sc.IsActive = 1";

        var results = await _dbConnection.QueryAsync<Student>(query, new { SemesterId = semesterId }, _dbTransaction);

        return results.ToList();
    }

    public Task CreateStudent(Student student)
    {
        var query = @"INSERT INTO Student (EnglishName, Surname, ChineseName, GradeCourseId)
                    VALUES (@EnglishName, @Surname, @ChineseName, @GradeId)";

        return _dbConnection.ExecuteAsync(query, student, _dbTransaction);
    }

    public Task UpdateStudent(Student student)
    {
        var query = @"UPDATE Student 
                        SET EnglishName = @EnglishName , Surname = @Surname,
                        ChineseName = @ChineseName, GradeCourseId = @GradeId
                        WHERE Id = @Id";

        return _dbConnection.ExecuteAsync(query, student, _dbTransaction);
    }

    public async Task<IEnumerable<StudentResult>> GetStudentOverView(int classId)
    {
        var query = @"SELECT 
                        sc.Id As ScoreId,
	                    s.Id AS StudentId,
	                    s.EnglishName,
	                    s.Surname,
	                    s.ChineseName,
	                    sc.Listening AS Listening,
	                    sc.Reading AS Reading_Writing,
	                    sc.IsTestTaken AS TestTaken,
	                    CAST(((sc.Listening + sc.Reading + sc.Writing)/ l.Total) *100 AS DECIMAL(10, 2)) AS Total,
	                    sc.Recommendation AS Recommendation
	                    --'BookTODO' AS Book
	                    FROM 
	                    Student s
                    JOIN Score sc
	                    ON sc.StudentId = s.Id
                    JOIN Semester sm
	                    ON sm.Id = sc.SemesterId
		                    AND sm.ClassId = @ClassId
                    JOIN Class c
	                    ON sm.ClassId = c.Id
                    JOIN Level l
	                    ON l.Id = c.LevelId
                    WHERE sm.StartDate is not null
	                    AND sm.EndDate is null
                        AND sc.IsActive = 1";

        return await _dbConnection.QueryAsync<StudentResult>(query,new { classId }, _dbTransaction);
    }

    public Task StartClass(int semesterId, List<Score> scoreCards)
    {
        var query = @"INSERT INTO Score 
                        (StudentId, SemesterId, IsTestTaken, Recommendation, Listening, Reading, Writing, IsActive) 
                    VALUES 
                        (@StudentId, @SemesterId, @IsTestTaken, @Recommendation, @Listening, @Reading, @Writing, 1)";

        return _dbConnection.ExecuteAsync(query, scoreCards, _dbTransaction);
    }

    public Task DropStudentFromClass(int scoreCardId)
    {
        var query = @"UPDATE Score
                     SET IsActive = 0
                    WHERE Id = @Id";

        return _dbConnection.ExecuteAsync(query, new { Id = scoreCardId }, _dbTransaction);
    }

    public Task AddStudentToClass(Score scoreCard)
    {
        var query = @"INSERT INTO Score 
                        (StudentId, SemesterId, IsTestTaken, Recommendation, Listening, Reading, Writing, IsActive) 
                    VALUES 
                        (@StudentId, @SemesterId, @IsTestTaken, @Recommendation, @Listening, @Reading, @Writing, 1)";

        return _dbConnection.ExecuteAsync(query, scoreCard, _dbTransaction);
    }
}
