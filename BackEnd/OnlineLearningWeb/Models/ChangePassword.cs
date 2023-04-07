using System.ComponentModel.DataAnnotations;

namespace OnlineLearningWeb.Models
{
    public class ChangePassword
    {
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        [Required(ErrorMessage = "New Password is required")]
        public string NewPassword { get; set; }
        [Required(ErrorMessage = "Confirm New Password is required")]
        public string ConfirmNewPassword { get; set; }
    }
}
