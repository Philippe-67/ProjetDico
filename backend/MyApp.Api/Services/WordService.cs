using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.Api.Models;
using MyApp.Api.Interfaces;

namespace MyApp.Api.Services
{
    public class WordService : IWordService
    {
        private readonly IWordRepository _wordRepository;

        public WordService(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        // Délégation vers le repository (possibilité d'ajouter logique métier)
        public Task<List<Word>> GetAllAsync() => _wordRepository.GetAllAsync();

        public Task<Word?> GetByIdAsync(string id) => _wordRepository.GetByIdAsync(id);

        public Task CreateAsync(Word word)
        {
            // Ici on peut ajouter des validations ou règles métier avant insertion
            return _wordRepository.CreateAsync(word);
        }

        public Task UpdateAsync(string id, Word word) => _wordRepository.UpdateAsync(id, word);

        public Task DeleteAsync(string id) => _wordRepository.DeleteAsync(id);
    }
}
