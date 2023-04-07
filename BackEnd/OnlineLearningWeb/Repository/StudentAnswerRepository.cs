using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class StudentAnswerRepository : IStudentAnswerRepository
    {
        private readonly OnlineLearningContext _context;
        public StudentAnswerRepository(OnlineLearningContext context)
        {
            _context = context;
        }
        public bool CreateStudentAnswer(StudentAnswer studentAnswer)
        {
            _context.Add(studentAnswer);
            return Save();
        }

        public StudentAnswer GetStudentAnswerByUserIdAndQuestionId(int userId, int questionId)
        {
            return _context.StudentAnswers.Where(p => p.UserId == userId && p.QuestionId == questionId).FirstOrDefault();
        }

        public IEnumerable<StudentAnswer> GetStudentAnswersByAssignmentId(int userId, int assignmentId)
        {
            var questions = _context.Questions.Where(p => p.AssignmentId == assignmentId).ToList();
            var studentAnswers = new List<StudentAnswer>();
            foreach (var question in questions)
            {
                var studentAnswer = GetStudentAnswerByUserIdAndQuestionId(userId, question.QuestionId);
                if (studentAnswer != null)
                {
                    studentAnswers.Add(studentAnswer);
                }
            }
            return studentAnswers;
        }

        public IEnumerable<StudentAnswer> GetStudentAnswersThatTrueByAssignmentId(int userId, int assignmentId)
        {
            var questions = _context.Questions.Where(p => p.AssignmentId == assignmentId).ToList();
            var studentAnswerTrue = new List<StudentAnswer>();
            foreach (var question in questions)
            {
                var studentAnswer = GetStudentAnswerByUserIdAndQuestionId(userId, question.QuestionId);
                if (studentAnswer != null && studentAnswer.ChoiceValue.Equals(question.TrueAnswer)){
                    studentAnswerTrue.Add(studentAnswer);
                }
            }
            return studentAnswerTrue;
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateStudentAnswer(StudentAnswer studentAnswer)
        {
           _context.Update(studentAnswer);
            return Save();
        }
    }
}
