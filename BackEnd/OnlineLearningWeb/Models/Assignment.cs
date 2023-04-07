using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class Assignment
{
    public int AssignmentId { get; set; }

    public string Title { get; set; } = null!;

    public int ChapterId { get; set; }

    public virtual Chapter Chapter { get; set; } = null!;

    public virtual ICollection<Question> Questions { get; } = new List<Question>();
}
