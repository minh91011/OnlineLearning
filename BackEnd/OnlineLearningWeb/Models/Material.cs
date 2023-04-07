using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class Material
{
    public int MaterialId { get; set; }

    public int ChapterId { get; set; }

    public string Title { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual Chapter Chapter { get; set; } = null!;
}
