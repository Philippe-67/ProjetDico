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
        private readonly Services.WordService _wordService;

        public WordController(Services.WordService wordService)
        {
            _wordService = wordService;
        }

        [HttpGet]
        public ActionResult<List<Word>> GetAllWords()
        {
            return _wordService.GetAll();
        }
    }
}
