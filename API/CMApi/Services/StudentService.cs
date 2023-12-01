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

    public async Task AddStudentsToClass(AddStudentToClassRequest request)
    {
        foreach (var studentId in request.StudentIds)
        {
            var existingScoreCard = await _studentRepository.GetExistingScoreCardForStudent(request.SemesterId, studentId);

            if(existingScoreCard is null) 
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
            }
        }
    }
}
