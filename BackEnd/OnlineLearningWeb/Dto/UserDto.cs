namespace OnlineLearningWeb.Dto
{
    public class UserDto
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? Image { get; set; }
        public string? Email { get; set; }
        public string Fullname { get; set; }
        public DateTime Dob { get; set; }
    }
}
