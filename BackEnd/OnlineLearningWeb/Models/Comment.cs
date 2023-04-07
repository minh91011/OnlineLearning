using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public int UserId { get; set; }

    public int PostId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime? Date { get; set; }

    public int Upvote { get; set; }

    public int Downvote { get; set; }

    public virtual ICollection<CommentVote> CommentVotes { get; } = new List<CommentVote>();

    public virtual Post Post { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
