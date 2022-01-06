import React, { Component, useState } from "react";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Send_request from "../util/send_request";
const Flight = ({ flight }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [Fav, setFav] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          let params = { flight: flight, flight_id: flight["_id"] };
          //   navigate("../ReturnTrip", { state: params });
          setFav(!Fav);

          // sent axios Fav request

            const { error, msg } = Send_request("addToFavourite", {
              flight_id: flight["_id"],
            });
        }}
      >
        {Fav && <HeartFilled color="red" />}
        {!Fav && <HeartOutlined />}
      </Button>
    </div>
  );
};

export default Flight;
