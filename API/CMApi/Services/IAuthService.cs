using System.Security.Claims;
using CMApi.Models.Requests;

namespace CMApi.Services
{
    public interface IAuthService
    {
        Task<ClaimsPrincipal> LoginUser(LoginRequest request);
        Task<bool> DoesResetTokenExist(string resetToken);
        Task UpdatePassword(PasswordUpdateRequest request);
    }
}
