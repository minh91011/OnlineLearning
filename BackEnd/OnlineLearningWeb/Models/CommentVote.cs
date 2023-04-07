using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class CommentVote
{
    public int CommentVoteId { get; set; }

    public int UserId { get; set; }

    public int CommentId { get; set; }

    public bool Vote { get; set; }

    public virtual Comment Comment { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
