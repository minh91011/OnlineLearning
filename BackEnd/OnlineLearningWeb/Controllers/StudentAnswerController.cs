using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;
using OnlineLearningWeb.Repository;

namespace OnlineLearningWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAnswerController : ControllerBase
    {
        private readonly IStudentAnswerRepository _studentAnswerRepository;
        private readonly IUserRepository _userRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly IAssignmentRepository _assignmentRepository;
        private readonly IMapper _mapper;

        public StudentAnswerController(IStudentAnswerRepository studentAnswerRepository, IMapper mapper, IUserRepository userRepository, IQuestionRepository questionRepository, IAssignmentRepository assignmentRepository)
        {
            _studentAnswerRepository = studentAnswerRepository;
            _mapper = mapper;
            _userRepository = userRepository;
            _questionRepository = questionRepository;
            _assignmentRepository = assignmentRepository;
        }

        [HttpGet("{userId};{questionId}")]
        [ProducesResponseType(200, Type = typeof(StudentAnswer))]
        [ProducesResponseType(400)]
        public IActionResult GetByUserIdAndQuesId(int userId, int questionId) {
            if (!_userRepository.Exist(userId) || !_questionRepository.QuestionExist(questionId)) {
                return NotFound();
            }
            var studentAnswer = _mapper.Map<StudentAnswerDto>(_studentAnswerRepository.GetStudentAnswerByUserIdAndQuestionId(userId, questionId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(studentAnswer);
        }

        [HttpGet("getTrueByUserIdAndAssignmentId/{userId};{assignmentId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<StudentAnswer>))]
        [ProducesResponseType(400)]
        public IActionResult GetTrueByUserIdAndAssignmentId(int userId, int assignmentId)
        {
            if (!_assignmentRepository.AssignmentExist(assignmentId) || !_userRepository.Exist(userId))
            {
                return NotFound();
            }
            var studentAnswerTrue = _mapper.Map<List<StudentAnswerDto>>(_studentAnswerRepository.GetStudentAnswersThatTrueByAssignmentId(userId, assignmentId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(studentAnswerTrue);
        }


        [HttpGet("getByUserIdAndAssignmentId/{userId};{assignmentId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<StudentAnswer>))]
        [ProducesResponseType(400)]
        public IActionResult GetByUserIdAndAssignmentId(int userId, int assignmentId)
        {
            if (!_assignmentRepository.AssignmentExist(assignmentId) || !_userRepository.Exist(userId))
            {
                return NotFound();
            }
            var studentAnswer = _mapper.Map<List<StudentAnswerDto>>(_studentAnswerRepository.GetStudentAnswersByAssignmentId(userId, assignmentId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(studentAnswer);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateStudentAnswer([FromBody] StudentAnswerDto studentAnswerCreate)
        {
            if (studentAnswerCreate == null)
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var studentAnswerMap = _mapper.Map<StudentAnswer>(studentAnswerCreate);
            if (!_studentAnswerRepository.CreateStudentAnswer(studentAnswerMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully created");
        }

        [HttpPut("{studentAnswerId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateAssignment(int studentAnswerId, [FromBody] StudentAnswerDto updatedStudentAnswer)
        {
            if (updatedStudentAnswer == null)
                return BadRequest(ModelState);

            if (studentAnswerId != updatedStudentAnswer.StudentAnswerId)
                return BadRequest(ModelState);

            if (!ModelState.IsValid)
                return BadRequest();

            var studentAnswerMap = _mapper.Map<StudentAnswer>(updatedStudentAnswer);

            if (!_studentAnswerRepository.UpdateStudentAnswer(studentAnswerMap))
            {
                ModelState.AddModelError("", "Something went wrong updating asignment");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }
    }
}
