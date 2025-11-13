using System;
using System.Text.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    private static readonly HttpClient client = new HttpClient();
    
    static async Task Main(string[] args)
    {
        Console.WriteLine("Test de l'API d'authentification...");
        
        // Test d'enregistrement
        try
        {
            var registerData = new
            {
                username = "testuser123",
                password = "testpass123"
            };
            
            var json = JsonSerializer.Serialize(registerData);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            var response = await client.PostAsync("http://localhost:7239/api/auth/register", content);
            var responseContent = await response.Content.ReadAsStringAsync();
            
            Console.WriteLine($"Register - Status: {response.StatusCode}");
            Console.WriteLine($"Register - Response: {responseContent}");
            
            if (response.IsSuccessStatusCode)
            {
                // Test de connexion
                var loginData = new
                {
                    username = "testuser123",
                    password = "testpass123"
                };
                
                var loginJson = JsonSerializer.Serialize(loginData);
                var loginContent = new StringContent(loginJson, Encoding.UTF8, "application/json");
                
                var loginResponse = await client.PostAsync("http://localhost:7239/api/auth/login", loginContent);
                var loginResponseContent = await loginResponse.Content.ReadAsStringAsync();
                
                Console.WriteLine($"Login - Status: {loginResponse.StatusCode}");
                Console.WriteLine($"Login - Response: {loginResponseContent}");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur: {ex.Message}");
        }
        
        client.Dispose();
    }
}