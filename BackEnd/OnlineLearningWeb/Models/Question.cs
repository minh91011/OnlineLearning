using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class Question
{
    public int QuestionId { get; set; }

    public int AssignmentId { get; set; }

    public string Content { get; set; } = null!;

    public string AnswerA { get; set; } = null!;

    public string AnswerB { get; set; } = null!;

    public string AnswerC { get; set; } = null!;

    public string AnswerD { get; set; } = null!;

    public string TrueAnswer { get; set; } = null!;

    public virtual Assignment Assignment { get; set; } = null!;

    public virtual ICollection<StudentAnswer> StudentAnswers { get; } = new List<StudentAnswer>();
}
