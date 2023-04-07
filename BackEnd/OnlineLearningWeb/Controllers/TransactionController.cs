using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : Controller
    {

        private readonly IEnrollmentRepository _enrollmentRepository;
        private readonly IUserRepository _userRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;
        public TransactionController(IEnrollmentRepository enrollmentRepository, IUserRepository userRepository, ICourseRepository courseRepository, IMapper mapper)
        {
            _enrollmentRepository = enrollmentRepository;
            _userRepository = userRepository;
            _courseRepository = courseRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Course>))]
        public IActionResult GetAllTransactions()
        {
            var enrollments = _enrollmentRepository.GetAllEnrollments();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var responseObject = new { data = enrollments };
            return Ok(responseObject);
        }

        // get enrollment by enrollmnetId

        [HttpGet("{enrollmentId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Course>))]
        public IActionResult GetTransactionById(int enrollmentId)
        {
            var enrollment = _enrollmentRepository.GetEnrollmentById(enrollmentId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var responseObject = new { data = enrollment };
            return Ok(responseObject);
        }

        [HttpGet("filter")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Course>))]
        public IActionResult GetTransactionByUserCourse([FromQuery] int userId, [FromQuery] int courseId)
        {
            var enrollment = _enrollmentRepository.GetEnrollmentByUserCourse(userId, courseId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var responseObject = new { data = enrollment };
            return Ok(responseObject);
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Course>))]
        public IActionResult GetTransactionByUserId(int userId)
        {
            var enrollments = _enrollmentRepository.GetEnrollmentByUserId(userId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var responseObject = new { data = enrollments };
            return Ok(responseObject);
        }

        [HttpGet("course/{courseId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Course>))]
        public IActionResult GetTransactionByCourseId(int courseId)
        {
            var enrollments = _enrollmentRepository.GetEnrollmentByCourseId(courseId);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var responseObject = new { data = enrollments };
            return Ok(responseObject);
        }
        [HttpPost("create")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateEnrollment([FromBody] EnrollmentDto enrollment)
        {
            if (!_userRepository.Exist(enrollment.UserId) || !_courseRepository.CourseExist(enrollment.CourseId))
            {
                ModelState.AddModelError("", "User or course is not exist");
                return BadRequest(ModelState);
            }

            if (_enrollmentRepository.GetEnrollmentByUserCourse(enrollment.UserId, enrollment.CourseId) != null)
            {
                ModelState.AddModelError("", "Enrollment has exsist");
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var enrollmentMap = _mapper.Map<Enrollment>(enrollment);

            if (!_enrollmentRepository.CreateEnrollment(enrollmentMap))
            {
                ModelState.AddModelError("", "Somethig went wrong when create new enrollment");
                return BadRequest(ModelState);
            }

            return Ok("Successfully created");
        }
    }
}
