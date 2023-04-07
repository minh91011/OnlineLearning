namespace OnlineLearningWeb.Dto
{
	public class CommentDto
	{
		public int CommentId { get; set; }

		public int UserId { get; set; }

		public int PostId { get; set; }

		public string Content { get; set; } = null!;

		public DateTime? Date { get; set; }

		public int Upvote { get; set; }

		public int Downvote { get; set; }
	}
}
