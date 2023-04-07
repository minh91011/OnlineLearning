using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface ICommentVoteRepository
    {

        IEnumerable<CommentVote> GetCommentVoteOfAComment(int commentId);
        IEnumerable<CommentVote> GetCommentVoteOfAUser(int userId, int commentId);
        CommentVote GetCommentVoteById(int commentVoteId);
        bool CreateCommentVote(CommentVote commentVote);
        bool UpdateCommentVote(CommentVote commentVote);
        bool DeleteCommentVote(CommentVote commentVote);
        bool DeleteCommentVotes(List<CommentVote> commentVotes);
        bool Save();
    }
}
