import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Forecast } from "../types/types";

interface WeatherCardProps {
    forecastData: Forecast
}

const weatherPicSrcs = {
    'snow': 'https://cdn.pixabay.com/photo/2013/10/27/17/14/snowfall-201496_1280.jpg' as string,
    'shower': 'https://cdn.pixabay.com/photo/2017/03/16/20/20/man-2150164_1280.jpg' as string,
    'cloud': 'https://cdn.pixabay.com/photo/2016/03/27/07/32/clouds-1282314_1280.jpg' as string,
    'sun': 'https://cdn.pixabay.com/photo/2016/01/08/05/24/sunflower-1127174_1280.jpg' as string,
}

function getImageSource(forecastDesc: string): string {
    if (forecastDesc.includes('snow')) {
        return weatherPicSrcs.snow
    }
    if (forecastDesc.includes('shower')) {
        return weatherPicSrcs.shower
    }
    if (forecastDesc.includes('cloud')) {
        return weatherPicSrcs.cloud
    }

    return weatherPicSrcs.sun
}

const WeatherCard: React.FC<WeatherCardProps> = ({forecastData}) => {
    return <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
  >
    <Image
      objectFit='cover'
      maxW={{ base: '100%', sm: '200px' }}
      src={getImageSource(forecastData.shortForecast.toLowerCase())}
      alt={`weather-indicator`}
    />
  
    <Stack>
      <CardBody>
        <Heading size='md'>{forecastData.name}</Heading>
        <Text py='2'>
          {forecastData.temperature}{'°'}{forecastData.temperatureUnit}
        </Text>
      </CardBody>
      <CardFooter>
        <Text py='4'>
        {forecastData.shortForecast}
        </Text>
      </CardFooter>
    </Stack>
  </Card>
}

export default WeatherCard;
