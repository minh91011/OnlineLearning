using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly OnlineLearningContext _context;
        private readonly ICommentVoteRepository _commentVoteRepository;
        public CommentRepository(OnlineLearningContext context, ICommentVoteRepository commentVoteRepository)
        {
            _context = context;
            _commentVoteRepository = commentVoteRepository;
        }
        public bool CommentExists(int commentId)
        {
            return _context.Comments.Any(x => x.CommentId == commentId);
        }

        public bool CreateComment(Comment comment)
        {
            _context.Comments.Add(comment);
            return Save();
        }

        public bool DeleteComment(Comment comment)
        {
            var commentVotes = _commentVoteRepository.GetCommentVoteOfAComment(comment.CommentId).ToList();
            _commentVoteRepository.DeleteCommentVotes(commentVotes);
            _context.Comments.Remove(comment);
            return Save();
        }

        public bool DeleteComments(List<Comment> comments)
        {
            foreach (var comment in comments)
            {
                var commentVotes = _commentVoteRepository.GetCommentVoteOfAComment(comment.CommentId).ToList();
                _commentVoteRepository.DeleteCommentVotes(commentVotes);
            }
            _context.Comments.RemoveRange(comments);
            return Save();
        }

        public Comment GetCommentByID(int commentId)
        {
            return _context.Comments.FirstOrDefault(x => x.CommentId == commentId);
        }

        public IEnumerable<Comment> GetComments()
        {
            return _context.Comments.ToList();
        }

        public IEnumerable<Comment> GetCommentsOfAPost(int postId)
        {
            return _context.Comments.Where(x => x.PostId == postId).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateComment(Comment comment)
        {
            _context.Update(comment);
            return Save();
        }
        public bool AddVote(CommentVote vote)
        {
            try
            {
                _commentVoteRepository.CreateCommentVote(vote);
                var comment = GetCommentByID(vote.CommentId);
                if (vote.Vote)
                {
                    comment.Upvote = comment.Upvote + 1;
                }
                else
                {
                    comment.Downvote = comment.Downvote + 1;
                }
                _context.Comments.Update(comment);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Save();
        }
        public bool DeleteVote(int voteId) 
        {
            try
            {
                var commentVote =  _commentVoteRepository.GetCommentVoteById(voteId);
                _commentVoteRepository.DeleteCommentVote(commentVote);
                var comment = GetCommentByID(commentVote.CommentId);
                if (commentVote.Vote)
                {
                    comment.Upvote = comment.Upvote - 1;
                }
                else
                {
                    comment.Downvote = comment.Downvote - 1;
                }
                _context.Comments.Update(comment);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Save();
        }

        public bool UpdateVote(CommentVote commentVote)
        {
            try
            {
                _commentVoteRepository.UpdateCommentVote(commentVote);
                var comment = GetCommentByID(commentVote.CommentId);
                if (commentVote.Vote)
                {
                    comment.Downvote = comment.Downvote - 1;
                    comment.Upvote = comment.Upvote + 1;
                }
                else
                {
                    comment.Downvote = comment.Downvote + 1;
                    comment.Upvote = comment.Upvote -1;
                }
                _context.Comments.Update(comment);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Save();
        }


    }
}
