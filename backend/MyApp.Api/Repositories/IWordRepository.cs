using System.Collections.Generic;
using MyApp.Api.Models;

namespace MyApp.Api.Repositories
{
    public interface IWordRepository
    {
        List<Word> GetAll();
        Word GetById(string id);
        void Create(Word word);
        void Update(string id, Word word);
        void Delete(string id);
    }
}
