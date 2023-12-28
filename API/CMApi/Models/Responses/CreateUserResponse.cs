namespace CMApi.Models.Responses
{
    public class CreateUserResponse
    {
        public int Id { get; set; }
        public string Email { get; set; }   
        public Guid PasswordResetToken { get; set; }
    }
}
