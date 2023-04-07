using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Models;
using OnlineLearningWeb.Dto;

namespace OnlineLearningWeb.Interface
{
    public interface IUserRepository
    {
        public User GetUserByID(int id);
        IEnumerable<User> GetUsers();
        public bool CreateUser(SignupModel userSignup);
        public bool DeleteUser(User user);
        public bool UpdateUser(User user);
        public User GetUserByUsernameAndPassword(string username, string password);
        public User GetUserByUsername(string username);
        public bool Exist(int id);
        public ICollection<Course> GetCoursesCreateByUser(int userId);
        public ICollection<Course> GetCoursesEnrolledByUser(int userId);
    }
}
