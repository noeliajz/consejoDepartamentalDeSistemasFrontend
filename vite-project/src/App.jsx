import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesView from "./Routes/RoutesView";

const App = () => {
  return (
    <>
      <Router>
      <RoutesView />    
      </Router>
    </>
  );
};

export default App;
