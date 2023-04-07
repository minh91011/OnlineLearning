using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface IMaterialRepository
    {
        ICollection<Material> GetMaterials();
        Material GetMaterial(int id);
        bool MaterialExists(int id);
        bool CreateMaterial(Material material);
        bool UpdateMaterial(Material material);
        bool DeleteMaterial(Material material);

        Material getFirstLessonOfCourse(int courseId);
        bool Save();
    }
}
