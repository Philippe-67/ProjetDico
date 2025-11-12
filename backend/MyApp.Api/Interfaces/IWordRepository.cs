using System.Collections.Generic;
using MyApp.Api.Models;

namespace MyApp.Api.Interfaces
{
    // Contrat d'accès aux données : méthodes asynchrones pour I/O
    public interface IWordRepository
    {
        Task<List<Word>> GetAllAsync();             // Récupérer tous les mots (async)
        Task<Word?> GetByIdAsync(string id);        // Récupérer un mot par id (async)
        Task CreateAsync(Word word);                // Insérer un mot (async)
        Task UpdateAsync(string id, Word word);     // Mettre à jour un mot (async)
        Task DeleteAsync(string id);                // Supprimer un mot (async)
    }
}
