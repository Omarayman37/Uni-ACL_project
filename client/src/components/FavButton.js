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
          axios
            .get("http://localhost:5000/addToFavourite/" + flight["_id"])
            .then((res) => {
              console.log(res.data);
              console.log("Flight added to favourite.");
            })
            .catch((error) => {
              console.log(error);
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
