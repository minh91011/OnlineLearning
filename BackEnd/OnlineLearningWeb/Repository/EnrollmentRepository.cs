using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class EnrollmentRepository : IEnrollmentRepository
    {
        private readonly OnlineLearningContext context;
        public EnrollmentRepository(OnlineLearningContext context)
        {
            this.context = context;
        }
        public ICollection<Enrollment> GetAllEnrollments()
        {
            return context.Enrollments.OrderBy(e => e.EnrollmentId).ToList();
        }

        public ICollection<Enrollment> GetEnrollmentByUserId(int userId)
        {
            return context.Enrollments.Where(e => e.UserId == userId).ToList();
        }

        public bool CreateEnrollment(Enrollment enrollment)
        {
            var user = context.Users.Where(u => u.UserId == enrollment.UserId).FirstOrDefault();
            var course = context.Courses.Where(c => c.CourseId == enrollment.CourseId).FirstOrDefault();
            
            context.Enrollments.Add(enrollment);
            return Save();
        }

        public Enrollment GetEnrollmentById(int id)
        {
            return context.Enrollments.Where(e => e.EnrollmentId == id).FirstOrDefault();
        }

        public Enrollment GetEnrollmentByUserCourse(int userId, int courseId)
        {
            return context.Enrollments.Where(e => e.UserId == userId && e.CourseId == courseId).FirstOrDefault();
        }
        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public ICollection<Enrollment> GetEnrollmentByCourseId(int courseId)
        {
            return context.Enrollments.Where(e => e.CourseId == courseId).ToList();
        }
    }
}
