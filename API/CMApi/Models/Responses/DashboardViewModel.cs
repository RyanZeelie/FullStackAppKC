using CMApi.Interfaces.ViewModels;

namespace CMApi.Models.Responses
{
    public class DashboardViewModel : IViewModel
    {
        public IEnumerable<DashboardCardModel>? DashboardCards { get; set; } 
    }

    public class DashboardCardModel 
    {
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int GradeCourseId { get; set; }
        public string CourseName { get; set; }
        public int StudentCount { get; set; }
        public int ClassCount { get; set; }
        public int AverageScore { get; set; }
    }
}
