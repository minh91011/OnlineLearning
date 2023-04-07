using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;
using OnlineLearningWeb.Repository;

namespace OnlineLearningWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentVoteController : ControllerBase
    {
        private readonly ICommentVoteRepository _commentVoteRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IMapper _mapper;
        public CommentVoteController(ICommentRepository commentRepository, IMapper mapper, ICommentVoteRepository commentVoteRepository)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _commentVoteRepository = commentVoteRepository;
        }
        [HttpGet("userId && commentId")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetCommentVoteOfAUser(int userId, int commentId)
        {
            var commentVoteOfUser = _mapper.Map<IEnumerable<CommentVoteDto>>(_commentVoteRepository.GetCommentVoteOfAUser(userId,commentId));
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (commentVoteOfUser == null)
            {
                return NotFound();
            }
            return Ok(commentVoteOfUser);
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create([FromBody] CommentVoteDto commentVote)
        {
            if (commentVote == null) { return BadRequest(ModelState); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var commentVoteMap = _mapper.Map<CommentVote>(commentVote);
            if (!_commentRepository.AddVote(commentVoteMap))
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
            var vote = _commentVoteRepository.GetCommentVoteById(id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!_commentRepository.DeleteVote(id))
            {
                ModelState.AddModelError("", "Something went wrong while deleting comment's vote");

            }
            return NoContent();

        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(int id, [FromBody] CommentVoteDto commentVote)
        {
            if (commentVote == null) { return BadRequest(ModelState); }
            if (id != commentVote.CommentVoteId)
            {
                return BadRequest(ModelState);
            }
            var commentMap = _mapper.Map<CommentVote>(commentVote);
            if (!_commentRepository.UpdateVote(commentMap))
            {
                ModelState.AddModelError("", "Something went wrong");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok("Successfully saved");

        }
    }
}
