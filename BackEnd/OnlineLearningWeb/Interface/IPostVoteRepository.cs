using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface IPostVoteRepository
    {
        IEnumerable<PostVote> GetPostVoteOfAPost(int postId);
        IEnumerable<PostVote> GetPostVoteOfAUser(int userId, int postId);
        PostVote GetPostVoteById(int postVoteId);
        bool CreatePostVote(PostVote postVote);
        bool UpdatePostVote(PostVote postVote);
        bool DeletePostVote(PostVote postVote);
        bool DeletePostVotes(List<PostVote> postVotes);

        bool Save();
    }
}
