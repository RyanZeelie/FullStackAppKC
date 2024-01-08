using CMApi.Config;
using CMApi.Data;
using CMApi.Factories;
using CMApi.Repositories;
using CMApi.Services;
using Hangfire;
using Microsoft.Data.SqlClient;

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

    public static IServiceCollection AddOptionsConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<EmailConfig>(configuration.GetSection("Mail"));

        return services;
    }

    public static IServiceCollection AddHangfireServices(this IServiceCollection services, IConfiguration configuration)
    {
        string connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddHangfire(config => config.UseSqlServerStorage(connectionString));
        services.AddHangfireServer();

        return services;
    }

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddTransient<IClassService, ClassService>();
        services.AddTransient<IStudentService, StudentService>();
        services.AddTransient<IManagementService, ManagementService>();
        services.AddTransient<IViewModelFactory, ViewModelFactory>();
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IAuthService, AuthService>();
        services.AddScoped<IMailService, MailService>();

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

    //public static IServiceCollection AddLogging(this IServiceCollection services)
    //{
    //    var serviceProvider = services.BuildServiceProvider();
    //    var logger = serviceProvider.GetService<ILogger>();
    //    services.AddSingleton(typeof(ILogger), logger);
    //    return services;
    //}
}
