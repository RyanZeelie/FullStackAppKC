using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Repositories;
using CMApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;
    private readonly IStudentRepository _studentRepository;

    public StudentController(IStudentService studentService, IStudentRepository studentRepository) 
    {
        _studentService = studentService;
        _studentRepository = studentRepository;
    }

    [Authorize(Roles = "SuperUser")]
    [HttpGet]
    [Route("/get-students")]
    public async Task<ActionResult<Student>> GetStudents()
    {
        var students = await _studentService.GetStudents();

        return Ok(students);
    }

    [HttpGet]
    [Route("/get-unassigned-students-by-grade/{gradeCourseId}")]
    public async Task<ActionResult<Student>> GetUnassignedStudents(int gradeCourseId)
    {
        var students = await _studentRepository.GetUnassignedStudents(gradeCourseId);

        return Ok(students);
    }

    [HttpGet]
    [Route("/get-students-for-current-semester/{semesterId}")]
    public async Task<ActionResult<Student>> GetCurrentSemesterStudents(int semesterId)
    {
        var students = await _studentRepository.GetCurrentSemesterStudents(semesterId);

        return Ok(students);
    }

    [HttpPost]
    [Route("/create-student")]
    public async Task<ActionResult<Student>> CreateStudent(Student student)
    {
        await _studentService.CreateStudent(student);

        return Ok();
    }

    [HttpPut]
    [Route("/update-student")]
    public async Task<ActionResult<Student>> UpdateStudent(Student student)
    {
        await _studentService.UpdateStudent(student);

        return Ok();
    }

    [HttpPut]
    [Route("/drop-student-from-class/{scoreCardId}")]
    public async Task<ActionResult<Student>> DropStudentFromClass(int scoreCardId)
    {
        await _studentRepository.DropStudentFromClass(scoreCardId);

        return Ok();
    }

    [HttpPost]
    [Route("/add-students-to-class")]
    public async Task<ActionResult<Student>> AddStudentToclass(AddStudentToClassRequest request)
    {
        await _studentService.AddStudentsToClass(request);

        return Ok();
    }
}
