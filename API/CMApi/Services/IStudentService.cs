using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Models.Responses;

namespace CMApi.Services;

public interface IStudentService
{
    Task<IEnumerable<Student>> GetStudents();
    Task CreateStudent(Student student);
    Task UpdateStudent(Student student);
    Task<IEnumerable<StudentResult>> GetStudentOverView(int classId);
    Task AddStudentToClass(AddStudentToClassRequest request);
}
