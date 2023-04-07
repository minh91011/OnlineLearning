namespace OnlineLearningWeb.Models
{
    public class UserClaims
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Image { get; set; }
        public string Fullname { get; set; }
        public DateTime Dob { get; set; }
    }
}
