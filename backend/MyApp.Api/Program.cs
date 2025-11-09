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
            var builder = WebApplication.CreateBuilder(args);

            // On ajoute les services nécessaires pour les contrôleurs (API standard)
            builder.Services.AddControllers();

            // Enregistrement des dépendances avec les bonnes interfaces
            builder.Services.AddSingleton<IWordRepository, WordRepository>();
            builder.Services.AddScoped<IWordService, WordService>();
            
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // On configure le pipeline HTTP
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // On indique à l'application d'utiliser les contrôleurs
            app.MapControllers();

            app.Run();
        }
    }
}
