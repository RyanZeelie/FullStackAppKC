using CMApi.Data;
using CMApi.Factories;
using CMApi.Repositories;
using CMApi.Services;
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

    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddTransient<IAdminService, AdminService>();
        services.AddTransient<IClassService, ClassService>();
        services.AddTransient<IStudentService, StudentService>();
        services.AddTransient<IManagementService, ManagementService>();
        services.AddTransient<IViewModelFactory, ViewModelFactory>();

        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IAdminRepository, AdminRepository>();
        services.AddTransient<IClassRepository, ClassRepository>();
        services.AddTransient<IStudentRepository, StudentRepository>();
        services.AddTransient<IManagementRepository, ManagementRepository>();

        return services;
    }
}
