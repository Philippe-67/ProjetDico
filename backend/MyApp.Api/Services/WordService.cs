using System.Collections.Generic;
using MyApp.Api.Models;
using MyApp.Api.Repositories;

namespace MyApp.Api.Services
{
    public class WordService
    {
        private readonly IWordRepository _wordRepository;

        public WordService(IWordRepository wordRepository)
        {
            _wordRepository = wordRepository;
        }

        public List<Word> GetAll()
        {
            return _wordRepository.GetAll();
        }

        public Word GetById(string id)
        {
            return _wordRepository.GetById(id);
        }

        public void Create(Word word)
        {
            // Ici tu peux ajouter des vérifications métier (ex: champs non vides)
            _wordRepository.Create(word);
        }

        public void Update(string id, Word word)
        {
            _wordRepository.Update(id, word);
        }

        public void Delete(string id)
        {
            _wordRepository.Delete(id);
        }
    }
}
