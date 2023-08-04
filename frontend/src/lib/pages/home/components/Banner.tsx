'use client'

import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react'

export default function Banner() {
  return (
    <Flex
      w={'full'}
      h={'40vh'}
      backgroundImage={
        'url(https://cdn.pixabay.com/photo/2021/01/22/18/09/windy-5940755_1280.png)'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        justify={'center'}
        align='flex-start'
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={2}>
          <Text
            color={'white'}
            fontWeight={800}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '3xl' })}>
            Check the Weather!{<br />}
            Wherever.{<br />}
            Whenever.
          </Text>
          <Stack direction={'row'}>
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              _hover={{ bg: 'blue.500' }}
              onClick={() => {
                const classLocation = document.querySelector(".weather")
                window.scrollTo(0, classLocation ? classLocation.scrollTop : 1000);
              }}
              >
              Show me
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  )
}
