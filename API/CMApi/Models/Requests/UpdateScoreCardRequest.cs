namespace CMApi.Models.Requests;

public class UpdateScoreCardRequest
{
    public int ScoreId { get; set; }
    public int Listening { get; set; }
    public int Reading_Writing { get; set; }
    public bool IsTestTaken { get; set; }

}
