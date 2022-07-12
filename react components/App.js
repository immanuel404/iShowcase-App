import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ScrollToTop from './components/scrolltotop/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import CreateItem from './components/CreateItem';
import ViewItem from './components/ViewItem';
import EditItem from './components/EditItem';


function App() {
  return (
    <Router>
      <div className="App">
      <ScrollToTop>

      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createitem" element={<CreateItem />} />       
          <Route path="/viewitem/:id" element={<ViewItem />} />
          <Route path="/edititem/:id" element={<EditItem />} />     
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<Home />} />
        </Routes>
        
        </ScrollToTop>
      </div>
    </Router>
  );
}

export default App;
