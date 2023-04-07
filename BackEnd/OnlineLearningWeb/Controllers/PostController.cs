using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;
using System.Net.WebSockets;

namespace OnlineLearningWeb.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class PostController : ControllerBase
	{
		private readonly ICommentRepository _commentRepository;
		private readonly IPostRepository _postRepository;
		private readonly IPostVoteRepository _postVoteRepository;
		private readonly IMapper _mapper;
		public PostController(IPostRepository postRepository, IMapper mapper, ICommentRepository commentRepository, IPostVoteRepository postVoteRepository)
		{
			_postRepository = postRepository;
			_mapper = mapper;
			_postVoteRepository = postVoteRepository;
			_commentRepository = commentRepository;
		}
        [HttpGet("content && orderby")]
        public IActionResult Get(string? content, string? orderby)
        {
            var postsCrude = _mapper.Map<IEnumerable<PostDto>>(_postRepository.GetPosts());
            var posts = postsCrude;
            if (content != null)
            {
                posts = from post in postsCrude 
						where post.Content.Contains(content) || post.Title.Contains(content)  
						select post;
            }
			if (orderby != null)
			{
				switch (orderby)
				{
					case "upvoteDes":
						posts = from post in posts
								orderby post.Upvote descending
								select post;
						break;
					case "upvoteAsc":
						posts = from post in posts
								orderby post.Upvote ascending
								select post;
						break;
					case "downvoteDes":
                        posts = from post in posts 
								orderby post.Downvote descending 
								select post;
                        break;
                    case "downvoteAsc":
                        posts = from post in posts
                                orderby post.Downvote ascending
                                select post;
						break;
                    case "dateDes":
                        posts = from post in posts
                                orderby post.Date descending
                                select post;
                        break;
                    case "dateAsc":
                        posts = from post in posts
                                orderby post.Date ascending
                                select post;
                        break;
                }
			}
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(posts);
        }

        [HttpGet("id")]
        [ProducesResponseType(typeof(Post), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult GetById(int id)
		{
			if (!_postRepository.Exist(id))
			{
				return NotFound();
			}
			var post = _mapper.Map<Post>(_postRepository.GetPostByID(id));
			if (!ModelState.IsValid) { return BadRequest(ModelState); }
			return Ok(post);
		}
        [HttpGet("userId")]
        [ProducesResponseType(typeof(Post), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult GetByUser(int userId)
		{
			var postsOfUser = _mapper.Map<IEnumerable<PostDto>>(_postRepository.GetPostsOfAUser(userId).ToList());
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			if (postsOfUser == null)
			{
				return NotFound();
			}
			return Ok(postsOfUser);
		}

		[HttpPost]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Create([FromBody] PostDto post)
		{
			if (post == null) { return BadRequest(ModelState); }
			if (!ModelState.IsValid) { return BadRequest(ModelState); }
			var postMap = _mapper.Map<Post>(post);
			if (!_postRepository.CreatePost(postMap))
			{
				ModelState.AddModelError("", "Something went wrong while saving");
				return StatusCode(StatusCodes.Status500InternalServerError, ModelState);
			}
			return Ok("Successfully saved");
		}

		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Update(int id, [FromBody] PostDto post)
		{
			if (post == null) { return BadRequest(ModelState); }
			if (id != post.PostId)
			{
				return BadRequest(ModelState);
			}
			if (!_postRepository.Exist(id)) { return NotFound(); }
			var postMap = _mapper.Map<Post>(post);
			if (!_postRepository.UpdatePost(id, postMap))
			{
				ModelState.AddModelError("", "Something went wrong while saving");
				return StatusCode(StatusCodes.Status500InternalServerError, ModelState);
			}
			return Ok("Successfully saved");
		}

		[HttpDelete("id")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Delete(int id)
		{
			if (!_postRepository.Exist(id)) { return NotFound(); }
			var post = _postRepository.GetPostByID(id);
			var comments = _commentRepository.GetCommentsOfAPost(id);
			var postVotes = _postVoteRepository.GetPostVoteOfAPost(id);
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			if (!_commentRepository.DeleteComments(comments.ToList()))
			{
				ModelState.AddModelError("", "Something went wrong deleting comment");
			}
			if (!_postVoteRepository.DeletePostVotes(postVotes.ToList()))
			{
				ModelState.AddModelError("", "Something went wrong deleting postVote");
			}
			if (!_postRepository.DeletePost(post))
			{
				ModelState.AddModelError("", "Something went wrong deleting post");
			}
			return NoContent();
		}
	}
}
