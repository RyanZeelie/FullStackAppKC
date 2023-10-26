using CMApi.Models.DomainModels;

namespace CMApi.Services;

public interface IClassService
{
    Task<IEnumerable<Class>> GetClasses();
    Task CreateClass(Class classModel);
    Task UpdateClass(Class classModel);
}
