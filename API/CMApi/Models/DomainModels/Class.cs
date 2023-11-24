namespace CMApi.Models.DomainModels;

public class Class
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int GradeCourseId { get; set; }
    public int GradeId {  get; set; }   
    public string? GradeName { get; set; }  
    public string? CourseName {  get; set; }
    public int LevelId { get; set; }
    public int TotalScore { get; set; }
    public string? LevelName { get; set; }   
    public int SemesterNumber { get; set; }
    public int SemesterId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
