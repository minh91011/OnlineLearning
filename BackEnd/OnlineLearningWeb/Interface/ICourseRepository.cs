using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface ICourseRepository
    {
        ICollection<Course> GetCourses();
        ICollection<Course> GetCoursesBySearchKey(string searchKey);

        ICollection<Chapter> GetChaptersByCourseId(int courseId);

        Course GetCourse(int id);


        bool CourseExist(int id);

        bool Save();



        bool CreateCourse(Course course);
        bool UpdateCourse(int id, Course course);
        bool DeleteCourse(Course course);


    }
}
