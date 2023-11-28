using System.Text;
using CMApi.Data;
using CMApi.Factories;
using CMApi.Repositories;
using CMApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;

namespace CMApi.Extensions;

public static class ServiceCollectionExtension
{
    public static IServiceCollection AddDataContext(this IServiceCollection services, IConfiguration configuration)
    {
        string connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddTransient(_ => new SqlConnection(connectionString));
        services.AddTransient<IDataContext, DataContext>(provider =>
        {
            var sqlConnection = provider.GetRequiredService<SqlConnection>();
            return new DataContext(sqlConnection);
        });

        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddTransient<IAdminService, AdminService>();
        services.AddTransient<IClassService, ClassService>();
        services.AddTransient<IStudentService, StudentService>();
        services.AddTransient<IManagementService, ManagementService>();
        services.AddTransient<IViewModelFactory, ViewModelFactory>();
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IAuthService, AuthService>();

        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IAdminRepository, AdminRepository>();
        services.AddTransient<IClassRepository, ClassRepository>();
        services.AddTransient<IStudentRepository, StudentRepository>();
        services.AddTransient<IManagementRepository, ManagementRepository>();
        services.AddTransient<IUserRepository, UserRepository>();

        return services;
    }

    public static IServiceCollection AddJWT(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(o =>
        {
            var key = configuration.GetSection("Jwt:Key").Value;
            var issuer = configuration.GetSection("Jwt:Issuer").Value;
            var audience = configuration.GetSection("Jwt:Audience").Value;

            o.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = issuer,
                ValidAudience = audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ClockSkew = TimeSpan.Zero // Read more

            };
        });

        return services;
    }
}
