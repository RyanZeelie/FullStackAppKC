using CMApi.Models.DomainModels;

namespace CMApi.Repositories
{
    public interface IAdminRepository
    {
        List<Grade> GetGrades();
        List<Course> GetCourses();
        List<Level> GetLevels();

        void UpdateGrade(Grade grade);
        void UpdateCourse(Course grade);
        void UpdateLevel(Level grade);

        void CreateGrade(Grade grade);
        void CreateCourse(Course grade);
        void CreateLevel(Level grade);
    }
}
