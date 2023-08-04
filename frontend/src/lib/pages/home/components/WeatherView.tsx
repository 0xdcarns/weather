import React from "react";
import { WeatherForecast } from "../types/types";
import WeatherCard from "./WeatherCard";

interface WeatherViewProps {
    Forecastdata: WeatherForecast | undefined;
}
  
const WeatherView: React.FC<WeatherViewProps> = ({ Forecastdata }) => {
    if (!!!Forecastdata) {
        return <></>
    }
    return <>
        { Forecastdata.forecast?.properties?.periods?.map(f => <WeatherCard key={f.number} forecastData={f}/>) }
    </>
}

export default WeatherView