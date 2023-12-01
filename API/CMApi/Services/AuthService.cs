using CMApi.Helpers;
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

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, $"{user.FirstName}:{user.LastName}"),
            new Claim(ClaimTypes.Role, "SuperUser")
        };

        var claimsIdentity = new ClaimsIdentity(claims, "CookieAuth");
        var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

        return claimsPrincipal;
    }
}
