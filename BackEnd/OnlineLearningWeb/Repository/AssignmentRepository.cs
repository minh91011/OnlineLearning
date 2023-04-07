using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Repository
{
    public class AssignmentRepository : IAssignmentRepository
    {
        private readonly OnlineLearningContext _context;
        public AssignmentRepository(OnlineLearningContext context)
        {
            _context = context;
        }
        public bool AssignmentExist(int id)
        {
            return _context.Assignments.Any(p => p.AssignmentId == id);
        }

        public bool CreateAssignment(Assignment assignment)
        {
            _context.Add(assignment);
            return Save();
        }

        public bool DeleteAssignment(Assignment assignment)
        {
            List<Question> questions = GetQuestions(assignment.AssignmentId).ToList();
            _context.RemoveRange(questions);
            _context.Remove(assignment);
            return Save();
        }

        public Assignment GetAssignment(int id)
        {
            return _context.Assignments.Where(p => p.AssignmentId == id).FirstOrDefault();
        }

        public ICollection<Assignment> GetAssignments()
        {
            return _context.Assignments.ToList();
        }

        public ICollection<Question> GetQuestions(int id)
        {
            return _context.Questions.Where(p => p.AssignmentId == id).ToList();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateAssignment(Assignment assignment)
        {
            _context.Update(assignment);
            return Save();
        }
    }
}
