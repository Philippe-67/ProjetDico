using MyApp.Api.Interfaces;
using MyApp.Api.Repositories;
using MyApp.Api.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace MyApp.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                var builder = WebApplication.CreateBuilder(args);

            // On ajoute les services nécessaires pour les contrôleurs (API standard)
            builder.Services.AddControllers();

            // Enregistrement des dépendances avec les bonnes interfaces
            builder.Services.AddSingleton<IWordRepository, WordRepository>();
            builder.Services.AddScoped<IWordService, WordService>();
            builder.Services.AddSingleton<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IUserService, UserService>();
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Ajout de la configuration CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            })
            .AddJwtBearer("JwtBearer", options =>
            {
                options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = "ProjetDico",
                    ValidAudience = "ProjetDico",
                    IssuerSigningKey = new Microsoft.IdentityModel.Tokens.SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("IamA32ByteSuperSecretKeyForJWT!!123")) // 32 caractères ASCII
                };
            });

            var app = builder.Build();

            // On configure le pipeline HTTP
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Utilisation de la politique CORS (doit être avant UseHttpsRedirection)
            app.UseCors("AllowFrontend");
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            // On indique à l'application d'utiliser les contrôleurs
            app.MapControllers();

            app.Run();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erreur fatale au démarrage: {ex}");
                throw;
            }
        }
    }
}
