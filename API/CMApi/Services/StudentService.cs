using CMApi.Models.DomainModels;
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
}
