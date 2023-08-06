import { Grid } from "@chakra-ui/react";
import { useRef } from "react";

import Banner from "./components/Banner";
import WeatherGetter from "./components/WeatherGetter";

const Home = () => {

  const weatherRef = useRef<null | HTMLDivElement>(null)
  const executeScroll = () => {
    if (!!weatherRef && !!weatherRef.current) return weatherRef.current.scrollIntoView()
    return null
  }
  return (
    <Grid gap={4}>
      <Banner scrollFunc={executeScroll} />
      <div ref={weatherRef}>
        <WeatherGetter />
      </div>
    </Grid>
  );
};

export default Home;
