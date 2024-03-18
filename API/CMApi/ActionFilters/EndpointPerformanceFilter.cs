using System.Diagnostics;
using CMApi.Constants;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CMApi.ActionFilters
{
    public class EndpointPerformanceFilter : ActionFilterAttribute
    {
        private Stopwatch stopwatch;
        private readonly ILogger<EndpointPerformanceFilter> _logger;

        public EndpointPerformanceFilter(ILogger<EndpointPerformanceFilter> logger)
        {
            _logger = logger;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            stopwatch = Stopwatch.StartNew();
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            stopwatch.Stop();
            var elapsedMilliseconds = stopwatch.ElapsedMilliseconds;
            var message = $"{LogTypes.PerformanceLog} Action took {elapsedMilliseconds} ms to execute.";

            _logger.LogInformation(message);
        }
    }
}
