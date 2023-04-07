using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly IMapper _mapper;
        public QuestionController(IQuestionRepository questionRepository, IMapper mapper)
        {
            _questionRepository = questionRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Question>))]
        public IActionResult GetMaterials()
        {
            var questions = _mapper.Map<List<QuestionDto>>(_questionRepository.GetQuestions());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(questions);
        }

        [HttpGet("{questionId}")]
        [ProducesResponseType(200, Type = typeof(Question))]
        [ProducesResponseType(400)]
        public IActionResult GetQuestion(int questionId)
        {
            if (!_questionRepository.QuestionExist(questionId))
                return NotFound();

            var question = _mapper.Map<QuestionDto>(_questionRepository.GetQuestion(questionId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(question);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateQuestion([FromBody] QuestionDto questionCreate)
        {
            if (questionCreate == null)
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var questionlMap = _mapper.Map<Question>(questionCreate);
            if (!_questionRepository.CreateQuestion(questionlMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully created");
        }
        [HttpPut("{questionId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateQuestion(int questionId, [FromBody] QuestionDto updatedQuestion)
        {
            if (updatedQuestion == null)
                return BadRequest(ModelState);

            if (questionId != updatedQuestion.QuestionId)
                return BadRequest(ModelState);

            if (!_questionRepository.QuestionExist(questionId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();
            var questionMap = _mapper.Map<Question>(updatedQuestion);

            if (!_questionRepository.UpdateQuestion(questionMap))
            {
                ModelState.AddModelError("", "Something went wrong updating question");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{questionId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteQuestion(int questionId)
        {
            if (!_questionRepository.QuestionExist(questionId))
            {
                return NotFound();
            }

            var questionToDelete = _questionRepository.GetQuestion(questionId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_questionRepository.DeleteQuestion(questionToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting question");
            }

            return NoContent();
        }
    }
}
