import React, { useState, Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";


const FlightsAdminButton = (props) => {
    let navigate = useNavigate();
  
    return (
      <div>
        <Button
          type="primary"
          style={{
            width: '60%', 
            height: 30,
            position: 'absolute',
            right: 300,
            top: 100,
      }}
          onClick={(e) => {
            navigate("../AdminEditFlights", { replace: true });//write here the correct isa
          }}
        >Flights</Button>
      </div>
    );
  };
  
  export default FlightsAdminButton;
