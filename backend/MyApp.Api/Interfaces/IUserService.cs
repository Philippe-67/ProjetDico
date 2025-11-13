using System.Threading.Tasks;
using MyApp.Api.Models;

namespace MyApp.Api.Interfaces
{
    public interface IUserService
    {
        Task<User?> RegisterAsync(string username, string password);
        Task<User?> AuthenticateAsync(string username, string password);
    }
}
