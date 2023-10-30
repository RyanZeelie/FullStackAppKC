using CMApi.Models.DomainModels;
using CMApi.Models.Responses;

namespace CMApi.Repositories;

public interface IStudentRepository
{
    Task<IEnumerable<Student>> GetStudents();
    Task CreateStudent(Student student);
    Task UpdateStudent(Student student);
    Task<IEnumerable<StudentResult>> GetStudentOverView(int classId);
}
