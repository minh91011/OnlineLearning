using System;
using System.Collections.Generic;

namespace OnlineLearningWeb.Models;

public partial class PostVote
{
    public int PostVoteId { get; set; }

    public int UserId { get; set; }

    public int PostId { get; set; }

    public bool Vote { get; set; }

    public virtual Post Post { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
