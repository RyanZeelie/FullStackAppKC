using System.Diagnostics;
using CMApi.Constants;
using CMApi.MiddleWare;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CMApi.ActionFilters
{
    public class EndpointPerformanceFilter : ActionFilterAttribute
    {
        private Stopwatch stopwatch;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            stopwatch = Stopwatch.StartNew();
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            var logger = GetLogger(context);

            stopwatch.Stop();
            var elapsedMilliseconds = stopwatch.ElapsedMilliseconds;
            var message = $"{LogTypes.PerformanceLog} Action took {elapsedMilliseconds} ms to execute.";

            logger?.LogInformation(message);
        }

        private ILogger<EndpointPerformanceFilter> GetLogger(FilterContext context)
        {
            if (context.HttpContext?.RequestServices == null)
            {
                return null;
            }
                
            return context.HttpContext.RequestServices.GetService(typeof(ILogger<EndpointPerformanceFilter>)) as ILogger<EndpointPerformanceFilter>;
        }
    }
}
