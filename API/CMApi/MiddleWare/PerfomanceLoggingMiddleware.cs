using System.Diagnostics;

namespace CMApi.MiddleWare;

public class PerfomanceLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<PerfomanceLoggingMiddleware> _logger;

    public PerfomanceLoggingMiddleware(RequestDelegate next, ILogger<PerfomanceLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();

        await _next(context);

        stopwatch.Stop();

        var route = context.Request.Path.Value;

        if (context.Response.StatusCode == 200)
        {
            var performanceMessage = $"PERFORMANCE-LOG: Route: {route}, Time: {stopwatch.ElapsedMilliseconds}ms";

            _logger.LogInformation(performanceMessage);
        }
    }
}
