import React, { useState, Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";


const LoginAdminButton = (props) => {
    let navigate = useNavigate();
  
    return (
      <div>
        <Button
          type="primary"
          onClick={(e) => {
              
            navigate("../AdminPage", { replace: true });
          }}
        >Login</Button>
      </div>
    );
  };
  
  export default LoginAdminButton;
