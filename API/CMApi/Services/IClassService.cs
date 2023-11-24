using CMApi.Models.DomainModels;
using CMApi.Models.Requests;

namespace CMApi.Services;

public interface IClassService
{
    Task<IEnumerable<Class>> GetClasses();
    Task<IEnumerable<Class>> GetClassesByGradeCourseId(int gradeCourseId);
    Task CreateClass(Class classModel);
    Task UpdateClass(Class classModel);
    Task StartClass(StartEndClassRequest classModel);
    Task EndClass(StartEndClassRequest classModel);
}
