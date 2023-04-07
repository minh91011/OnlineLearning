using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly OnlineLearningContext _context;
        public QuestionRepository(OnlineLearningContext context)
        {
            _context = context;
        }
        public bool CreateQuestion(Question question)
        {
            _context.Add(question);
            return Save();
        }

        public bool DeleteQuestion(Question question)
        {
            _context.Remove(question);
            return Save();
        }

        public Question GetQuestion(int id)
        {
            return _context.Questions.Where(p => p.QuestionId == id).FirstOrDefault();
        }

        public ICollection<Question> GetQuestions()
        {
            return _context.Questions.ToList();
        }

        public bool QuestionExist(int id)
        {
            return _context.Questions.Any(p => p.QuestionId == id);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateQuestion(Question question)
        {
            _context.Update(question);
            return Save();
        }
    }
}
