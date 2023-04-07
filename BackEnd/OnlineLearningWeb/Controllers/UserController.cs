using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using OnlineLearningWeb.Models;
using Microsoft.AspNetCore.Identity;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Repository;
using Microsoft.AspNetCore.Authorization;

namespace OnlineLearningWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;
        public UserController(IUserRepository userRepository, IConfiguration configuration, IAuthService authService)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _authService = authService;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]

        public IActionResult GetUsers()
        {
            var users = _userRepository.GetUsers();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(users);
        }
        [HttpGet("getUserByToken")]
        public IActionResult GetUserByToken(string token)
        {
            var userClaims = _authService.GetUserFromToken(token);
            if (userClaims == null)
            {
                return Unauthorized();
            }
            return Ok(userClaims);
        }
        [HttpGet("getUserById")]

        public IActionResult GetUserByID(int id)
        {
            var user = _userRepository.GetUserByID(id);
            if (!ModelState.IsValid) return BadRequest(ModelState);
            return Ok(user);
        }
        [HttpDelete("deleteUserById")]
        public IActionResult DeleteUserByID(int id)
        {
            var user = _userRepository.DeleteUser(_userRepository.GetUserByID(id));
            return Ok(user);
        }
        [HttpPost("role")]
        public IActionResult ChangeRole([FromBody] ChangeRole model)
        {
            var user = _userRepository.GetUserByUsername(model.username);
            user.Role = model.newrole;
            _userRepository.UpdateUser(user);
            return Ok();
        }
        [HttpPost("changepassword")]
        //[Authorize]
        public IActionResult ChangePassword([FromBody] ChangePassword model)
        {
            var user = _userRepository.GetUserByUsernameAndPassword(model.Username, model.Password);
            if (user == null) return BadRequest("Wrong username or password");
            if (string.Compare(model.NewPassword, model.ConfirmNewPassword) != 0)
                return BadRequest("New password and comfirmation password do not match");
            user.Password = model.NewPassword;
            _userRepository.UpdateUser(user);
            return Ok("Password updated successfully");
        }
        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] SignupModel user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            User existingUser = _userRepository.GetUserByUsername(user.Username);
            if (existingUser != null) return BadRequest("User existed");
            if (user.Password != user.RePassword) return BadRequest("Password and repassword not match");
            _userRepository.CreateUser(user);
            return Ok("Sign Up successfully");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginModel model)
        {
            try
            {
                var user = _userRepository.GetUserByUsernameAndPassword(model.Username, model.Password);

                if (user == null)
                {
                    return BadRequest("Invalid username or password.");
                }

                var tokenString = GenerateJwtToken(user);
                return Ok(new { Token = tokenString });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        private string GenerateJwtToken(User user)
        {
            if (user == null) return null;
            var secretKey = _configuration.GetValue<string>("Jwt:SecretKey");
            var issuer = _configuration.GetValue<string>("Jwt:Issuer");
            var audience = _configuration.GetValue<string>("Jwt:Audience");
            var claims = new List<Claim>
            {
                new Claim("user_id", user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("image", user.Image),
                new Claim("fullname", user.Fullname),
                new Claim("dob", user.Dob.ToBinary().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}