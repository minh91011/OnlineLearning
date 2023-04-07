using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface IChapterRepository
    {
        ICollection<Chapter> GetChapters();
        Chapter GetChapter(int id);
        ICollection<Material> GetMaterials(int id);
        ICollection<Assignment> GetAssignments(int id);
        bool ChapterExists(int id);
        bool CreateChapter(Chapter chapter);
        bool UpdateChapter(Chapter chapter);
        bool DeleteChapter(Chapter chapter);
        bool Save();
    }
}
