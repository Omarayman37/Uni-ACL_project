import React, { useState, Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";

import { useNavigate } from "react-router-dom";

const NavigateButton = (props) => {
  let navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        onClick={(e) => {
          navigate("../LoginUser", { replace: true });
        }}
      >navigate</Button>
    </div>
  );
};

export default NavigateButton;
