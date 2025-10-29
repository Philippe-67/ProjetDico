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
                // Log de l'erreur possible ici
                return StatusCode(500, "Une erreur est survenue lors de la récupération des mots.");
            }
        }
    }
}
