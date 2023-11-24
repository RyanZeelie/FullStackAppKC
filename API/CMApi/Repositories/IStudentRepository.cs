using CMApi.Models.DomainModels;
using CMApi.Models.Responses;

namespace CMApi.Repositories;

public interface IStudentRepository
{
    Task<IEnumerable<Student>> GetStudents();
    Task<List<Student>> GetUnassignedStudents(int gradeCourseId);
    Task<List<Student>> GetCurrentSemesterStudents(int semesterId);
    Task CreateStudent(Student student);
    Task UpdateStudent(Student student);
    Task<IEnumerable<StudentResult>> GetStudentOverView(int classId);
    Task StartClass(int semesterId, List<Score> scoreCards);
    Task DropStudentFromClass(int scoreCardId);
    Task AddStudentToClass(Score scoreCard);
}
