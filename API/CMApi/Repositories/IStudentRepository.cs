using CMApi.Models.DomainModels;

namespace CMApi.Repositories;

public interface IStudentRepository
{
    Task<IEnumerable<Student>> GetStudents();
    Task CreateStudent(Student student);
    Task UpdateStudent(Student student);    
}
