namespace CMApi.Models.Requests;

public class PasswordUpdateRequest
{
    public string PasswordResetToken { get; set; }  
    public string Password { get; set; }
}
