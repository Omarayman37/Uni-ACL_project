import React, { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import SearchPage from "./SearchPage";
const ReturnTrip = (props) => {
    // This is a simple page that just shows a Search page with some predefined params but we need to keep things tidy for router
    
    const location = useLocation(); // this uses Router based states to let us access cour state
  // Similar to componentDidMount so runs first thing
  useEffect(() => {
    console.log('return trip is scheduled with', location.state)

  }, []);

  return (
    <div>
      <SearchPage querry={location.state} />
    </div>
  );
}

export default ReturnTrip;