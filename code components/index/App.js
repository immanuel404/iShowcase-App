import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from './components/navbar';
import Home from './components/home';
import Createsell from './components/createsell';
import Viewsell from './components/viewsell';
import Editsell from './components/editsell';

import Portfolio from './components/portfolio';


function App() {
  return (

    <BrowserRouter>
      <div className="App">
        <Navbar />
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/createsell" component={Createsell} />
          <Route path="/viewsell/:id" component={Viewsell} />
          <Route path="/editsell/:id" component={Editsell} />

          <Route path="/portfolio" component={Portfolio} />
          <Route component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;