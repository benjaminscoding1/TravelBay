import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogScreen from './screens/BlogScreen';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/blog/:category' element={<BlogScreen />}></Route>
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
};

export default App;
