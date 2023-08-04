export interface WeatherForecast {
    forecast: WeatherResponse | null;
}

export interface AddressMatch {
    coordinates: Coordinates | null;
}

export interface Coordinates {
    x: number;
    y: number;
}

export interface Result {
    addressMatches: AddressMatch[] | null;
}

export interface GeoResponse {
    result: Result | null;
}

export interface WeatherResponse {
    properties: WeatherProperties | null;
}

export interface WeatherProperties {
    periods: Forecast[] | null;
}

export interface Forecast {
    number: number;
    name: string;
    temperature: number;
    temperatureUnit: string;
    windSpeed: string;
    shortForecast: string;
    precipitationProb: ProbabilityOfPrecipitation | null;
}

export interface ProbabilityOfPrecipitation {
    value: number;
}

export interface PointsResponse {
    properties: PointsProperties | null;
}

export interface PointsProperties {
    forecast: string;
}

export interface AddressInput {
    street: string;
    city: string;
    state: string;
    zip: string;
}
