using CMApi.Helpers;
using Microsoft.AspNetCore.RateLimiting;

namespace CMApi.Startup
{
    public static class StartupDependencies
    {
        public static IServiceCollection AddRateLimiter(this IServiceCollection services)
        {
            services.AddRateLimiter(options => {
                options.AddFixedWindowLimiter("Fixed", opt => {
                    opt.Window = TimeSpan.FromSeconds(3);
                    opt.PermitLimit = 3;
                });
            });

            return services;
        }

        public static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
                options.Cookie.SameSite = SameSiteMode.None;
            });

            var authScheme = configuration.GetSection("Cookie:SchemeName").Value;

            services.AddAuthentication(authScheme)
                .AddCookie(authScheme, options =>
                {
                    options.Events.OnRedirectToAccessDenied = AuthHelpers.UnAuthorizedResponse;
                    options.Events.OnRedirectToLogin = AuthHelpers.UnAuthorizedResponse;
                    options.Cookie.HttpOnly = true;
                    // Change when not in dev
                    options.Cookie.SameSite = SameSiteMode.None;
                    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
                });

            services.AddAuthorization();

            return services;    
        }
    }
}
