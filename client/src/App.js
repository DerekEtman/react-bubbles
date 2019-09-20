import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import BubblePage from './components/BubblePage'
import PrivateRoute from './components/PrivateRoute';
import Login from "./components/Login";
import "./styles.scss";

function App() {
  const [colorList, setColorList] = useState([]);


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute  component={BubblePage} />

          {/* <Route component={Login} /> */}

          {/* 
            Build a PrivateRoute component that will 
            display BubblePage when you're authenticated 
          */}

        </Switch> 

      </div>
    </Router>
  );
}

export default App;
