namespace OnlineLearningWeb.Models
{
    public class SignupModel
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string RePassword { get; set; } = null!;
        public string? Email { get; set; }
        public string Fullname { get; set; }
        public DateTime Dob { get; set; }
    }
}
