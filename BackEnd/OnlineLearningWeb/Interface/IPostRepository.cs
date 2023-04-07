using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
	public interface IPostRepository
	{
		IEnumerable<Post> GetPosts();
		IEnumerable<Post> GetPostsOfAUser(int userId);
		Post GetPostByID(int id);
		bool DeletePost(Post post);
		bool UpdatePost(int id, Post post);
		bool CreatePost(Post post);
		bool Save();
		bool Exist(int id);

        bool AddVote(PostVote vote);
        bool UpdateVote(PostVote vote);
        bool DeleteVote(int id);
    }
}
