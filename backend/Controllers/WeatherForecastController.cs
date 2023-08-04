using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Json; 

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{

    private readonly ILogger<WeatherForecastController> _logger;

    private async Task<WeatherResponse> GetLocationForecast(string address, string city, string state, string zip, HttpClient httpClient)
    {
        if (string.IsNullOrEmpty(address) || 
            string.IsNullOrEmpty(city) || 
            string.IsNullOrEmpty(state) || 
            string.IsNullOrEmpty(zip))
        {
            throw new ArgumentException("missing a location parameter");
        }
        string apiUrl = $"https://geocoding.geo.census.gov/geocoder/locations/address?street={address}&city=%20{city}&state={state}&zip={zip}&benchmark=Public_AR_Census2020&format=json";
        if (city.Contains("washington") && city.Contains("dc")) {
            apiUrl = $"https://geocoding.geo.census.gov/geocoder/locations/address?street={address}&city=%20{city}&state=DC&zip={zip}&benchmark=Public_AR_Census2020&format=json";
        }
        var geoResponse = await httpClient.GetFromJsonAsync<GeoResponse>(apiUrl);
        if (geoResponse == null || 
            geoResponse.result == null || 
            geoResponse.result.addressMatches == null || 
            !geoResponse.result.addressMatches.Any()) {
            throw new HttpRequestException("invalid geo response");
        }
        var result = await GetGridPts(geoResponse.result.addressMatches[0].coordinates.x, geoResponse.result.addressMatches[0].coordinates.y, httpClient);
        return result;
    }

    private async Task<WeatherResponse> GetGridPts(double x, double y, HttpClient httpClient) 
    {
        string pointsUrl = $"https://api.weather.gov/points/{Math.Round(y,4)},{Math.Round(x,4)}";
        var pointsResponse = await httpClient.GetFromJsonAsync<PointsResponse>(pointsUrl);
        if (pointsResponse == null || pointsResponse.properties == null) {
            throw new HttpRequestException("no points returned");
        }
        var weatherUrl = pointsResponse.properties.forecast;
        return await QueryForecast(weatherUrl, httpClient);
    }

    private async Task<WeatherResponse> QueryForecast(string forecastUri, HttpClient httpClient)
    {
        var weatherResponse = await httpClient.GetFromJsonAsync<WeatherResponse>(forecastUri);
        if (weatherResponse == null || weatherResponse.properties == null)
        {
            throw new HttpRequestException("invalid forecast");
        }
        return weatherResponse;
    }

    private static string ReplaceWhitespaceWithPlus(string input)
    {
        return input.Replace(" ", "+");
    }

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<ActionResult<WeatherForecast>> Get()
    {
        using (HttpClient httpClient = new HttpClient()) {
            httpClient.DefaultRequestHeaders.Add("User-Agent","(insight-test, contact@myweatherapp.com)");
            try
            {
                string addressParam = ReplaceWhitespaceWithPlus(HttpContext.Request.Query["address"].ToString());
                string cityParam = ReplaceWhitespaceWithPlus(HttpContext.Request.Query["city"].ToString());
                string stateParam = HttpContext.Request.Query["state"].ToString();
                string zipCode = HttpContext.Request.Query["zip"].ToString();
                var weatherResponse = await GetLocationForecast(addressParam, cityParam, stateParam, zipCode, httpClient);
                return new WeatherForecast{ Forecast = weatherResponse };
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine("error occurred", ex);
            }
        }

        throw new HttpRequestException("invalid request");
    }
}
