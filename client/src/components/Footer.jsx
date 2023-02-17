import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
  Box,
  Flex,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/userActions';

const Footer = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'You have been logged out.', status: 'success', isClosable: true });
  };

  return (
    <Box w='100%' bg={mode('blue.200', 'blue.900')}>
      <Container as='footer' role='contentinfo' maxW='7xl'>
        <Stack
          spacing='8'
          direction={{ base: 'column', md: 'row' }}
          justify='space-between'
          py={{ base: '12', md: '16' }}>
          <Stack spacing={{ base: '6', md: '8' }} align='start'>
            <Flex alignItems='center'>
              <Icon as={GiWorld} h='10' w='10' />
              <Text fontSize='2xl' fontWeight='extrabold'>
                TravelBay
              </Text>
            </Flex>
          </Stack>
          <Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
            <Stack direction='row' spacing='8'>
              <Stack spacing='4' minW='36' flex='1'>
                <Text fontSize='sm' fontWeight='semibold'>
                  Legal
                </Text>
                <Stack spacing='3' shouldWrapChildren>
                  <Button variant='link'>Privacy</Button>
                  <Button variant='link'>Terms</Button>
                  <Button variant='link'>License</Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack spacing='4'>
              <Text fontSize='sm' fontWeight='semibold' color='subtle'>
                Stay up to date
              </Text>
              <Stack spacing='4' direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
                <Input placeholder='Enter your email' type='email' required />
                <Button variant='primary' type='submit' flexShrink={0}>
                  Suscribe
                </Button>
              </Stack>
              {userInfo ? (
                <Button variant='link' onClick={logoutHandler} alignSelf='flex-start'>
                  Logout
                </Button>
              ) : (
                <Button variant='link' as={ReactLink} to='/login' alignSelf='flex-start'>
                  Admin
                </Button>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack pt='8' pb='12' justify='space-between' direction={{ base: 'column-reverse', md: 'row' }} align='center'>
          <Text fontSize='sm' color='subtle'>
            &copy; {new Date().getFullYear()} Travel Bay, Inc. All rights reserved.
          </Text>

          <ButtonGroup variant='ghost'>
            <IconButton as='a' href='#' icon={<FaFacebook />} />
            <IconButton as='a' href='#' icon={<FaInstagram />} />
            <IconButton as='a' href='#' icon={<FaTwitter />} />
            <IconButton as='a' href='#' icon={<FaYoutube />} />
          </ButtonGroup>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
