using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TheCatApi_Test.Models;

namespace TheCatApi_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<ImageModel> _logger;

        public ImageController(IConfiguration iconfig, ILogger<ImageModel> logger)
        {
            _httpClient = new HttpClient();
            _configuration = iconfig;
            _logger = logger;
        }

        private const string URL_Location = "/v1/images/search?breed_id=";

        [HttpGet("breed_id={breedid}")]
        public async Task<ActionResult> Get(string breedId)
        {
            try
            {
                var API_Header = _configuration.GetValue<string>("API_Credential:API_Header");
                var BASE_URL = _configuration.GetValue<string>("API_Credential:BASE_URL");

                _httpClient.DefaultRequestHeaders.Add(API_Header, _configuration.GetValue<string>("API_Credential:TheCatAPIKey"));

                var resp = await _httpClient.GetStringAsync(BASE_URL + URL_Location + WebUtility.HtmlEncode(breedId));

                var image = JsonSerializer.Deserialize<ImageModel[]>(resp);

                return Ok(image);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status404NotFound);
            }
        }
    }
}
