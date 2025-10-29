using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using System.Threading.Tasks;
using Xunit;
using MyApp.Api;
using System.Net;
using FluentAssertions;

namespace MyApp.IntegrationTests
{
    public class WordControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;

        public WordControllerIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetAllWords_ReturnsSuccessStatusCode()
        {
            // Arrange
            var httpResponse = await _client.GetAsync("/api/word");

            // Act & Assert
            httpResponse.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}