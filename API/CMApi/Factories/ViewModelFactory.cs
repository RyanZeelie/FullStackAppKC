using CMApi.Enums;
using CMApi.Interfaces.ViewModels;
using CMApi.Models.DomainModels;
using CMApi.Models.Responses;
using CMApi.Services;

namespace CMApi.Factories;

public class ViewModelFactory : IViewModelFactory
{
    private readonly IManagementService _managementService;
    private readonly IStudentService _studentService;
    private readonly IClassService _classService;
    public ViewModelFactory(IManagementService managementService, IStudentService studentService, IClassService classService)
    {
        _managementService = managementService;
        _studentService = studentService;
        _classService = classService;
    }

    public async Task<IViewModel> GetViewModel(ViewModelsEnum view, int gradeCourseId = 0)
    {
        switch (view)
        {
            case ViewModelsEnum.Dashboard:
                return await GetDashboardViewModel();
            case ViewModelsEnum.Overview:
                return await GetClassOverViewViewModel(gradeCourseId);
            default: throw new NotImplementedException();
        }
    }

    private async Task<DashboardViewModel> GetDashboardViewModel()
    {
      
        var listOfDashboardCards = await _managementService.GetDashboardCard();
        var viewModel = new DashboardViewModel
        {
            DashboardCards = listOfDashboardCards
        };

        return viewModel;
    }

    private async Task<OverviewViewmodel> GetClassOverViewViewModel(int gradeCourseId)
    {   
        var ListOfClassOverviews = new List<ClassOverView>();

        var classes = await _classService.GetClassesByGradeCourseId(gradeCourseId);

        foreach (var studentClass in classes)
        {
            var students = await _studentService.GetStudentOverView(studentClass.Id);

            var overViewModel = new ClassOverView
            {
                ClassDetails = new Class() { Id = studentClass.Id, Name = studentClass.Name, StartDate = studentClass.StartDate, EndDate = studentClass.EndDate },
                Students = students
            };

            ListOfClassOverviews.Add(overViewModel);
        }

        return new OverviewViewmodel{ Classes = ListOfClassOverviews};
    }
}
