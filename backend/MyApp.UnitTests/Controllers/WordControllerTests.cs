using Xunit;
using Moq;
using FluentAssertions;
using MyApp.Api.Controllers;
using MyApp.Api.Services;
using MyApp.Api.Models;
using MyApp.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MyApp.UnitTests.Controllers
{
    public class WordControllerTests
    {
        private readonly Mock<IWordService> _mockWordService;
        private readonly WordController _controller;

        public WordControllerTests()
        {
            _mockWordService = new Mock<IWordService>();
            _controller = new WordController(_mockWordService.Object);
        }

        [Fact]
        public async Task GetAllWords_ReturnsOkResult_WithListOfWords()
        {
            // Arrange
            var expectedWords = new List<Word>
            {
                new Word { Id = "1", SourceText = "Hello", TargetText = "Bonjour" },
                new Word { Id = "2", SourceText = "World", TargetText = "Monde" }
            };

            // Correction : on retourne une Task contenant la liste attendue
            _mockWordService.Setup(service => service.GetAllAsync())
                            .ReturnsAsync(expectedWords);

            // Act
            var result = await _controller.GetAllWords();

            // Assert
            // On récupère l'ActionResult<List<Word>> puis on vérifie le type de son résultat
            var actionResult = result.Result;
            actionResult.Should().NotBeNull().And.BeOfType<OkObjectResult>();
            var okResult = actionResult as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult.Value.Should().NotBeNull().And.BeEquivalentTo(expectedWords);
        }
    }
}