using CMApi.Models.DomainModels;

namespace CMApi.Repositories
{
    public interface IAdminRepository
    {
        Task<IEnumerable<Grade>> GetGrades();
        Task<IEnumerable<Course>> GetCourses();
        Task<IEnumerable<Level>> GetLevels();
        Task<IEnumerable<GradeCourse>> GetGradesCourses();

        Task UpdateGrade(Grade grade);
        Task UpdateCourse(Course grade);
        Task UpdateLevel(Level grade);
        Task UpdateGradeCourse(GradeCourse gradeCourse);

        Task CreateGrade(Grade grade);
        Task CreateCourse(Course grade);
        Task CreateLevel(Level grade);
        Task CreateGradeCourse(GradeCourse gradeCourse);
    }
}
