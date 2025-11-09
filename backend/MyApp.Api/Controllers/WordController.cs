using Microsoft.AspNetCore.Mvc;
using MyApp.Api.Repositories;
using MyApp.Api.Models;
using System.Collections.Generic;

namespace MyApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WordController : ControllerBase
    {
        private readonly Interfaces.IWordService _wordService;

        public WordController(Interfaces.IWordService wordService)
        {
            _wordService = wordService;
        }

        /// <summary>
        /// Récupère la liste de tous les mots du dictionnaire.
        /// </summary>
        /// <returns>Liste des mots</returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<Word>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<List<Word>> GetAllWords()
        {
            try
            {
                var words = _wordService.GetAll();
                return Ok(words); // 200 OK avec la liste des mots
            }
            catch (Exception)
            {
                return StatusCode(500, "Une erreur est survenue lors de la récupération des mots.");
            }
        }

        /// <summary>
        /// Récupère un mot par son identifiant.
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Word), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Word> GetWordById(string id)
        {
            var word = _wordService.GetById(id);
            if (word == null)
                return NotFound($"Aucun mot trouvé avec l'id {id}");
            return Ok(word);
        }

        /// <summary>
        /// Ajoute un nouveau mot au dictionnaire.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult CreateWord([FromBody] Word word)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(word.SourceText) ||
                    string.IsNullOrWhiteSpace(word.SourceLanguage) ||
                    string.IsNullOrWhiteSpace(word.TargetText) ||
                    string.IsNullOrWhiteSpace(word.TargetLanguage))
                {
                    return BadRequest("Tous les champs sont obligatoires.");
                }

                _wordService.Create(word);
                return CreatedAtAction(nameof(GetWordById), new { id = word.Id }, word);
            }
            catch (Exception)
            {
                return StatusCode(500, "Une erreur est survenue lors de l'ajout du mot.");
            }
        }

        /// <summary>
        /// Met à jour un mot existant.
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateWord(string id, [FromBody] Word word)
        {
            if (string.IsNullOrWhiteSpace(word.SourceText) ||
                string.IsNullOrWhiteSpace(word.SourceLanguage) ||
                string.IsNullOrWhiteSpace(word.TargetText) ||
                string.IsNullOrWhiteSpace(word.TargetLanguage))
            {
                return BadRequest("Tous les champs sont obligatoires.");
            }

            var existing = _wordService.GetById(id);
            if (existing == null)
                return NotFound($"Aucun mot trouvé avec l'id {id}");

            _wordService.Update(id, word);
            return NoContent();
        }

        /// <summary>
        /// Supprime un mot du dictionnaire.
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteWord(string id)
        {
            var existing = _wordService.GetById(id);
            if (existing == null)
                return NotFound($"Aucun mot trouvé avec l'id {id}");

            _wordService.Delete(id);
            return NoContent();
        }
    }
}
