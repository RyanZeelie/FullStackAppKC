using System.Security.Claims;
using CMApi.Models.Requests;
using CMApi.Models.Responses;
using CMApi.Repositories;
using CMApi.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IUserRepository _userRepository;
    private readonly IAuthService _authService;

    private string AuthScheme;

    public AuthController(IUserService userService, IUserRepository userRepository, IAuthService authService, IConfiguration config)
    {
        _userService = userService;
        _userRepository = userRepository;
        _authService = authService;
        AuthScheme = config.GetSection("Cookie:SchemeName").Value;
    }

    [Authorize]
    [HttpGet]
    [Route("/auth-check")]
    public IActionResult AuthCheck()
    {

        Thread.Sleep(2000);

        var roles =
            User
                .FindAll(claim => claim.Type == ClaimTypes.Role)
                    .Select(c => c.Value);

        var response = new LoginResponse
        {
            FirstName = User.Identity.Name,
            Roles = roles
        };

        return Ok(response);
    }

    [HttpPost]
    [Route("/login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var claimsPrincipal = await _authService.LoginUser(request);

        await HttpContext.SignInAsync(AuthScheme, claimsPrincipal);

        var roles =
            claimsPrincipal
                .FindAll(claim => claim.Type == ClaimTypes.Role)
                    .Select(c => c.Value);

        var loginResponse = new LoginResponse
        {
            FirstName = claimsPrincipal.Identity.Name,
            Roles = roles
        };

        return Ok(loginResponse);
    }

    [HttpPost]
    [Route("/logout")]
    public async Task<IActionResult> Logout()
    {
        HttpContext.Session.Clear();

        await HttpContext.SignOutAsync(AuthScheme);

        return Ok("Logged out successfully");
    }

    [HttpGet]
    [Route("/verify-reset-token")]
    public async Task<IActionResult> VerifyToken([FromQuery] string resetToken)
    {
        var resetTokenExists = await _authService.DoesResetTokenExist(resetToken);

        return Ok(resetTokenExists);
    }

    [HttpPost]
    [Route("/update-password")]
    public async Task<IActionResult> UpdatePassword(PasswordUpdateRequest request)
    {
        var resetTokenExists = await _authService.DoesResetTokenExist(request.PasswordResetToken);

        if(!resetTokenExists)
        {
            return BadRequest();
        }

        await _authService.UpdatePassword(request);

        return Ok();
    }

    [Authorize]
    [HttpPost]
    [Route("/re-activate-user")]
    public async Task<IActionResult> ReActivate(ReActivateRequest request)
    {
        await _userService.ReActivateUser(request);

        return Ok();
    }

    [Authorize]
    [HttpPost]
    [Route("/create-user")]
    public async Task<IActionResult> Create(CreateUserRequest request)
    {
        await _userService.CreateUser(request);

        return Ok();
    }

    [Authorize(Roles = "SuperUser")]
    [HttpGet]
    [Route("/get-all-users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userRepository.GetUsers();

        return Ok(users);
    }
}
