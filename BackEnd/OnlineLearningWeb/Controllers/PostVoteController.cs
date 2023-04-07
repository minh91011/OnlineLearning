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
    public class PostVoteController : ControllerBase
    {
        private readonly IPostVoteRepository _postVoteRepository;
        private readonly IPostRepository _postRepository;
        private readonly IMapper _mapper;
        public PostVoteController(IPostRepository postRepository, IMapper mapper, IPostVoteRepository postVoteRepository)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _postVoteRepository = postVoteRepository;
        }

        [HttpGet("userId && postId")]
        [ProducesResponseType(200)]
        [ProducesResponseType(404)]
        public IActionResult GetPostVoteOfAUser(int userId, int postId)
        {
            var postVoteOfUser = _mapper.Map<IEnumerable<PostVoteDto>>(_postVoteRepository.GetPostVoteOfAUser(userId, postId));
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (postVoteOfUser == null)
            {
                return NotFound();
            }
            return Ok(postVoteOfUser);
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Create([FromBody] PostVoteDto postVote)
        {
            if (postVote == null) { return BadRequest(ModelState); }
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            var postVoteMap = _mapper.Map<PostVote>(postVote);
            if (!_postRepository.AddVote(postVoteMap))
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
            var vote = _postVoteRepository.GetPostVoteById(id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!_postRepository.DeleteVote(id))
            {
                ModelState.AddModelError("", "Something went wrong while deleting post's vote");

            }
            return NoContent();

        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(int id, [FromBody] PostVoteDto postVote)
        {
            if (postVote == null) { return BadRequest(ModelState); }
            if (id != postVote.PostVoteId)
            {
                return BadRequest(ModelState);
            }
            var postMap = _mapper.Map<PostVote>(postVote);
            if (!_postRepository.UpdateVote(postMap))
            {
                ModelState.AddModelError("", "Something went wrong");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            return Ok("Successfully saved");

        }
    }
}
