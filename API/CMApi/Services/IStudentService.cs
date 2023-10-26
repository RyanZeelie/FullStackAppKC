using CMApi.Models.DomainModels;

namespace CMApi.Services;

public interface IStudentService
{
    Task<IEnumerable<Student>> GetStudents();
    Task CreateStudent(Student student);
    Task UpdateStudent(Student student);
}
