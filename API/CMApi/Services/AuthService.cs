using CMApi.Helpers;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Repositories;
using System.Security.Claims;

namespace CMApi.Services;

public class AuthService : IAuthService
{
    private IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ClaimsPrincipal> LoginUser(LoginRequest request)
    {
        var user = await _userRepository.GetUserForLogin(request.Email);

        if (user is null)
        {
            throw new Exception("Invalid Email or Password");
        }

        var loginResult = AuthHelpers.DecryptPassword(request.Password, user.HashedPassword);

        if (!loginResult)
        {
            throw new Exception("Invalid Email or Password");
        }

        var claimsPrincipal = await GetClaimsPrincipal(user);

        return claimsPrincipal;
    }

    private async Task<ClaimsPrincipal> GetClaimsPrincipal(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, $"{user.FirstName}:{user.LastName}")
        };

        var roles = await _userRepository.GetRolesForUser(user.Id);

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var claimsIdentity = new ClaimsIdentity(claims, "CookieAuth");
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

        return claimsPrincipal;
    }

    public async Task<bool> DoesResetTokenExist(string resetToken)
    {
            var parsedToken = Guid.Parse(resetToken);

            var tokenFromDatabase = await _userRepository.DoesResetTokenExist(parsedToken);

            return tokenFromDatabase.HasValue;
    }

    public Task UpdatePassword(PasswordUpdateRequest request)
    {
        var hashedPassword = AuthHelpers.EncryptPassword(request.Password);

        return _userRepository.UpdatePassword(hashedPassword, request.PasswordResetToken);
    }
}
