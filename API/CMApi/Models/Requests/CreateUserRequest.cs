namespace CMApi.Models.Requests;

public class CreateUserRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; } 
    public string Email { get; set; }   
    public int Role {  get; set; }  
}
