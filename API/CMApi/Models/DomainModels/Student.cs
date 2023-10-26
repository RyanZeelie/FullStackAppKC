namespace CMApi.Models.DomainModels;

public class Student
{
    public int Id { get; set; }
    public string EnglishName { get; set; }
    public string Surname { get; set; }
    public string ChineseName { get; set; }
    public int? ClassId { get; set; }
    public string? ClassName { get; set; }
    public string? GradeName { get; set; }
    public string? CourseName { get; set; }
}
