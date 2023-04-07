using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChapterController : ControllerBase
    {
        private readonly IChapterRepository _chapterRepository;
        private readonly IMapper _mapper;
        public ChapterController(IChapterRepository chapterRepository, IMapper mapper)
        {
            _chapterRepository = chapterRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Chapter>))]
        public IActionResult GetChapters()
        {
            var chapters = _mapper.Map<List<ChapterDto>>(_chapterRepository.GetChapters());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(chapters);
        }

        [HttpGet("{chapterId}")]
        [ProducesResponseType(200, Type = typeof(Chapter))]
        [ProducesResponseType(400)]
        public IActionResult GetChapter(int chapterId)
        {
            if (!_chapterRepository.ChapterExists(chapterId))
                return NotFound();

            var chapter = _mapper.Map<ChapterDto>(_chapterRepository.GetChapter(chapterId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(chapter);
        }

        [HttpGet("GetMaterials/{chapterId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Material>))]
        [ProducesResponseType(400)]
        public IActionResult GetMaterials(int chapterId)
        {
            if (!_chapterRepository.ChapterExists(chapterId))
                return NotFound();

            var materials = _mapper.Map<List<MaterialDto>>(_chapterRepository.GetMaterials(chapterId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(materials);
        }

        [HttpGet("GetAssignments/{chapterId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Assignment>))]
        [ProducesResponseType(400)]
        public IActionResult GetAssignments(int chapterId)
        {
            if (!_chapterRepository.ChapterExists(chapterId))
                return NotFound();

            var assignments = _mapper.Map<List<AssignmentDto>>(_chapterRepository.GetAssignments(chapterId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(assignments);
        }



        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateChapter([FromBody] ChapterDto chapterCreate)
        {
            if (chapterCreate == null)
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var chapterMap = _mapper.Map<Chapter>(chapterCreate);
            if (!_chapterRepository.CreateChapter(chapterMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok(chapterCreate);
        }
        [HttpPut("{chapterId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateChapter(int chapterId, [FromBody] ChapterDto updatedChapter)
        {
            if (updatedChapter == null)
                return BadRequest(ModelState);

            if (chapterId != updatedChapter.ChapterId)
                return BadRequest(ModelState);

            if (!_chapterRepository.ChapterExists(chapterId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var chapterMap = _mapper.Map<Chapter>(updatedChapter);

            if (!_chapterRepository.UpdateChapter(chapterMap))
            {
                ModelState.AddModelError("", "Something went wrong updating chapter");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{chapterId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteChapter(int chapterId)
        {
            if (!_chapterRepository.ChapterExists(chapterId))
            {
                return NotFound();
            }

            var chapterToDelete = _chapterRepository.GetChapter(chapterId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_chapterRepository.DeleteChapter(chapterToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting chapter");
            }

            return NoContent();
        }
    }
}
