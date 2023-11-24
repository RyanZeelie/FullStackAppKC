using CMApi.Models.DomainModels;

namespace CMApi.Repositories;

public interface IClassRepository
{
    Task<IEnumerable<Class>> GetClasses();
    Task<IEnumerable<Class>> GetClassesByGradeCourseId(int gradeCourseId);
    Task CreateClass(Class classModel);
    Task UpdateClass(Class classModel);
    Task<int> StartClass(int classId, int semesterNumber);
    Task EndClass(int classId);
}
