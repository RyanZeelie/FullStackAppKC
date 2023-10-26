using CMApi.Models.DomainModels;
using CMApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClassController : ControllerBase
{
    private readonly IClassService _classService;

    public ClassController(IClassService classService)
    {
        _classService = classService;
    }

    [HttpGet]
    [Route("/get-classes")]
    public async Task<ActionResult<List<Class>>> GetClasses()
    {
        var classes = await _classService.GetClasses();

        return Ok(classes);
    }

    [HttpPost]
    [Route("/create-class")]
    public async Task<IActionResult> CreateClass(Class classModel)
    {
        await _classService.CreateClass(classModel);

        return Ok();
    }

    [HttpPut]
    [Route("/update-class")]
    public async Task<IActionResult> UpdateClass(Class classModel)
    {
        await _classService.UpdateClass(classModel);

        return Ok();
    }
}
