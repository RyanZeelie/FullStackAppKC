using System.Net;
using System.Reflection;
using CMApi.Extensions;
using CMApi.MiddleWare;
using Hangfire;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Serilog;
using Serilog.Exceptions;
using Serilog.Sinks.Elasticsearch;

var builder = WebApplication.CreateBuilder(args);



var configuration = builder.Configuration;

ConfigureLogging(configuration);
builder.Host.UseSerilog();


builder.Services.AddOptionsConfig(configuration);
builder.Services.AddHangfireServices(configuration);
builder.Services.AddDataContext(configuration);
builder.Services.AddRepositories();
builder.Services.AddServices();

builder.Services.AddCors();
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None;
});

var authScheme = configuration.GetSection("Cookie:SchemeName").Value;

builder.Services.AddAuthentication(authScheme)
    .AddCookie(authScheme, options =>
    {
        options.Events.OnRedirectToAccessDenied = UnAuthorizedResponse;
        options.Events.OnRedirectToLogin = UnAuthorizedResponse;
        options.Cookie.HttpOnly = true;
        // Change when not in dev
        options.Cookie.SameSite = SameSiteMode.None;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
    });

builder.Services.AddAuthorization();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandler>();
app.UseMiddleware<PerfomanceLoggingMiddleware>();

app.UseCors(x =>
    x.WithOrigins("https://127.0.0.1:3004") 
     .AllowAnyHeader()
     .AllowAnyMethod()
     .AllowCredentials());

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();
app.UseSession();


app.UseHangfireDashboard();

app.MapControllers();

app.Run();

static Task UnAuthorizedResponse(RedirectContext<CookieAuthenticationOptions> context)
{
    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
    return Task.CompletedTask;
}

void ConfigureLogging(IConfiguration configuration)
{
    var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

    Log.Logger = new LoggerConfiguration()
        .Enrich.FromLogContext()
        .Enrich.WithExceptionDetails()
        .WriteTo.Debug()
        .WriteTo.Console()
        .WriteTo.Elasticsearch(ConfigureElasticSink(configuration, environment))
        .Enrich.WithProperty("Environment", environment)
        .ReadFrom.Configuration(configuration)
        .CreateLogger();
}

ElasticsearchSinkOptions ConfigureElasticSink(IConfiguration configuration, string environment)
{
    return new ElasticsearchSinkOptions(new Uri(configuration["ElasticConfiguration:Uri"]))
    {
        AutoRegisterTemplate = true,
        IndexFormat = $"{Assembly.GetExecutingAssembly().GetName().Name.ToLower().Replace(".", "-")}-{environment?.ToLower().Replace(".", "-")}-{DateTime.UtcNow:yyyy-MM}"
    };
}