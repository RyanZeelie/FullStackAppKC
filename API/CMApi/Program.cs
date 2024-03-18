using System.Reflection;
using CMApi.Extensions;
using CMApi.MiddleWare;
using CMApi.Startup;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
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
builder.Services.AddRateLimiter();
builder.Services.AddAuth(configuration);
builder.Services.AddCors();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddApiVersioning(options =>
{
    options.ReportApiVersions = true;
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.DefaultApiVersion = new ApiVersion(1,0);
});
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