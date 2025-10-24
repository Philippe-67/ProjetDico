using MongoDB.Bson;
using MyApp.Api.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using MongoDB.Driver;


namespace MyApp.Api.Repositories
{
    public class WordRepository : IWordRepository
    {
        private readonly IMongoCollection<Word> _words;

        public WordRepository(IConfiguration configuration)
        {
            var client = new MongoClient(configuration["MongoDb:ConnectionString"]);
            var database = client.GetDatabase(configuration["MongoDb:Database"]);
            _words = database.GetCollection<Word>("Words");
        }

        public List<Word> GetAll()
        {
            return _words.Find(_ => true).ToList();
        }

        public Word GetById(string id)
        {
            return _words.Find(word => word.Id == id).FirstOrDefault();
        }

        public void Create(Word word)
        {
            _words.InsertOne(word);
        }

        public void Update(string id, Word word)
        {
            _words.ReplaceOne(w => w.Id == id, word);
        }

        public void Delete(string id)
        {
            _words.DeleteOne(w => w.Id == id);
        }
    }
}

       