using System;
using System.Text.Json.Serialization;
namespace TheCatApi_Test.Models
{
    public class BreedsModel
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("life_span")]
        public string LifeSpan { get; set; }

        [JsonPropertyName("origin")]
        public string Origin { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("temperament")]
        public string Temperament { get; set; }

        [JsonPropertyName("short_legs")]
        public int ShortLegs { get; set; }

        [JsonPropertyName("wikipedia_url")]
        public Uri WikipediaUrl { get; set; }

        [JsonPropertyName("country_code")]
        public string CountryCode { get; set; }

        [JsonPropertyName("social_needs")]
        public int SocialNeeds { get; set; }

        [JsonPropertyName("stranger_friendly")]
        public int StrangerFriendly { get; set; }
    }
}
