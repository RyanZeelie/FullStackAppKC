namespace CMApi.Models.Requests;

public class AddStudentToClassRequest
{ 
    public int SemesterId { get; set; }
    public int StudentId { get; set; }
}
