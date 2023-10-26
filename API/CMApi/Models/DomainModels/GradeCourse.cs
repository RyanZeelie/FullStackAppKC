namespace CMApi.Models.DomainModels;

public class GradeCourse
{
    public int? Id { get; set; }
    public string? GradeName { get; set; }
    public int GradeId { get; set; }
    public int CourseId { get; set; }
    public string? CourseName { get; set; }
}
