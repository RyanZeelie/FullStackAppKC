namespace CMApi.Models.Responses
{
    public class LoginResponse
    {
        public string FirstName { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
