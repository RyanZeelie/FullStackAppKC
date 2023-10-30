using CMApi.Models.DomainModels;

namespace CMApi.Repositories;

public interface IClassRepository
{
    Task<IEnumerable<Class>> GetClasses();
    Task<IEnumerable<Class>> GetClassesByGradeCourseId(int gradeCourseId);
    Task CreateClass(Class classModel);
    Task UpdateClass(Class classModel);
    Task StartClass(int classId);
    Task EndClass(int classId);
}
