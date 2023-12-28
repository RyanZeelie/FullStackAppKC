using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Repositories;
using CMApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClassController : ControllerBase
{
    private readonly IClassService _classService;
    private readonly IClassRepository _classRepository;

    public ClassController(IClassService classService, IClassRepository classRepository)
    {
        _classService = classService;
        _classRepository = classRepository;
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

    [HttpPost]
    [Route("/start-class")]
    public async Task<IActionResult> StartClass(StartEndClassRequest request)
    {
        await _classService.StartClass(request);

        return Ok();
    }

    [HttpPost]
    [Route("/end-class")]
    public async Task<IActionResult> EndClass(StartEndClassRequest request)
    {
        await _classService.EndClass(request);

        return Ok();
    }
}