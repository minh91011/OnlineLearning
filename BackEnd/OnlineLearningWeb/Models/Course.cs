using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class Course
{
    public int CourseId { get; set; }

    public int UserId { get; set; }

    public string CourseName { get; set; } = null!;

    public decimal Price { get; set; }

    public string? Img { get; set; }

    public string? Description { get; set; }

    public virtual ICollection<Chapter> Chapters { get; } = new List<Chapter>();

    public virtual ICollection<Enrollment> Enrollments { get; } = new List<Enrollment>();

    public virtual User User { get; set; } = null!;
}
