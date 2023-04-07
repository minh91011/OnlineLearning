using System.Globalization;
using System.Text;
using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class CourseRepository : ICourseRepository
    {
        private readonly OnlineLearningContext context;
        public CourseRepository(OnlineLearningContext context)
        {
            this.context = context;
        }

        public bool CourseExist(int id)
        {
            return context.Courses.Any(c => c.CourseId == id);
        }

        public Course GetCourse(int id)
        {
            return context.Courses.Where(c => c.CourseId == id).FirstOrDefault();
        }

        public ICollection<Course> GetCourses()
        {
            return context.Courses.OrderBy(o => o.CourseId).ToList();
        }

        public ICollection<Chapter> GetChaptersByCourseId(int courseId)
        {
            return context.Chapters.Where(c => c.CourseId == courseId).ToList();
        }
        public ICollection<Course> GetCoursesBySearchKey(string searchKey)
        {
            return context.Courses.Where(o => o.CourseName.ToUpper().
                                   Contains(searchKey.ToUpper())).ToList();
        } 
        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }



        public bool CreateCourse(Course course)
        {
            var user = context.Users.Where(u => u.UserId == course.UserId).FirstOrDefault();
            course.User = user;

            context.Add(course);
            return Save();
        }
        public bool UpdateCourse(int id, Course course)
        {
            context.Courses.Update(course);
            return Save();
        }

        public bool DeleteCourse(Course course)
        {
            context.Courses.Remove(course);
            return Save();
        }
    }
}
