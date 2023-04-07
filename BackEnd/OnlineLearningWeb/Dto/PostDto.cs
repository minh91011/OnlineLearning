namespace OnlineLearningWeb.Dto
{
	public class PostDto
	{
		public int PostId { get; set; }

		public int UserId { get; set; }

		public string Title { get; set; } = null!;

		public string Content { get; set; } = null!;

		public DateTime? Date { get; set; }

		public int Upvote { get; set; }

		public int Downvote { get; set; }
	}
}
