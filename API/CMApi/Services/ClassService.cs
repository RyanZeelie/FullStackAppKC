using System.Data;
using CMApi.Data;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Repositories;

namespace CMApi.Services;

public class ClassService : IClassService
{
    private readonly IClassRepository _classRepository;
    private readonly IStudentRepository _studentRepository; 
    private IDataContext _context;

    public ClassService(IClassRepository classRepository, IStudentRepository studentRepository, IDataContext context)
    {
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
        }
        catch(Exception ex)
        {
            transaction.Rollback();
        }
       
    }

    public async Task EndClass(StartEndClassRequest classModel)
    {
        await _classRepository.EndClass(classModel.ClassId);

        // If its not the 4th semester, restart the class with a new semester number
        if (classModel.SemesterNumber != 4)
        {
            classModel.SemesterNumber++;
            await StartClass(classModel);
        }
    }
}
