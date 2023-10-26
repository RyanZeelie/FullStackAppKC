using System.Collections;
using CMApi.Models.DomainModels;
using CMApi.Repositories;

namespace CMApi.Services;

public class AdminService : IAdminService
{
    private readonly IAdminRepository _adminRepository;

    public AdminService(IAdminRepository adminRepository)
    {
        _adminRepository = adminRepository;
    }

    public async Task<IEnumerable<Grade>> GetAllGrades()
    {
        return await _adminRepository.GetGrades();
    }

    public async Task<IEnumerable<Course>> GetAllCourses()
    {
        return await _adminRepository.GetCourses();
    }

    public async Task<IEnumerable<Level>> GetAllLevels()
    {
        return await _adminRepository.GetLevels();
    }

    public async Task<IEnumerable<GradeCourse>> GetGradesCourses()
    {
        return await _adminRepository.GetGradesCourses();
    }

    public async Task CreateGrade(Grade grade)
    {
        await _adminRepository.CreateGrade(grade);
    }

    public async Task CreateCourse(Course course)
    {
        await _adminRepository.CreateCourse(course);
    }

    public async Task CreateLevel(Level level)
    {
        await _adminRepository.CreateLevel(level);
    }

    public async Task CreateGradeCourse(GradeCourse gradeCourse)
    {
        await _adminRepository.CreateGradeCourse(gradeCourse);
    }


    public async Task UpdateGrade(Grade grade)
    {
        await _adminRepository.UpdateGrade(grade);
    }

    public async Task UpdateCourse(Course course)
    {
        await _adminRepository.UpdateCourse(course);
    }

    public async Task UpdateLevel(Level level)
    {
        await _adminRepository.UpdateLevel(level);
    }
    public async Task UpdateGradeCourse(GradeCourse gradeCourse)
    {
        await _adminRepository.UpdateGradeCourse(gradeCourse);
    }

}
