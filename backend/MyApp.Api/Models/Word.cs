using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;    

namespace MyApp.Api.Models
{
    public class Word
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("sourceText")]
        public string? SourceText { get; set; }

        [BsonElement("sourceLanguage")]
        public string? SourceLanguage { get; set; }

        [BsonElement("targetText")]
        public string? TargetText { get; set; }

        [BsonElement("targetLanguage")]
        public string? TargetLanguage { get; set; }
    }
}