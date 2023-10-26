using CMApi.Models.DomainModels;
using CMApi.Repositories;

namespace CMApi.Services;

public class ClassService : IClassService
{
    private readonly IClassRepository _classRepository;
    public ClassService(IClassRepository classRepository)
    {
        _classRepository = classRepository;
    }

    public Task<IEnumerable<Class>> GetClasses()
    {
        return _classRepository.GetClasses();
    }

    public Task CreateClass(Class classModel)
    {
        return _classRepository.CreateClass(classModel);
    }

    public Task UpdateClass(Class classModel)
    {
        return _classRepository.UpdateClass(classModel);
    }
}
