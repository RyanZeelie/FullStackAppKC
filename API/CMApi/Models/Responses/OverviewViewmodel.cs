using CMApi.Interfaces.ViewModels;
using CMApi.Models.DomainModels;

namespace CMApi.Models.Responses;

public class OverviewViewmodel : IViewModel
{
  public List<ClassOverView> Classes { get; set; }
}

public class ClassOverView 
{
    public Class ClassDetails { get; set; }
    public IEnumerable<StudentResult> Students { get; set; }
}

public class StudentResult
{
    public int StudentId { get; set; }
    public string EnglishName { get; set; }
    public string Surname { get; set; }
    public string ChineseName { get; set; }
    public int Listening { get; set; }
    public int Reading_Writing { get; set; }
    public bool TestTaken { get; set; }
    public int Total { get; set; }
    public string Recommendation { get; set; }
    public string Book { get; set; }
}
