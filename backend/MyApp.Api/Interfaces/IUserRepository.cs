using System.Threading.Tasks;
using MyApp.Api.Models;
using System.Collections.Generic;

namespace MyApp.Api.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByUsernameAsync(string username);
        Task<User?> GetByIdAsync(string id);
        Task CreateAsync(User user);
    }
}
