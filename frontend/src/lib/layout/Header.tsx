import { Box, Flex, Heading } from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={0}
    >
      <Box flex='1'>
        <Heading as='h2' size='1xl' noOfLines={1}>What the Weather Doing?</Heading>
      </Box>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
