import React, { Component, useState } from "react";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
  HeartOutlined,
  HeartFilled
} from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Flight = ({ flight }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Fav, setFav] = useState(false)
  return (
    <div>
      <h1>{JSON.stringify(flight)}</h1>

    </div>
  );
};

export default Flight;
