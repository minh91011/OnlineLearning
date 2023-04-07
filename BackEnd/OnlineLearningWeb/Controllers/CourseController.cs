using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CourseController : Controller
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public CourseController(ICourseRepository courseRepository, IMapper mapper, IUserRepository userRepository)
        {
            _courseRepository = courseRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Course>))]
        public IActionResult GetCourses()
        {
            var courses = _mapper.Map<List<CourseDto>>(_courseRepository.GetCourses());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var responseObject = new { data = courses };
            return Ok(responseObject);
        }

        [HttpGet("chapters/{courseId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Chapter>))]
        public IActionResult GetChaptersByCourseId(int courseId)
        {
            var chapters = _mapper.Map<List<ChapterDto>>(_courseRepository.GetChaptersByCourseId(courseId));
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var responseObject = new { data = chapters };
            return Ok(responseObject);
        }

        [HttpGet("search")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Course>))]
        public IActionResult GetCoursesBySearchKey([FromQuery(Name = "searchKey")] string searchKey)
        {
            var courses = _mapper.Map<List<CourseDto>>(_courseRepository.GetCoursesBySearchKey(searchKey));
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var responseObject = new { data = courses };
            return Ok(responseObject);
        }
        [HttpGet("{courseId}")]
        [ProducesResponseType(200, Type = typeof(Course))]
        [ProducesResponseType(400)]
        public IActionResult GetCourseByCourseId(int courseId)
        {
            if (!_courseRepository.CourseExist(courseId)) return NotFound();
            var course = _mapper.Map<CourseDto>(_courseRepository.GetCourse(courseId));
            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            return Ok(course);
        }

        [HttpGet("user/{userId}")]
        [ProducesResponseType(200, Type = typeof(Course))]
        [ProducesResponseType(400)]

        public IActionResult GetCourseByUserId(int userId)
        {
            if (_userRepository.GetUserByID(userId) == null) return NotFound();
            var user = _userRepository.GetUserByID(userId);
            var courses = user.Role == "teacher" ? _mapper.Map<List<CourseDto>>(_userRepository.GetCoursesCreateByUser(userId))
              : _mapper.Map<List<CourseDto>>(_userRepository.GetCoursesEnrolledByUser(userId));

            if (!ModelState.IsValid) { return BadRequest(ModelState); }
            return Ok(courses);
        }


        [HttpPost("CreateCourse")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateCourse([FromBody] CourseDto courseCreate)
        {
            if (courseCreate == null)
            {
                return BadRequest(ModelState);
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (!_userRepository.Exist(courseCreate.UserId))
            {
                ModelState.AddModelError("", "User not exist");
                return BadRequest(ModelState);
            }

            var courseMap = _mapper.Map<Course>(courseCreate);
            if (!_courseRepository.CreateCourse(courseMap))
            {
                ModelState.AddModelError("", "Somethings went wrong when create new course");
                return BadRequest(ModelState);
            }
            return Ok(courseCreate);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Update(int id, [FromBody] CourseDto course)
        {
            if (course == null) { return BadRequest(ModelState); }
            if (id != course.CourseId)
            {
                return BadRequest(ModelState);
            }
            if (!_courseRepository.CourseExist(id)) { return NotFound(); }
            var CourseMap = _mapper.Map<Course>(course);
            if (!_courseRepository.UpdateCourse(id, CourseMap))
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
            if (!_courseRepository.CourseExist(id)) { return NotFound(); }
            var course = _courseRepository.GetCourse(id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }           
            if (!_courseRepository.DeleteCourse(course))
            {
                ModelState.AddModelError("", "Something went wrong deleting course");
            }
            return NoContent();
        }

    }

}
