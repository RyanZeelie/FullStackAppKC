
using CMApi.ActionFilters;
using CMApi.Enums;
using CMApi.Factories;
using CMApi.Models.DomainModels;
using CMApi.Models.Responses;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;


[TypeFilter(typeof(EndpointPerformanceFilter))]
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
public class ManagementController : ControllerBase
{
    private readonly IViewModelFactory _viewModelFactory;
    public ManagementController(IViewModelFactory viewModelFactory)
    {
        _viewModelFactory = viewModelFactory;
    }

    [ApiVersion("1.0")]
    [HttpGet]
    [Route("get-dashboard")]
    public async Task<ActionResult<Student>> GetDashboardView()
    {
        var dashboardView = await _viewModelFactory.GetViewModel(ViewModelsEnum.Dashboard, 0);

        return Ok(dashboardView);
    }

    [ApiVersion("2.0")]
    [HttpGet]
    [Route("get-class-overview/{gradeCourseId}")]
    public async Task<ActionResult<OverviewViewmodel>> GetClassOverView(int gradeCourseId)
    {
        var classOverview = await _viewModelFactory.GetViewModel(ViewModelsEnum.Overview, gradeCourseId);

        return Ok(classOverview);
    }
}