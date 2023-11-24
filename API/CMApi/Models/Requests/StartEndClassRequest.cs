using CMApi.Models.DomainModels;

namespace CMApi.Models.Requests;

public class StartEndClassRequest
{
    public int ClassId { get; set; }
    public int SemesterNumber { get; set; }
    public List<int> StudentIds { get; set; }
    public int SemesterId { get; set; }
}
