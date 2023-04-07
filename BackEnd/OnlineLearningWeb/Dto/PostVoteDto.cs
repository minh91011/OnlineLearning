namespace OnlineLearningWeb.Dto
{
    public class PostVoteDto
    {
        public int PostVoteId { get; set; }

        public int UserId { get; set; }

        public int PostId { get; set; }

        public bool Vote { get; set; }
    }
}
