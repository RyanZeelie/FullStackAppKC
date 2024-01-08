using CMApi.Data;
using CMApi.Helpers;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Models.Responses;
using CMApi.Repositories;

namespace CMApi.Services;

public class StudentService : IStudentService
{
    private readonly ILogger<StudentService> _logger;
    private readonly IStudentRepository _studentRepository;
    private readonly IDataContext _context;

    public StudentService(IStudentRepository studentRepository, IDataContext context, ILogger<StudentService> logger)
    {
        _studentRepository = studentRepository;
        _context = context;
        _logger = logger;
    }
    public Task CreateStudent(Student student)
    {
        return _studentRepository.CreateStudent(student);
    }

    public Task<IEnumerable<Student>> GetStudents()
    {
        return _studentRepository.GetStudents();
    }

    public Task UpdateStudent(Student student)
    {
        return _studentRepository.UpdateStudent(student);
    }

    public Task<IEnumerable<StudentResult>> GetStudentOverView(int classId)
    {
       return _studentRepository.GetStudentOverView(classId);
    }

    public async Task AddStudentsToClass(AddStudentToClassRequest request)
    {
        using var transaction = _context.BeginTransaction();

        try
        {
            foreach (var studentId in request.StudentIds)
            {
                var existingScoreCard = await _studentRepository.GetExistingScoreCardForStudent(request.SemesterId, studentId);

                var logMessage = LogMessageHelpers.CreateSuccessfulProcessLogMessage("Student added to class and score card created");

                if (existingScoreCard is null)
                {
                    var scoreCard = new Score()
                    {
                        StudentId = studentId,
                        SemesterId = request.SemesterId,
                        IsTestTaken = false,
                        Recommendation = null,
                        Listening = 0,
                        Reading = 0,
                        Writing = 0
                    };

                    await _studentRepository.AddStudentToClass(scoreCard);
                }
                else
                {
                    await _studentRepository.ReActivateScoreCard(existingScoreCard.Id);

                    logMessage = LogMessageHelpers.CreateSuccessfulProcessLogMessage("Student added to class and existing score card reactivated");
                }

                transaction.Commit();

                _logger.LogError(logMessage);
            }
        }
        catch (Exception ex)
        {
            transaction.Rollback();

            var logMessage = LogMessageHelpers.CreateExceptionLogMessage(ex.Message);
            _logger.LogError(logMessage);
        }
    }
}
