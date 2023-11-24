namespace CMApi.Models.DomainModels;

public class Score
{
    public int Id { get; set; }
    public int StudentId { get; set; }
    public int SemesterId { get; set; }
    public bool IsTestTaken { get; set; }
    public string? Recommendation { get; set; }
    public decimal Listening { get; set; }  
    public decimal Reading { get; set;}
    public decimal Writing { get; set; }

}
