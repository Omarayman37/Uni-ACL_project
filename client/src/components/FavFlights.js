import React, { Component, useState, useEffect } from "react";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Flight from "./Flight";
import ResButton from './ResButton'
const FavFlights = ({  }) => {
  const [flights, setFlights] = useState([]);
  const location = useLocation()
  useEffect(() => {
      //const user_id = location.state['user_id']
      console.log('retrving fav flights')
    axios
      .get("http://localhost:5000/myFlights")
      .then((res) => {
        setFlights(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    
    
  }, []);
  return (
    <div>
      {flights.map((flight, index) => {
        return (
          <Card key={index}>
            <Flight flight={flight} />
            <ResButton flight={flight} />
          </Card>
        );
      })}
    </div>
  );
};

export default FavFlights;
