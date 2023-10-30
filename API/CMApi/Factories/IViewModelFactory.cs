using CMApi.Enums;
using CMApi.Interfaces.ViewModels;

namespace CMApi.Factories;

public interface IViewModelFactory
{
    Task<IViewModel> GetViewModel(ViewModelsEnum view, int gradeCourseId);
}
