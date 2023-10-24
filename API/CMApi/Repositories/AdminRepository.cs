using System.Data;
using CMApi.Data;
using CMApi.Models.DomainModels;

namespace CMApi.Repositories;

public class AdminRepository : IAdminRepository
{
    private IDbConnection _connection { get { return _dataContext.DbConnection; } }
    private IDbTransaction _dbTransaction { get { return _dataContext.DbTransaction; } }
    private IDataContext _dataContext;

    public AdminRepository(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }
    public void CreateCourse(Course grade)
    {
        throw new NotImplementedException();
    }

    public void CreateGrade(Grade grade)
    {
        throw new NotImplementedException();
    }

    public void CreateLevel(Level grade)
    {
        throw new NotImplementedException();
    }

    public List<Course> GetCourses()
    {
        throw new NotImplementedException();
    }

    public List<Grade> GetGrades()
    {
        throw new NotImplementedException();
    }

    public List<Level> GetLevels()
    {
        throw new NotImplementedException();
    }

    public void UpdateCourse(Course grade)
    {
        throw new NotImplementedException();
    }

    public void UpdateGrade(Grade grade)
    {
        throw new NotImplementedException();
    }

    public void UpdateLevel(Level grade)
    {
        throw new NotImplementedException();
    }
}
