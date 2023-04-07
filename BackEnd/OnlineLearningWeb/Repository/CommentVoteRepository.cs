using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class CommentVoteRepository : ICommentVoteRepository
    {
        private readonly OnlineLearningContext _context;
        public CommentVoteRepository(OnlineLearningContext context)
        {
            _context = context;
        }

        public bool CreateCommentVote(CommentVote commentVote)
        {

            _context.CommentVotes.Add(commentVote);


            return Save();
        }

        public bool DeleteCommentVote(CommentVote commentVote)
        {
            _context.CommentVotes.Remove(commentVote);
            return Save();
        }

        public bool DeleteCommentVotes(List<CommentVote> commentVotes)
        {
            _context.CommentVotes.RemoveRange(commentVotes);
            return Save();
        }

        public IEnumerable<CommentVote> GetCommentVoteOfAComment(int commentId)
        {
            return _context.CommentVotes.Where(x => x.CommentId == commentId).ToList();
        }

        public CommentVote GetCommentVoteById(int commentVoteId)
        {
            return _context.CommentVotes.FirstOrDefault(x => x.CommentVoteId == commentVoteId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateCommentVote(CommentVote commentVote)
        {
            _context.Update(commentVote);
            return Save();
        }

        public IEnumerable<CommentVote> GetCommentVoteOfAUser(int userId, int commentId)
        {
            return _context.CommentVotes.Where(x => x.UserId == userId && x.CommentId == commentId);
        }
    }
}
