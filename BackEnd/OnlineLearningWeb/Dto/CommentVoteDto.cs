namespace OnlineLearningWeb.Dto
{
    public class CommentVoteDto
    {
        public int CommentVoteId { get; set; }

        public int UserId { get; set; }

        public int CommentId { get; set; }

        public bool Vote { get; set; }
    }
}
