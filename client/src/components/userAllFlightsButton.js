import React, { useState, Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
// maher is here

const AllFlights_button = (props) => {
    let navigate = useNavigate();
  
    return (
      <div>
        <Button
          type="primary"
          onClick={(e) => {
            navigate("../userAllFlights", { replace: true });
          }}
        >All Flights</Button>
      </div>
    );
  };
  
  export default AllFlights_button;
