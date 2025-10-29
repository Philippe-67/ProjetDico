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
        public void GetAllWords_ReturnsOkResult_WithListOfWords()
        {
            // Arrange
            var expectedWords = new List<Word>
            {
                new Word { Id = "1", SourceText = "Hello", TargetText = "Bonjour" },
                new Word { Id = "2", SourceText = "World", TargetText = "Monde" }
            };

            _mockWordService.Setup(service => service.GetAll())
                          .Returns(expectedWords);

            // Act
            var result = _controller.GetAllWords();

            // Assert
            var actionResult = result.Result;
            actionResult.Should().NotBeNull().And.BeOfType<OkObjectResult>();
            var okResult = (OkObjectResult)actionResult;
            okResult.Value.Should().NotBeNull().And.BeEquivalentTo(expectedWords);
        }
    }
}