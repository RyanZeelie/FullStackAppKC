using CMApi.Models.DomainModels;
using CMApi.Repositories;
using CMApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly IAdminRepository _adminRepository; 

    public AdminController(IAdminRepository adminRepository)
    {
        _adminRepository = adminRepository;
    }

    [HttpGet]
    [Route("/get-grades")]
    public async Task<ActionResult<List<Grade>>> GetGrades()
    {
        var grades =  await _adminRepository.GetGrades();

        return Ok(grades);
    }

    [HttpGet]
    [Route("/get-courses")]
    public async Task<ActionResult<List<Course>>> GetCourses()
    {
        var courses = await _adminRepository.GetCourses();

        return Ok(courses);
    }

    [HttpGet]
    [Route("/get-levels")]
    public async Task<ActionResult<List<Level>>> GetLevels()
    {
        var courses = await _adminRepository.GetLevels();

        return Ok(courses);
    }

    [HttpGet]
    [Route("/get-grade-course")]
    public async Task<ActionResult<List<Level>>> GetGradeCourse()
    {
        var gradesCourses = await _adminRepository.GetGradesCourses();

        return Ok(gradesCourses);
    }

    [HttpPost]
    [Route("/create-grade")]
    public async Task<IActionResult> CreateGrade(Grade grade)
    {
        await _adminRepository.CreateGrade(grade);

        return Ok();
    }

    [HttpPost]
    [Route("/create-course")]
    public async Task<IActionResult> CreateCourse(Course course)
    {
        await _adminRepository.CreateCourse(course);

        return Ok();
    }

    [HttpPost]
    [Route("/create-level")]
    public async Task<IActionResult> CreateLevel(Level level)
    {
        await _adminRepository.CreateLevel(level);

        return Ok();
    }

    [HttpPost]
    [Route("/create-grade-course")]
    public async Task<IActionResult> CreateGradeCourse(GradeCourse gradeCourse)
    {
        await _adminRepository.CreateGradeCourse(gradeCourse);

        return Ok();
    }

    [HttpPut]
    [Route("/update-grade")]
    public async Task<IActionResult> UpdateGrade(Grade grade)
    {
        await _adminRepository.UpdateGrade(grade);

        return Ok();
    }

    [HttpPut]
    [Route("/update-course")]
    public async Task<IActionResult> UpdateCourse(Course course)
    {
        await _adminRepository.UpdateCourse(course);

        return Ok();
    }

    [HttpPut]
    [Route("/update-level")]
    public async Task<IActionResult> UpdateLevel(Level level)
    {
        await _adminRepository.UpdateLevel(level);

        return Ok();
    }

    [HttpPut]
    [Route("/update-grade-course")]
    public async Task<IActionResult> UpdateGradeCourse(GradeCourse gradeCourse)
    {
        await _adminRepository.UpdateGradeCourse(gradeCourse);

        return Ok();
    }
}
