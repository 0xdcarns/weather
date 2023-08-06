'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  FormErrorMessage,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowDownIcon } from '@chakra-ui/icons'
import { AddressInput, WeatherForecast } from '../types/types'
import WeatherView from './WeatherView'
import Dillon from './Dillon'

export default function WeatherGetter() {
  const [forecastData, setForecastData] = useState(undefined as WeatherForecast | undefined)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const abbreviatedUSStates: string[] = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NC", "NE", "NV", "NH", "NJ",
    "NM", "NY", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const autoFillAddresses: AddressInput[] = [
    {
      street: "7384 Melrose Ave", 
      city: "Los Angeles",
      state: "CA" ,
      zip: "90046",
    },
    {
      street: "250 King St", 
      city: "San Francisco",
      state: "CA" ,
      zip: "94107",
    },
    {
      street: "890 King St", 
      city: "Denver",
      state: "CO" ,
      zip: "80204",
    },
    {
      street: "47 W 13th St,", 
      city: "New York",
      state: "NY" ,
      zip: "10011",
    },
    {
      street: "121 N. LaSalle Street", 
      city: "Chicago",
      state: "IL" ,
      zip: "60602",
    },
    {
      street: "1925 BRICKELL AVE", 
      city: "Miami",
      state: "FL" ,
      zip: "33129",
    },
  ]

  function replaceWhitespace(input: string): string {
    // Use the replace() method with a regular expression to replace all white spaces with '+'
    return input.replace(/\s/g, '+'); // could also URIEncode, but whatever
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  async function fetchWeatherData(values: AddressInput): Promise<WeatherForecast> {
    // this should be a configurable URI at runtime
    const response = await fetch(`http://localhost:5112/weatherforecast?address=${values.street}&city=${values.city}&state=${values.state}&zip=${values.zip}`)
    if (!response.ok) {
      throw new Error('network response was not ok');
    }
  
    const data: WeatherForecast = await response.json();
    return data;
  }

  function onSubmit(values : AddressInput): Promise<void> {
    setIsSubmitting(true)
    return new Promise(async (resolve) => {
      try {
        setCity(values.city)
        setState(values.state)
        if (values.city.toLowerCase().includes('washington') && 
          values.city.toLowerCase().includes('dc')) {
            setCity('washington')
            setState('DC')
        }
        values.street = replaceWhitespace(values.street.toLowerCase())
        values.city = replaceWhitespace(values.city.toLowerCase())
        const forecastData = await fetchWeatherData(values)
        setForecastData(forecastData)
        setIsSubmitting(false)
        onOpen()
        resolve()
      } catch (error) {
        alert(`Error fetching data - ${error}`);
        setIsSubmitting(false)
      }
    })
  }

  return (
    <Flex 
      direction={{ base: 'column', md: 'row' }}
      justify={{ base: 'space-between', md: 'center' }}
      align={{ base: 'center', md: 'center' }}
      wrap="wrap"
      maxW="1000vh"
      m="auto"
      p={4}
    >
      <Center>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Modal isOpen={isOpen} onClose={() => { 
            setForecastData(undefined); 
            setCity('');
            setState('');
            onClose(); 
            }} size={'5xl'}
          >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Flex
                justify={{ base: 'space-between', md: 'center' }}
                align={{ base: 'space-between', md: 'center' }}
                wrap="wrap"
                m="auto"
                p={4}
              >
                <Center width={'100%'}><Text fontSize='4xl'>Weather Forecast</Text></Center>
                <Center width={'100%'}><Text>{!!city && !!state ? `${city.toUpperCase()}, ${state}` : ''}</Text></Center>
                <Center width={'100%'}><Text>{new Date().toLocaleDateString()}</Text></Center>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <WeatherView Forecastdata={forecastData}/>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='orange' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Input your Address
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Get your Weather Forecast ✌️
          </Text>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="street" isRequired>
                    <FormLabel htmlFor='street'>Street</FormLabel>
                    <Input type="text" 
                    {...register('street', {
                      required: 'This is required',
                    })}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="city" isRequired>
                    <FormLabel>City</FormLabel>
                    <Input
                      type="text" 
                      {...register('city', {
                        required: 'This is required',
                      })}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="state" isRequired>
                <FormLabel>State</FormLabel>
                <Select 
                  icon={<ArrowDownIcon />} 
                  defaultValue={'NY'}
                  {...register('state', {
                    required: 'This is required',
                  })}
                >
                  {abbreviatedUSStates.map(state => <option key={state} value={state}>{state}</option>)}
                </Select>
              </FormControl>
              <FormControl id="zip" isRequired isInvalid={!!errors.zip}>
                <FormLabel htmlFor='zip'>Zip Code</FormLabel>
                <InputGroup>
                  <Input
                    type={'text'}
                    {...register('zip', {
                      required: 'This is required',
                      maxLength: { value: 5,  message: 'Length should be 5 numbers'},
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  <>{!!errors.zip && errors.zip.message}</>
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={isSubmitting}
                  type='submit'
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Submit
                </Button>
              </Stack>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                width='100%'
                py={8}
                maxH='100%'
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                bgPosition='center'
                bgRepeat='no-repeat'
                mb={2}
              >
                <Flex
                  justify={{ base: 'space-between', md: 'center' }}
                  align={{ base: 'space-between', md: 'center' }}
                  wrap="wrap"
                  m="auto"
                  p={4}
                >
                  <Center width={'100%'} marginBottom='4px'>
                    <Text>Popular Locations</Text>
                  </Center>
                  {autoFillAddresses.map(addr => 
                    <Button 
                      isLoading={isSubmitting}
                      loadingText="Fetching"
                      key={addr.street}
                      colorScheme='teal'
                      width={'15vh'}
                      margin='2px'
                      onClick={() => onSubmit(addr)}
                      >
                      {addr.city}
                    </Button>)
                  }
                </Flex>
              </Box>
            </Stack>
          </Box>
        </form>
      </Stack>
      </Center>
      <Center>
        <Dillon />
      </Center>
    </Flex>
  )
}
