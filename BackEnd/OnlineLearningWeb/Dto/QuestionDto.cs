namespace OnlineLearningWeb.Dto
{
    public class QuestionDto
    {
        public int QuestionId { get; set; }

        public int AssignmentId { get; set; }

        public string Content { get; set; } = null!;

        public string AnswerA { get; set; } = null!;

        public string AnswerB { get; set; } = null!;

        public string AnswerC { get; set; } = null!;

        public string AnswerD { get; set; } = null!;

        public string TrueAnswer { get; set; } = null!;
    }
}
