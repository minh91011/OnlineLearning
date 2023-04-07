using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface IStudentAnswerRepository
    {
        public bool CreateStudentAnswer(StudentAnswer studentAnswer);
        public bool UpdateStudentAnswer(StudentAnswer studentAnswer);
        public StudentAnswer GetStudentAnswerByUserIdAndQuestionId(int userId, int questionId);
        public IEnumerable<StudentAnswer> GetStudentAnswersThatTrueByAssignmentId(int userId, int assignmentId);
        public IEnumerable<StudentAnswer> GetStudentAnswersByAssignmentId(int userId, int assignmentId);
        bool Save();
    }
}
