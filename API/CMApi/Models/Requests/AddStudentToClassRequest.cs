namespace CMApi.Models.Requests;

public class AddStudentToClassRequest
{ 
    public int SemesterId { get; set; }
    public List<int> StudentIds { get; set; }
}
