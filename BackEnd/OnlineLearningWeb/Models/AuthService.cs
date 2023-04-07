using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using OnlineLearningWeb.Models;
using OnlineLearningWeb.Interface;
using static System.Net.Mime.MediaTypeNames;
using System.Security.Claims;

namespace OnlineLearningWeb.Models
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public UserClaims GetUserFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "user_id");
            var usernameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
            var emailClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            var roleClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
            var imageClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "image");
            var fullnameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "fullname");
            var dobClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "dob");
            return new UserClaims
            {
                UserId = int.Parse(userIdClaim.Value),
                Username = usernameClaim.Value,
                Email = emailClaim.Value,
                Role = roleClaim.Value,
                Image = imageClaim.Value,
                Fullname = fullnameClaim.Value,
                Dob = DateTime.FromBinary(long.Parse(dobClaim.Value))
            };
        }
    }
}
