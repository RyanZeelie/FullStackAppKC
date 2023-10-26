using CMApi.Models.DomainModels;

namespace CMApi.Services;

public interface IAdminService
{
    Task<IEnumerable<Grade>> GetAllGrades();
    Task<IEnumerable<Course>> GetAllCourses();
    Task<IEnumerable<Level>> GetAllLevels();
    Task<IEnumerable<GradeCourse>> GetGradesCourses();

    Task CreateGrade(Grade grade);
    Task CreateCourse(Course course);
    Task CreateLevel(Level level);
    Task CreateGradeCourse(GradeCourse gradeCourse);

    Task UpdateGrade(Grade grade);
    Task UpdateCourse(Course course);
    Task UpdateLevel(Level level);
    Task UpdateGradeCourse(GradeCourse gradeCourse);
}
