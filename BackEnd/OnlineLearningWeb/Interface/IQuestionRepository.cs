using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface IQuestionRepository
    {
        ICollection<Question> GetQuestions();
        Question GetQuestion(int id);
        bool QuestionExist(int id);
        bool CreateQuestion(Question question);
        bool UpdateQuestion(Question question);
        bool DeleteQuestion(Question question);
        bool Save();


    }
}
