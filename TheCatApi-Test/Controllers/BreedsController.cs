using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using TheCatApi_Test.Models;

namespace TheCatApi_Test.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BreedsController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        private readonly IConfiguration _configuration;

        private readonly ILogger<BreedsModel> _logger;

        public BreedsController(IConfiguration iconfig,ILogger<BreedsModel> logger)
        {
            _httpClient = new HttpClient();
            _configuration = iconfig;
            _logger = logger;
        }

        private const string URL_Location = "/v1/breeds";

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try {
                //set API_Header and BASE_URL value from appsetting.json
                var API_Header = _configuration.GetValue<string>("API_Credential:API_Header");
                var BASE_URL = _configuration.GetValue<string>("API_Credential:BASE_URL");

                _httpClient.DefaultRequestHeaders.Add(API_Header, _configuration.GetValue<string>("API_Credential:APIKey"));

                var resp = await _httpClient.GetStringAsync(BASE_URL + URL_Location);

                var breeds = JsonSerializer.Deserialize<BreedsModel[]>(resp);

                return Ok(breeds);

            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status400BadRequest);
            }
        }
    
    }
}
