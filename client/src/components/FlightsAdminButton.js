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
          onClick={(e) => {
            navigate("../userAllFlights", { replace: true });
          }}
        >Flights</Button>
      </div>
    );
  };
  
  export default FlightsAdminButton;
