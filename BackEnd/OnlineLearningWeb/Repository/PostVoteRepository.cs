using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class PostVoteRepository:IPostVoteRepository
    {
        private readonly OnlineLearningContext _context;
        public PostVoteRepository(OnlineLearningContext context)
        {
            _context = context;
        }

        public bool CreatePostVote(PostVote postVote)
        {
            _context.PostVotes.Add(postVote);
            return Save();
        }

        public bool DeletePostVote(PostVote postVote)
        {
            _context.PostVotes.Remove(postVote);
            return Save();
        }

        public bool DeletePostVotes(List<PostVote> postVotes)
        {
            _context.PostVotes.RemoveRange(postVotes);
            return Save();
        }

        public PostVote GetPostVoteById(int postVoteId)
        {
            return _context.PostVotes.FirstOrDefault(x => x.PostVoteId == postVoteId);
        }

        public IEnumerable<PostVote> GetPostVoteOfAPost(int postId)
        {
            return _context.PostVotes.Where(x => x.PostId == postId);
        }

        public IEnumerable<PostVote> GetPostVoteOfAUser(int userId, int postId)
        {
            return _context.PostVotes.Where(x => x.UserId == userId && x.PostId == postId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdatePostVote(PostVote postVote)
        {
            _context.PostVotes.Update(postVote);
            return Save();
        }
    }
}
