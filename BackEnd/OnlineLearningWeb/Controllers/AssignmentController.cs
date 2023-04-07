using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly IAssignmentRepository _assingnmentRepository;
        private readonly IMapper _mapper;


        public AssignmentController(IAssignmentRepository assingnmentRepository, IMapper mapper)
        {
            _assingnmentRepository = assingnmentRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Assignment>))]
        public IActionResult GetAssignments()
        {
            var assignments = _mapper.Map<List<AssignmentDto>>(_assingnmentRepository.GetAssignments());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(assignments);
        }

        [HttpGet("{assignmentId}")]
        [ProducesResponseType(200, Type = typeof(Assignment))]
        [ProducesResponseType(400)]
        public IActionResult GetAssignment(int assignmentId)
        {
            if (!_assingnmentRepository.AssignmentExist(assignmentId))
                return NotFound();

            var assignment = _mapper.Map<AssignmentDto>(_assingnmentRepository.GetAssignment(assignmentId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(assignment);
        }

        [HttpGet("GetQuestions/{assignmentId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Question>))]
        [ProducesResponseType(400)]
        public IActionResult GetQuestions(int assignmentId)
        {
            if (!_assingnmentRepository.AssignmentExist(assignmentId))
                return NotFound();

            var questions = _mapper.Map<List<QuestionDto>>(_assingnmentRepository.GetQuestions(assignmentId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(questions);
        }


        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateAssignment([FromBody] AssignmentDto assignmentCreate)
        {
            if (assignmentCreate == null)
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var assignmentMap = _mapper.Map<Assignment>(assignmentCreate);
            if (!_assingnmentRepository.CreateAssignment(assignmentMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully created");
        }
        [HttpPut("{assignmentId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateAssignment(int assignmentId, [FromBody] AssignmentDto updatedAssignment)
        {
            if (updatedAssignment == null)
                return BadRequest(ModelState);

            if (assignmentId != updatedAssignment.AssignmentId)
                return BadRequest(ModelState);

            if (!_assingnmentRepository.AssignmentExist(assignmentId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var assignmentMap = _mapper.Map<Assignment>(updatedAssignment);

            if (!_assingnmentRepository.UpdateAssignment(assignmentMap))
            {
                ModelState.AddModelError("", "Something went wrong updating asignment");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{assignmentId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteAssignment(int assignmentId)
        {
            if (!_assingnmentRepository.AssignmentExist(assignmentId))
            {
                return NotFound();
            }

            var assignmentToDelete = _assingnmentRepository.GetAssignment(assignmentId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_assingnmentRepository.DeleteAssignment(assignmentToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting assignment");
            }

            return NoContent();
        }
    }
}
