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
import Send_request from "../util/send_request";
const FavFlights = ({  }) => {
  const [flights, setFlights] = useState([]);
  const location = useLocation()
  useEffect(async () => {
      //const user_id = location.state['user_id']
      console.log('retrving fav flights')
      
       let data= await Send_request('myFlights')
       console.dir(data)
       const {error, msg, flights=[]} =data
      setFlights(flights)
      if(error){
        console.error('there is an error retreving the flights') // Here we can handel custom messages from server
      }
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
