using System.Collections.Generic;
using System.Threading.Tasks;
using MyApp.Api.Models;

namespace MyApp.Api.Interfaces
{
    // Contrat métier : méthodes asynchrones
    public interface IWordService
    {
        Task<List<Word>> GetAllAsync();
        Task<Word?> GetByIdAsync(string id);
        Task CreateAsync(Word word);
        Task UpdateAsync(string id, Word word);
        Task DeleteAsync(string id);
    }
}