using System.Runtime.CompilerServices;

namespace CMApi.Helpers
{
    public static class LogMessageHelpers
    {
        public static string CreateSuccessfulProcessLogMessage(string message, [CallerMemberName] string caller = null)
        {
            return $"{caller} processed successfully : {message}";
        }

        public static string CreateExceptionLogMessage(string message, [CallerMemberName] string caller = null)
        {
            return $"An error occued in {caller} : {message}";
        }
    }
}
