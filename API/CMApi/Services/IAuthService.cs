using System.Security.Claims;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Models.Responses;

namespace CMApi.Services
{
    public interface IAuthService
    {
        Task<ClaimsPrincipal> LoginUser(LoginRequest request);
    }
}
