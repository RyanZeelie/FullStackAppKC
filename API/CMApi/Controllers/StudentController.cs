using CMApi.Models.DomainModels;
using CMApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StudentController : ControllerBase
{
    private readonly IStudentService _studentService;

    public StudentController(IStudentService studentService) 
    {
        _studentService = studentService;
    }

    [HttpGet]
    [Route("/get-students")]
    public async Task<ActionResult<Student>> GetStudents()
    {
        var students = await _studentService.GetStudents();

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
}
