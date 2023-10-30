using CMApi.Models.Responses;

namespace CMApi.Repositories;

public interface IManagementRepository
{
    Task<IEnumerable<DashboardCardModel>> GetDashboardCard();
}
