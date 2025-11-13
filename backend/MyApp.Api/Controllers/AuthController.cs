using Microsoft.AspNetCore.Mvc;
using MyApp.Api.Interfaces;
using MyApp.Api.Models;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MyApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = await _userService.RegisterAsync(request.Username, request.Password);
            if (user == null)
                return BadRequest(new { message = "Nom d'utilisateur déjà utilisé." });
            return Ok(new { user.Id, user.Username });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var user = await _userService.AuthenticateAsync(request.Username, request.Password);
                if (user == null)
                    return Unauthorized(new { message = "Identifiants invalides." });

                // Génération du JWT
                var token = GenerateJwtToken(user);
                return Ok(new { user.Id, user.Username, token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erreur serveur: " + ex.Message });
            }
        }

        private string GenerateJwtToken(User user)
        {
            var key = new System.Text.UTF8Encoding().GetBytes("IamA32ByteSuperSecretKeyForJWT!!123"); // À mettre en config !
            var claims = new[]
            {
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.NameIdentifier, user.Id ?? ""),
                new System.Security.Claims.Claim(System.Security.Claims.ClaimTypes.Name, user.Username)
            };
            var creds = new Microsoft.IdentityModel.Tokens.SigningCredentials(
                new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(key),
                Microsoft.IdentityModel.Tokens.SecurityAlgorithms.HmacSha256
            );
            var token = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(
                issuer: "ProjetDico",
                audience: "ProjetDico",
                claims: claims,
                expires: System.DateTime.Now.AddDays(7),
                signingCredentials: creds
            );
            return new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
