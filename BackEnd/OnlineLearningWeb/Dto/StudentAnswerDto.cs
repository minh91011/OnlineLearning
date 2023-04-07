namespace OnlineLearningWeb.Dto
{
    public class StudentAnswerDto
    {
        public int StudentAnswerId { get; set; }

        public int UserId { get; set; }

        public int QuestionId { get; set; }

        public string ChoiceValue { get; set; } = null!;
    }
}
