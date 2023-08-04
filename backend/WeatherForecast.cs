namespace backend;

public class WeatherForecast
{
    public WeatherResponse? Forecast { get; set; }
}

public class AddressMatch
{
    public Coordinates? coordinates { get; set; }
}


public class Coordinates
{
    public double x { get; set; }
    public double y { get; set; }
}

public class Result
{
    public List<AddressMatch>? addressMatches { get; set; }
}

public class GeoResponse
{
    public Result? result { get; set; }
}

public class WeatherResponse
{
    public WeatherProperties? properties { get; set; }
}

public class WeatherProperties
{
    public List<Forecast>? periods { get; set; }
}

public class Forecast
{
    public int number { get; set; }
    public string name { get; set; }
    public int temperature { get; set; }
    public string temperatureUnit { get; set; }
    public string windSpeed { get; set; }
    public string shortForecast { get; set; }
    public ProbabilityOfPrecipitation? precipitationProb { get; set; }
}

public class ProbabilityOfPrecipitation
{
    public int value { get; set; }
}

public class PointsResponse
{
    public PointsProperties? properties { get; set; }
}

public class PointsProperties
{
    public string forecast { get; set; }
}


