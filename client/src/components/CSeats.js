import React, { Component, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Alert,
  Tabs,
} from "antd";
import "antd/dist/antd.css";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Seat from "./Seat";
import "../App.css";
import Send_request from "../util/send_request";
const Seats = ({}) => {
  const [seats, setSeats] = useState({});
  const [error_msg, setError_msg] = useState("");
  const [SeatClass, setSeatClass] = useState("EconomySeats");
  const [price, setprice] = useState(0);
  const location = useLocation();
  const [flight_id, setFlight_id] = useState("");
  const [flight, setFlight] = useState({});
  const navigate = useNavigate();
  useEffect(async () => {
    console.log("show seats");
    let flight = location.state.flight;
    setFlight(flight);
    let flight_id = flight._id;
    setFlight_id(flight_id);
    const _data = await Send_request("get-Seats", {
      flight_id: flight_id,
    });
    console.log(_data);

    console.log(`retrived seats ${_data["seat"]}`);
    setSeats(_data["seat"]);
    const ticket = { price: 123 };
    setprice(ticket.price);
  }, []);

  const create_grid = (new_seat_class) => {
    let obj = seats[new_seat_class];
    console.log(`seats = ${JSON.stringify(seats)}`);
    if (obj == undefined) {
      return null;
    }
    let arr = Object.keys(obj).map((key) => [key, obj[key]]);
    console.log(arr);
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 4));
    console.log(newArr);

    return newArr.map((row) => {
      //console.log(`row: ${row}`);
      return (
        <Row span={8} key={row[0]}>
          {row.map((col) => {
            //console.log(`col: ${col}`);
            return (
              <Col span={2}>
                <Seat
                  onClick={() => {
                    reserve(col, row);
                  }}
                  state={col[1]}
                ></Seat>
                <h1>{col[0]}</h1>
              </Col>
            );
          })}
        </Row>
      );
    });
  };
  const reserve = (col, row) => {
    let new_seats = { ...seats }; // must use this way to trigger a rerender otherwise react would hold to old values of array
    if (col[1] == "free") {
      new_seats[SeatClass][col[0]] = "reserved";
      console.log("reserving seat ", col);
    } else if (col[1] == "reserved") {
      col[1] = "free";
      new_seats[SeatClass][col[0]] = "free";
      console.log("free seat ", col);
    }
    console.log("new seats:", new_seats);
    setSeats(new_seats);
  };
  return (
    <div className="card-container">
      <Tabs
        type="card"
        defaultActiveKey="EconomySeats"
        onChange={async (key) => {
          console.log(key);
        }}
        onTabClick={(key, event) => {
          console.log(`changed tab ${key}`);
          setSeatClass(key);
        }}
      >
        <Tabs.TabPane
          tab={
            <span>
              <DingdingOutlined />
              Economy
            </span>
          }
          key="EconomySeats"
        >
          {create_grid(SeatClass)}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <ShoppingOutlined />
              Business
            </span>
          }
          key="BusinessSeats"
        >
          {create_grid(SeatClass)}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <SketchOutlined />
              First Class
            </span>
          }
          key="FirstClassSeats"
        >
          {create_grid(SeatClass)}
        </Tabs.TabPane>
      </Tabs>

      <Button
        type="primary"
        shape="round"
        onClick={ async () => {
          console.log(seats);
          let reserved_seats_eco = [];
          for (const [key, value] of Object.entries(seats["EconomySeats"])) {
            if (value == "reserved") reserved_seats_eco.push(key);
          }
          // reserve eco seats
          await   Send_request("ReserveSeats", {
              reserved_seats: reserved_seats_eco,
              flight_id: flight_id,
              seat_class: "EconomySeats", // EconomySeats, BusinessSeats, FirstClassSeats
            });
          let reserved_seats_business = [];

          for (const [key, value] of Object.entries(seats["BusinessSeats"])) {
            if (value == "reserved") reserved_seats_business.push(key);
            // send post requst to finish this
          }

           await  Send_request("ReserveSeats", {
              reserved_seats: reserved_seats_business,
              flight_id: flight_id,
              seat_class: "BusinessSeats", // EconomySeats, BusinessSeats, FirstClassSeats
            });
          let reserved_seats_first = [];

          for (const [key, value] of Object.entries(seats["FirstClassSeats"])) {
            if (value == "reserved") reserved_seats_first.push(key);
            // send post requst to finish this
          }
          // reserve first class

          await Send_request("ReserveSeats", {
            reserved_seats: reserved_seats_first,
            flight_id: flight_id,
            seat_class: "FirstClassSeats", // EconomySeats, BusinessSeats, FirstClassSeats
          });

         

          await Send_request("DecreaseSeats", {
            flight_id: flight_id,
            number_of_seats:
              reserved_seats_business.length +
              reserved_seats_eco.length +
              reserved_seats_first.length,
          });

          let params = {
            flight_id: flight_id,
            flight: flight,
            reserved_seats_business: reserved_seats_business,
            reserved_seats_eco: reserved_seats_eco,
            reserved_seats_first: reserved_seats_first,
          };
          navigate("../Pay", { state: params });
        }}

        // Nav to the server at the end
      >
        Checkout
      </Button>
      {error_msg && (
        <Alert
          message={error_msg}
          description="Your reservation was unsuccessful"
          type="error"
          showIcon
          display
        />
      )}
    </div>
  );
};

export default Seats;
