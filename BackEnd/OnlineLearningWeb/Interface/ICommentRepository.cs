using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
	public interface ICommentRepository
	{
		IEnumerable<Comment> GetComments();
		Comment GetCommentByID(int commentId);
		IEnumerable<Comment> GetCommentsOfAPost	(int postId);
		bool CommentExists(int commentId);
		bool CreateComment(Comment comment);
		bool UpdateComment(Comment comment);
		bool DeleteComment(Comment comment);
		bool DeleteComments(List<Comment> comments);
		bool AddVote(CommentVote vote);
		bool UpdateVote(CommentVote vote);
		bool DeleteVote(int id);
		bool Save();
	}
}
