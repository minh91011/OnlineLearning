using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class Chapter
{
    public int ChapterId { get; set; }

    public int CourseId { get; set; }

    public string Title { get; set; } = null!;

    public virtual ICollection<Assignment> Assignments { get; } = new List<Assignment>();

    public virtual Course Course { get; set; } = null!;

    public virtual ICollection<Material> Materials { get; } = new List<Material>();
}
