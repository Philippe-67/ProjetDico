using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace MyApp.Api.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("username")]
        public required string Username { get; set; }
        [BsonElement("passwordHash")]
        public required string PasswordHash { get; set; }
    }
}
