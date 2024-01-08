using System.Data;
using CMApi.Data;
using CMApi.Helpers;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Repositories;

namespace CMApi.Services;

public class ClassService : IClassService
{
    private readonly ILogger<ClassService> _logger;
    private readonly IClassRepository _classRepository;
    private readonly IStudentRepository _studentRepository; 
    private IDataContext _context;

    public ClassService(ILogger<ClassService> logger, IClassRepository classRepository, IStudentRepository studentRepository, IDataContext context)
    {
        _logger = logger;
        _classRepository = classRepository;
        _studentRepository = studentRepository;
        _context = context;
    }

    public Task<IEnumerable<Class>> GetClasses()
    {
        return _classRepository.GetClasses();
    }

    public async Task<IEnumerable<Class>> GetClassesByGradeCourseId (int gradeCourseId)
    {
        return await _classRepository.GetClassesByGradeCourseId(gradeCourseId);
    }

    public Task CreateClass(Class classModel)
    {
        return _classRepository.CreateClass(classModel);
    }

    public Task UpdateClass(Class classModel)
    {
        return _classRepository.UpdateClass(classModel);
    }

    public async Task StartClass(StartEndClassRequest classModel)
    {
        using var transaction = _context.BeginTransaction();

        try
        {
            var newSemesterId = await _classRepository.StartClass(classModel.ClassId, classModel.SemesterNumber);

            var scoreCards = new List<Score>();

            foreach (var studentId in classModel.StudentIds)
            {
                scoreCards.Add(new Score()
                {
                    StudentId = studentId,
                    SemesterId = newSemesterId,
                    IsTestTaken = false,
                    Recommendation = null,
                    Listening = 0,
                    Reading = 0,
                    Writing = 0
                });
            }

            await _studentRepository.StartClass(newSemesterId, scoreCards);

            transaction.Commit();

            var logMessage = LogMessageHelpers.CreateSuccessfulProcessLogMessage("Class Started");
            _logger.LogInformation(logMessage);
        }
        catch(Exception ex)
        {
            transaction.Rollback();

            var logMessage = LogMessageHelpers.CreateExceptionLogMessage(ex.Message);
            _logger.LogError(logMessage);
        }
       
    }

    public async Task EndClass(StartEndClassRequest classModel)
    {
        using var transaction = _context.BeginTransaction();

        try
        {
            await _classRepository.EndClass(classModel.ClassId);

            var logMessage = LogMessageHelpers.CreateSuccessfulProcessLogMessage("Class Ended");
            
            // If its not the 2th semester, restart the class with a new semester number
            if (classModel.SemesterNumber != 2 && classModel.StudentIds.Count > 0)
            {
                classModel.SemesterNumber++;
                await StartClass(classModel);

                logMessage = LogMessageHelpers.CreateSuccessfulProcessLogMessage("Class ended and new semester started");
            }

            transaction.Commit();   

            _logger.LogInformation(logMessage);
        }
        catch(Exception ex)
        {
            transaction.Rollback();

            var logMessage = LogMessageHelpers.CreateExceptionLogMessage(ex.Message);
            _logger.LogError(logMessage);
        }
    }
}
