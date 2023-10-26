using CMApi.Models.DomainModels;
using CMApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet]
    [Route("/get-grades")]
    public async Task<ActionResult<List<Grade>>> GetGrades()
    {
        var grades =  await _adminService.GetAllGrades();

        return Ok(grades);
    }

    [HttpGet]
    [Route("/get-courses")]
    public async Task<ActionResult<List<Course>>> GetCourses()
    {
        var courses = await _adminService.GetAllCourses();

        return Ok(courses);
    }

    [HttpGet]
    [Route("/get-levels")]
    public async Task<ActionResult<List<Level>>> GetLevels()
    {
        var courses = await _adminService.GetAllLevels();

        return Ok(courses);
    }

    [HttpGet]
    [Route("/get-grade-course")]
    public async Task<ActionResult<List<Level>>> GetGradeCourse()
    {
        var gradesCourses = await _adminService.GetGradesCourses();

        return Ok(gradesCourses);
    }

    [HttpPost]
    [Route("/create-grade")]
    public async Task<IActionResult> CreateGrade(Grade grade)
    {
        await _adminService.CreateGrade(grade);

        return Ok();
    }

    [HttpPost]
    [Route("/create-course")]
    public async Task<IActionResult> CreateCourse(Course course)
    {
        await _adminService.CreateCourse(course);

        return Ok();
    }

    [HttpPost]
    [Route("/create-level")]
    public async Task<IActionResult> CreateLevel(Level level)
    {
        await _adminService.CreateLevel(level);

        return Ok();
    }

    [HttpPost]
    [Route("/create-grade-course")]
    public async Task<IActionResult> CreateGradeCourse(GradeCourse gradeCourse)
    {
        await _adminService.CreateGradeCourse(gradeCourse);

        return Ok();
    }

    [HttpPut]
    [Route("/update-grade")]
    public async Task<IActionResult> UpdateGrade(Grade grade)
    {
        await _adminService.UpdateGrade(grade);

        return Ok();
    }

    [HttpPut]
    [Route("/update-course")]
    public async Task<IActionResult> UpdateCourse(Course course)
    {
        await _adminService.UpdateCourse(course);

        return Ok();
    }

    [HttpPut]
    [Route("/update-level")]
    public async Task<IActionResult> UpdateLevel(Level level)
    {
        await _adminService.UpdateLevel(level);

        return Ok();
    }

    [HttpPut]
    [Route("/update-grade-course")]
    public async Task<IActionResult> UpdateGradeCourse(GradeCourse gradeCourse)
    {
        await _adminService.UpdateGradeCourse(gradeCourse);

        return Ok();
    }
}
