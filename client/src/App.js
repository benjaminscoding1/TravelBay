import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogScreen from './screens/BlogScreen';
import SingleBlogScreen from './screens/SingleBlogScreen';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/blog/:category' element={<BlogScreen />}></Route>
            <Route path='/:id' element={<SingleBlogScreen />}></Route>
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
