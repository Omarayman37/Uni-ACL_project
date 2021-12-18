import React, { useState, Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";


const MyFlights_button = (props) => {
    let navigate = useNavigate();
  
    return (
      <div>
        <Button
          type="primary"
          onClick={(e) => {
            navigate("../myFlights", { replace: true });
          }}
        >My Flights</Button>
        
      </div>
    );
  };
  
  export default MyFlights_button;
