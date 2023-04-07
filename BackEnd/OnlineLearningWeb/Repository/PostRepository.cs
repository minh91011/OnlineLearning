using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly OnlineLearningContext _context;
        private readonly IPostVoteRepository _postVoteRepository;
        public PostRepository(OnlineLearningContext context, IPostVoteRepository postVoteRepository)
        {
            _context = context;
            _postVoteRepository = postVoteRepository;
        }
        public bool CreatePost(Post post)
        {
            _context.Posts.Add(post);
            return Save();
        }

        public bool DeletePost(Post post)
        {
            var postVotes =  _postVoteRepository.GetPostVoteOfAPost(post.PostId).ToList();
            _postVoteRepository.DeletePostVotes(postVotes);
            _context.Posts.Remove(post);
            return Save();
        }

        public bool Exist(int id)
        {
            return _context.Posts.Any(x => x.PostId == id);
        }

        public Post GetPostByID(int id)
        {
            var post = _context.Posts.FirstOrDefault(x => x.PostId == id);
            return post;
        }

        public IEnumerable<Post> GetPosts()
        {
            return _context.Posts.ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdatePost(int id, Post post)
        {
            _context.Posts.Update(post);
            return Save();
        }

        public bool AddVote(PostVote vote)
        {
            try
            {
                _postVoteRepository.CreatePostVote(vote);
                var post = GetPostByID(vote.PostId);
                if (vote.Vote)
                {
                    post.Upvote += 1;
                }
                else
                {
                    post.Downvote += 1;
                }
                _context.Posts.Update(post);
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
                var postVote = _postVoteRepository.GetPostVoteById(voteId);
                _postVoteRepository.DeletePostVote(postVote);
                var post = GetPostByID(postVote.PostId);
                if (postVote.Vote)
                {
                    post.Upvote = post.Upvote - 1;
                }
                else
                {
                    post.Downvote = post.Downvote - 1;
                }
                _context.Posts.Update(post);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Save();
        }

        public bool UpdateVote(PostVote postVote)
        {
            try
            {
                _postVoteRepository.UpdatePostVote(postVote);
                var post = GetPostByID(postVote.PostId);
                if (postVote.Vote)
                {
                    post.Downvote = post.Downvote - 1;
                    post.Upvote = post.Upvote + 1;
                }
                else
                {
                    post.Downvote = post.Downvote + 1;
                    post.Upvote = post.Upvote - 1;
                }
                _context.Posts.Update(post);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Save();
        }

        public IEnumerable<Post> GetPostsOfAUser(int userId)
        {
            return _context.Posts.Where(p => p.UserId == userId);
        }
    }
}
