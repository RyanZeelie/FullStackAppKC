﻿using System.Security.Claims;
using CMApi.Models.Requests;
using CMApi.Models.Responses;
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
    private readonly IAuthService _authService;

    private string AuthScheme;

    public AuthController(IUserService userService, IAuthService authService, IConfiguration config)
    {
        _userService = userService;
        _authService = authService;
        AuthScheme = config.GetSection("Cookie:SchemeName").Value;
    }

    [Authorize]
    [HttpGet]
    [Route("/auth-check")]
    public IActionResult AuthCheck()
    {
        Thread.Sleep(1000);

        return Ok("Authenticated");
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
                    .Select(c => c.Value).ToList();

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

    [Authorize]
    [HttpPost]
    [Route("/create-user")]
    public async Task<IActionResult> Create(CreateUserRequest request)
    {
        await _userService.CreateUser(request);

        return Ok();
    }
}
