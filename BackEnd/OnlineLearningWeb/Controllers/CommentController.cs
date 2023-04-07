using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CommentController : ControllerBase
	{
		private readonly ICommentRepository _commentRepository;
		private readonly IMapper _mapper;
		public CommentController(ICommentRepository commentRepository, IMapper mapper)
		{
			_commentRepository = commentRepository;
			_mapper = mapper;
		}
		[HttpGet]
		public IActionResult Get()
		{
			var comments = _mapper.Map<IEnumerable<CommentDto>>(_commentRepository.GetComments());
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			return Ok(comments);
		}
		[HttpGet("postId")]
		[ProducesResponseType(typeof(Comment), StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult GetCommentsOfPost(int postId)
		{
			var commentsOfPost = _mapper.Map<IEnumerable<CommentDto>>(_commentRepository.GetCommentsOfAPost(postId));
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			if (commentsOfPost == null)
			{
				return NotFound();
			}
			return Ok(commentsOfPost);
		}
		[HttpPut("{id}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Update(int id, [FromBody] CommentDto comment)
		{
			if (comment == null) { return BadRequest(ModelState); }
			if (id != comment.CommentId)
			{
				return BadRequest(ModelState);
			}
			if (!_commentRepository.CommentExists(id)) { return NotFound(); }
			var commentMap = _mapper.Map<Comment>(comment);
			if (!_commentRepository.UpdateComment(commentMap))
			{
				ModelState.AddModelError("", "Something went wrong");
				return StatusCode(StatusCodes.Status500InternalServerError);
			}
			return Ok("Successfully saved");

		}
		[HttpDelete("id")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Delete(int id)
		{
			if (!_commentRepository.CommentExists(id)) { return NotFound(); }
			var comment = _commentRepository.GetCommentByID(id);
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			if (!_commentRepository.DeleteComment(comment))
			{
				ModelState.AddModelError("", "Something went wrong while deleting comment");

			}
			return NoContent();

		}
		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		public IActionResult Create([FromBody] CommentDto comment)
		{
			if (comment == null)
			{
				return BadRequest(ModelState);
			}
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			var commentMap = _mapper.Map<Comment>(comment);
			if (!_commentRepository.CreateComment(commentMap))
			{
				ModelState.AddModelError("", "Something went wrong while saving");
				return StatusCode(StatusCodes.Status500InternalServerError, ModelState);
			}
			return Ok("Successfully saved");
		}
	}
}
