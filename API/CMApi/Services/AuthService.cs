using CMApi.Helpers;
using CMApi.Models.DomainModels;
using CMApi.Models.Requests;
using CMApi.Models.Responses;
using CMApi.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CMApi.Services;

public class AuthService : IAuthService
{
    private IConfiguration _configuration;
    private IUserRepository _userRepository;

    public AuthService(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    public string GenerateToken(User user)
    {
        throw new NotImplementedException();
    }

    public async Task<LoginResponse> LoginUser(LoginRequest request)
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

        var token = GenerateToken(user.Email);

        return new LoginResponse { Access_Token = token };
    }

    private string GenerateToken(string userEmail)
    {
        // TODO : Add roles

        var claims = new List<Claim>
        {
        new Claim(JwtRegisteredClaimNames.Sub, userEmail),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.NameIdentifier, userEmail)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.Now.AddSeconds(30);

        var token = new JwtSecurityToken(
            _configuration.GetSection("Jwt:Issuer").Value,
            _configuration.GetSection("Jwt:Audience").Value,
            claims,
            expires: expires,
            signingCredentials: creds
        );

        var accessToken = new JwtSecurityTokenHandler().WriteToken(token);

        return accessToken;
    }
}
