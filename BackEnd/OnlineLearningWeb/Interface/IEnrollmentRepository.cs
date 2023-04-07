using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface IEnrollmentRepository
    {
        ICollection<Enrollment> GetAllEnrollments();

        ICollection<Enrollment> GetEnrollmentByUserId(int userId);

        ICollection<Enrollment> GetEnrollmentByCourseId(int userId);
        bool CreateEnrollment(Enrollment enrollment);

        Enrollment GetEnrollmentById(int id);

        Enrollment GetEnrollmentByUserCourse(int userId, int courseId);



    }
}
