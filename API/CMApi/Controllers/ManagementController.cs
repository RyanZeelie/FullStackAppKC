using CMApi.Enums;
using CMApi.Factories;
using CMApi.Models.DomainModels;
using CMApi.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/")]
[ApiController]
public class ManagementController : ControllerBase
{
    private readonly IViewModelFactory _viewModelFactory;
    public ManagementController(IViewModelFactory viewModelFactory)
    {
        _viewModelFactory = viewModelFactory;
    }

    [Authorize]
    [HttpGet]
    [Route("get-dashboard")]
    public async Task<ActionResult<Student>> GetDashboardView()
    {
        var dashboardView = await _viewModelFactory.GetViewModel(ViewModelsEnum.Dashboard, 0);

        return Ok(dashboardView);
    }

    [HttpGet]
    [Route("get-class-overview/{gradeCourseId}")]
    public async Task<ActionResult<OverviewViewmodel>> GetClassOverView(int gradeCourseId)
    {
        var classOverview = await _viewModelFactory.GetViewModel(ViewModelsEnum.Overview, gradeCourseId);

        return Ok(classOverview);
    }
}