using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface IAssignmentRepository
    {
        ICollection<Assignment> GetAssignments();
        Assignment GetAssignment(int id);
        ICollection<Question> GetQuestions(int id);
        bool AssignmentExist(int id);
        bool CreateAssignment(Assignment assignment);
        bool UpdateAssignment(Assignment assignment);
        bool DeleteAssignment(Assignment assignment);
        bool Save();
    }
}
