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
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IMapper _mapper;

        public MaterialController(IMaterialRepository materialRepository, IMapper mapper)
        {
            _materialRepository = materialRepository;
            _mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Material>))]
        public IActionResult GetMaterials()
        {
            var materials = _mapper.Map<List<MaterialDto>>(_materialRepository.GetMaterials());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(materials);
        }

        [HttpGet("{materialId}")]
        [ProducesResponseType(200, Type = typeof(Material))]
        [ProducesResponseType(400)]
        public IActionResult GetMaterial(int materialId)
        {
            if (!_materialRepository.MaterialExists(materialId))
                return NotFound();

            var material = _mapper.Map<MaterialDto>(_materialRepository.GetMaterial(materialId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(material);
        }

        [HttpGet("firstLesson/{courseId}")]
        [ProducesResponseType(200, Type = typeof(Material))]
        [ProducesResponseType(400)]
        public IActionResult GetFirstLessonOfCourse(int courseId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var x = _materialRepository.getFirstLessonOfCourse(courseId);
            return Ok(x);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateMaterial([FromBody] MaterialDto materialCreate)
        {
            if (materialCreate == null)
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var materialMap = _mapper.Map<Material>(materialCreate);
            if (!_materialRepository.CreateMaterial(materialMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully created");
        }

        [HttpPut("{materialId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateMaterial(int materialId, [FromBody] MaterialDto updatedMaterial)
        {
            if (updatedMaterial == null)
                return BadRequest(ModelState);

            if (materialId != updatedMaterial.MaterialId)
                return BadRequest(ModelState);

            if (!_materialRepository.MaterialExists(materialId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();
            var materialMap = _mapper.Map<Material>(updatedMaterial);

            if (!_materialRepository.UpdateMaterial(materialMap))
            {
                ModelState.AddModelError("", "Something went wrong updating material");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{materialId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteMaterial(int materialId)
        {
            if (!_materialRepository.MaterialExists(materialId))
            {
                return NotFound();
            }

            var materialToDelete = _materialRepository.GetMaterial(materialId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_materialRepository.DeleteMaterial(materialToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting material");
            }

            return Ok("Successful Delete");
        }

    }
}
