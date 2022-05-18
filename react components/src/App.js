import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Createsell from './components/Createsell';
import Viewsell1 from './components/Viewsell1';
import Viewsell2 from './components/Viewsell2';
import Viewsell3 from './components/Viewsell3';
import Viewsell4 from './components/Viewsell4';
import Viewsell5 from './components/Viewsell5';
import Viewsell6 from './components/Viewsell6';


function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createsell" element={<Createsell />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/viewsell1" element={<Viewsell1 />} />
          <Route path="/viewsell2" element={<Viewsell2 />} />
          <Route path="/viewsell3" element={<Viewsell3 />} />
          <Route path="/viewsell4" element={<Viewsell4 />} />
          <Route path="/viewsell5" element={<Viewsell5 />} />
          <Route path="/viewsell6" element={<Viewsell6 />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
