using CMApi.Models.Responses;

namespace CMApi.Services;

public interface IManagementService
{
    Task<IEnumerable<DashboardCardModel>> GetDashboardCard();
}
