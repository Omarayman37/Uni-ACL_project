import React, { useState, Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";


const UsersAdminButton = (props) => {
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
            top: 10,
      }}
          onClick={(e) => {
            navigate("../userAllFlights", { replace: true });//put the correct URL here
          }}
        >Users</Button>
      </div>
    );
  };
  
  export default UsersAdminButton;
