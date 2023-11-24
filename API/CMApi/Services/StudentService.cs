using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Models.Responses;
using CMApi.Repositories;

namespace CMApi.Services;

public class StudentService : IStudentService
{
    private readonly IStudentRepository _studentRepository;    
    public StudentService(IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
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

    public Task AddStudentToClass(AddStudentToClassRequest request)
    {
        var scoreCard = new Score()
        {
            StudentId = request.StudentId,
            SemesterId = request.SemesterId,
            IsTestTaken = false,
            Recommendation = null,
            Listening = 0,
            Reading = 0,
            Writing = 0
        };

        return _studentRepository.AddStudentToClass(scoreCard);
    }
}
