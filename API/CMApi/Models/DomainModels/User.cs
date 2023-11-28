namespace CMApi.Models.DomainModels;

public class User
{
    public int Id { get; set; } 
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }   
    public string HashedPassword { get; set; }
    public string Password { get; set; }
    public DateTime CreateDate { get; set; }
    public bool IsActive { get; set; }
}
