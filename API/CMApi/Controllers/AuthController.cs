using CMApi.Models.Requests;
using CMApi.Repositories;
using CMApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CMApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IAuthService _authService;

    public AuthController(IUserService userService, IAuthService authService)
    {
        _userService = userService;
        _authService = authService;
    }

    [HttpPost]
    [Route("/login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var loginResponse = await _authService.LoginUser(request);

        return Ok(loginResponse);
    }

    [HttpPost]
    [Authorize]
    [Route("/create-user")]
    public async Task<IActionResult> Create(CreateUserRequest request)
    {
        await _userService.CreateUser(request);

        return Ok();
    }
}
