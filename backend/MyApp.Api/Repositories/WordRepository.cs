using MongoDB.Bson;
using MyApp.Api.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using MongoDB.Driver;
using MyApp.Api.Interfaces;
using System.Threading.Tasks;

namespace MyApp.Api.Repositories
{
    public class WordRepository : IWordRepository
    {
        private readonly IMongoCollection<Word> _words;

        public WordRepository(IConfiguration configuration)
        {
            // Création du client MongoDB à partir de la configuration
            var client = new MongoClient(configuration["MongoDb:ConnectionString"]);
            var database = client.GetDatabase(configuration["MongoDb:Database"]);
            _words = database.GetCollection<Word>("Words");
        }

        // Récupération asynchrone de tous les mots
        public async Task<List<Word>> GetAllAsync()
        {
            return await _words.Find(_ => true).ToListAsync();
        }

        // Récupération asynchrone par id
        public async Task<Word?> GetByIdAsync(string id)
        {
            return await _words.Find(word => word.Id == id).FirstOrDefaultAsync();
        }

        // Insertion asynchrone
        public async Task CreateAsync(Word word)
        {
            await _words.InsertOneAsync(word);
        }

        // Remplacement asynchrone du document
        public async Task UpdateAsync(string id, Word word)
        {
            await _words.ReplaceOneAsync(w => w.Id == id, word);
        }

        // Suppression asynchrone
        public async Task DeleteAsync(string id)
        {
            await _words.DeleteOneAsync(w => w.Id == id);
        }
    }
}