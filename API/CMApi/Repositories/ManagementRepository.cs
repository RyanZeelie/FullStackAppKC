using CMApi.Data;
using System.Data;
using CMApi.Models.Responses;
using Dapper;

namespace CMApi.Repositories;

public class ManagementRepository : IManagementRepository
{
    private IDbConnection _dbConnection { get { return _dataContext.DbConnection; } }
    private IDbTransaction _dbTransaction { get { return _dataContext.DbTransaction; } }
    private IDataContext _dataContext;

    public ManagementRepository(IDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<IEnumerable<DashboardCardModel>> GetDashboardCard()
    {
        var query = @"SELECT 
                        *
                    FROM View_Dashboard";

        return await _dbConnection.QueryAsync<DashboardCardModel>(query, _dbTransaction);
    }

    public async Task<IEnumerable<DashboardCardModel>> GetClassOverview()
    {
        var query = @"SELECT 
                        cr.Id AS CourseId,
                        cr.Name AS CourseName,
                    	gc.Id AS GradeCourseId,
                        g.Id AS GradeId,
                        g.Name AS GradeName,
                        COUNT(DISTINCT s.Id) AS StudentCount,
                        COUNT(DISTINCT c.Id) AS ClassCount
                    FROM Class c
                    JOIN GradeCourse gc 
                        ON gc.Id = c.GradeCourseId
                    JOIN Grade g 
                        ON g.Id = gc.GradeId
                    JOIN Course cr 
                        ON cr.Id = gc.CourseId
                    LEFT JOIN Student s 
                        ON s.GradeCourseId = c.GradeCourseId
                    GROUP BY 
                        cr.Id, cr.Name, g.Id, g.Name,gc.Id";

        return await _dbConnection.QueryAsync<DashboardCardModel>(query, _dbTransaction);
    }
}
