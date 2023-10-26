using CMApi.Models.DomainModels;

namespace CMApi.Repositories;

public interface IClassRepository
{
    Task<IEnumerable<Class>> GetClasses();
    Task CreateClass(Class classModel);
    Task UpdateClass(Class classModel);
}
