import { Box, Stack, Heading, Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NewPostTab from '../components/NewPostTab';
import EditBlogPost from '../components/EditBlogPost';

const AdminScreen = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const location = useLocation();

  return userInfo ? (
    <Box p='20px' minH='100vh'>
      <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
        <Stack pr={{ base: 0, md: 14 }} spacing={{ base: 8, md: 10 }} flex='1.5' mb={{ base: 12, md: 'none' }}>
          <Heading fontSize='2xl' fontWeight='extrabold'>
            Admin Console
          </Heading>
          <Tabs size='md' variant='enclosed'>
            <TabList>
              <Tab>Create a New Blog Post</Tab>
              <Tab>Edit Blog Post</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <NewPostTab />
              </TabPanel>
              <TabPanel>
                <EditBlogPost />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Stack>
    </Box>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default AdminScreen;
