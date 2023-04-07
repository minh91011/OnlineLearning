using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class User
{
    public int UserId { get; set; }
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string? Image { get; set; }
    public string? Email { get; set; }
    public string Fullname { get; set; }
    public DateTime Dob { get; set; }
    public virtual ICollection<CommentVote> CommentVotes { get; } = new List<CommentVote>();
    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();
    public virtual ICollection<Course> Courses { get; } = new List<Course>();

    public virtual ICollection<Enrollment> Enrollments { get; } = new List<Enrollment>();

    public virtual ICollection<PostVote> PostVotes { get; } = new List<PostVote>();

    public virtual ICollection<Post> Posts { get; } = new List<Post>();

    public virtual ICollection<StudentAnswer> StudentAnswers { get; } = new List<StudentAnswer>();
}
