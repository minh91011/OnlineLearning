using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class MaterialRepository : IMaterialRepository
    {
        private readonly OnlineLearningContext _context;
        public MaterialRepository(OnlineLearningContext context)
        {
            _context = context;
        }

        public Material getFirstLessonOfCourse(int courseId)
        {
            var firstLesson = _context.Chapters
     .Include(c => c.Materials)
     .Where(c => c.CourseId == courseId)
     .OrderBy(c => c.ChapterId)
     .SelectMany(c => c.Materials)
     .OrderBy(l => l.MaterialId)
     .FirstOrDefault();
            return firstLesson;
        }

        public bool CreateMaterial(Material material)
        {
            _context.Add(material);
            return Save();
        }

        public bool DeleteMaterial(Material material)
        {
            _context.Remove(material);
            return Save();
        }

        public Material GetMaterial(int id)
        {
            return _context.Materials.Where(p => p.MaterialId == id).FirstOrDefault();
        }

        public ICollection<Material> GetMaterials()
        {
            return _context.Materials.ToList();
        }

        public bool MaterialExists(int id)
        {
            return _context.Materials.Any(p => p.MaterialId == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateMaterial(Material material)
        {
            _context.Update(material);
            return Save();
        }
    }
}
