using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Data;

namespace OnlineLearningWeb.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly OnlineLearningContext _context;
        public UserRepository(OnlineLearningContext onlineLearningContext)
        {
            _context = onlineLearningContext;
        }
        public bool Save()
        {
            return (_context.SaveChanges() > 0);
        }
        public User GetUserByID(int id)
        {
            return _context.Users.FirstOrDefault(x => x.UserId == id);
        }
        public IEnumerable<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public bool CreateUser(SignupModel userSignup)
        {
            var user = new User
            {
                Username = userSignup.Username,
                Password = userSignup.Password,
                Role = "student",
                Image = "a",
                Email = (userSignup.Email != "" ? userSignup.Email : "a"),
                Fullname = (userSignup.Fullname != "" ? userSignup.Fullname : "a"),
                Dob = userSignup.Dob,
            };
            _context.Users.Add(user);
            return Save();
        }

        public bool DeleteUser(User user)
        {
            _context.Remove(user);
            return Save();
        }

        public bool UpdateUser(User user)
        {
            _context.Users.Update(user);
            return Save();
        }
        public User GetUserByUsername(string username)
        {
            User user = _context.Users.FirstOrDefault(u => u.Username == username);
            return user;
        }
        public User GetUserByUsernameAndPassword(string username, string password)
        {
            User user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null || user.Password != password)
                return null;
            return user;
        }
        public ICollection<Course> GetCoursesCreateByUser(int userId)
        {
            return _context.Courses.Where(c => c.UserId == userId).ToList();
        }
        public bool Exist(int id)
        {
            return _context.Users.Any(x => x.UserId == id);
        }
        public ICollection<Course> GetCoursesEnrolledByUser(int userId)
        {
            return _context.Enrollments.Where(e => e.UserId == userId).Select(e => e.Course).ToList();
        }
    }
}
