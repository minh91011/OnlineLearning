using System.Threading.Tasks;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Interface
{
    public interface IAuthService
    {
        UserClaims GetUserFromToken(string token);
    }
}
