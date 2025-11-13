using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using MyApp.Api.Models;
using MyApp.Api.Interfaces;

namespace MyApp.Api.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User?> RegisterAsync(string username, string password)
        {
            var existing = await _userRepository.GetByUsernameAsync(username);
            if (existing != null) return null;

            var passwordHash = HashPassword(password);
            var user = new User { Username = username, PasswordHash = passwordHash };
            await _userRepository.CreateAsync(user);
            return user;
        }

        public async Task<User?> AuthenticateAsync(string username, string password)
        {
            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null) return null;
            if (user.PasswordHash != HashPassword(password)) return null;
            return user;
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }
    }
}
