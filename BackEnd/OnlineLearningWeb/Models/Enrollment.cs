using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class Enrollment
{
    public int EnrollmentId { get; set; }

    public int UserId { get; set; }

    public int CourseId { get; set; }

    public DateTime Date { get; set; }

    public string? TransactionId { get; set; }

    public string? PayerId { get; set; }

    public string? EmailPayment { get; set; }
    public string Status { get; set; } = null!;

    public virtual Course Course { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
