using CMApi.Models.Responses;
using CMApi.Repositories;

namespace CMApi.Services
{
    public class ManagementService : IManagementService
    {
        private readonly IManagementRepository _managementRepository;

        public ManagementService(IManagementRepository managementRepository) 
        { 
            _managementRepository = managementRepository;
        }

        public async Task<IEnumerable<DashboardCardModel>> GetDashboardCard()
        {
            return await _managementRepository.GetDashboardCard();
        }
    }
}
