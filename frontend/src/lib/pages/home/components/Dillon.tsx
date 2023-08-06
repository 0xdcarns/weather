import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Link,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function Dillon() {
    return (
      <Center py={6}>
        <Box
          maxW={'50vh'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'full'}
            w={'full'}
            src="https://pyxis.nymag.com/v1/imgs/ebb/41a/70818ee743ecb2d780ad4f08b1185a68a5-asheville-lede.jpg"
            objectFit={'cover'}
            alt='Dillon Carns'
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src="https://media.licdn.com/dms/image/D5603AQEhWRDk_d5lDw/profile-displayphoto-shrink_800_800/0/1690831055820?e=1697068800&v=beta&t=YLMKxh_ngJ8mCVTyQeoDhnJcYUGsIAY4hzCkk0yFSiw"
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'3xl'} fontWeight={500} fontFamily={'body'}>
                Dillon Carns
              </Heading>
              <Text color={'gray.500'}>Software Engineer</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>1K+</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Followers
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>1K+</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Connections
                </Text>
              </Stack>
            </Stack>

            <Link href="https://www.linkedin.com/in/dillon-carns-980018117/" isExternal>
            <Button
              w={'full'}
              mt={8}
              bg='blue.500'
              
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                bg:'blue.700'
              }}>
              Follow
            </Button>
          </Link>
          <Link href="https://github.com/0xdcarns" isExternal>
            <Button
              w={'full'}
              mt={8}
              bg='gray.700'
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
                bg:'black'
              }}>
              GitHub
            </Button>
          </Link>
          </Box>
        </Box>
      </Center>
    );
  }