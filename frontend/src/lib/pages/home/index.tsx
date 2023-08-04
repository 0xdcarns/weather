import { Grid } from "@chakra-ui/react";

import Banner from "./components/Banner";
import WeatherGetter from "./components/WeatherGetter";

const Home = () => {
  return (
    <Grid gap={4}>
      <Banner />
      <WeatherGetter />
    </Grid>
  );
};

export default Home;
