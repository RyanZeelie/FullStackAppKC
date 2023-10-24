using CMApi.Models.DomainModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        [HttpGet]
        [Route("/get-grades")]
        public async Task<List<Grade>> GetGrades()
        {
            var listofGrades = new List<Grade>();
            return listofGrades;
        }

        [HttpGet]
        [Route("/get-courses")]
        public async Task<List<Course>> GetCourses()
        {
            var listofGrades = new List<Course>();
            return listofGrades;
        }

        [HttpGet]
        [Route("/get-levels")]
        public async Task<List<Level>> GetLevels()
        {
            var listofGrades = new List<Level>();
            return listofGrades;
        }

        [HttpPost]
        [Route("/create-grade")]
        public async Task<IActionResult> CreateGrade(Grade grade)
        {
            return Ok();
        }

        [HttpPost]
        [Route("/create-course")]
        public async Task<IActionResult> CreateCourse(Course course)
        {
            return Ok();
        }


        [HttpPost]
        [Route("/create-level")]
        public async Task<IActionResult> CreateLevel(Level level)
        {
            return Ok();
        }

        [HttpPut]
        [Route("/update-grades")]
        public async Task<IActionResult> UpdateGrade(Grade grade)
        {
            return Ok();
        }

        [HttpPut]
        [Route("/update-course")]
        public async Task<IActionResult> UpdateCourse(Course course)
        {
            return Ok();
        }

        [HttpPut]
        [Route("/update-level")]
        public async Task<IActionResult> UpdateLevel(Level level)
        {
            return Ok();
        }
    }
}
