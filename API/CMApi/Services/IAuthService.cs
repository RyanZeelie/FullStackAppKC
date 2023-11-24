using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Models.Responses;
using System.IdentityModel.Tokens.Jwt;

namespace CMApi.Services
{
    public interface IAuthService
    {
        string GenerateToken(User user);
        Task<LoginResponse> LoginUser(LoginRequest request);
    }
}
