using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class ChapterRepository : IChapterRepository
    {
        private readonly OnlineLearningContext _context;

        public ChapterRepository(OnlineLearningContext context)
        {
            _context = context;
        }
        public bool ChapterExists(int id)
        {
            return _context.Chapters.Any(p => p.ChapterId == id);
        }

        public bool CreateChapter(Chapter chapter)
        {
            _context.Add(chapter);
            return Save();
        }

        public bool DeleteChapter(Chapter chapter)
        {
            List<Assignment> assignments = GetAssignments(chapter.ChapterId).ToList();
            foreach (Assignment a in assignments)
            {
                _context.RemoveRange(_context.Questions.Where(p => p.AssignmentId == a.AssignmentId).ToList());
            }
            _context.RemoveRange(assignments);
            List<Material> materials = GetMaterials(chapter.ChapterId).ToList();
            _context.RemoveRange(materials);
            _context.Remove(chapter);
            return Save();
        }

        public ICollection<Assignment> GetAssignments(int id)
        {
            return _context.Assignments.Where(p => p.ChapterId == id).ToList();
        }

        public Chapter GetChapter(int id)
        {
            return _context.Chapters.Where(p => p.ChapterId == id).FirstOrDefault();
        }

        public ICollection<Chapter> GetChapters()
        {
            return _context.Chapters.ToList();
        }

        public ICollection<Material> GetMaterials(int id)
        {
            return _context.Materials.Where(p => p.ChapterId == id).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateChapter(Chapter chapter)
        {
            _context.Update(chapter);
            return Save();
        }
    }
}
