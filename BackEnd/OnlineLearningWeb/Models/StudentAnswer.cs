using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class StudentAnswer
{
    public int StudentAnswerId { get; set; }

    public int UserId { get; set; }

    public int QuestionId { get; set; }

    public string ChoiceValue { get; set; } = null!;

    public virtual Question Question { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
