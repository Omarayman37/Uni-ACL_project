import React, { Component, useState, useEffect } from "react";
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
const Seats = ({ flight_id }) => {
  const [SeatClass, setSeatClass] = useState("EconomySeats");
  const [error_msg, setError_msg] = useState("");
  const [grid, setGrid] = useState([]);
  const [data, setData] = useState({})
  useEffect(async () => {
    const _data = await axios.post("http://localhost:5000/get-Seats", {
      flight_id: flight_id,
    });

    setData(_data)
    let seats = _data["data"]["seat"];
    let obj = seats[SeatClass];
    let arr = Object.keys(obj).map((key) => [key, obj[key]]);
    console.log(arr);
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 4));
    console.log(newArr);
    setGrid(newArr);
  }, []);
  const show_seats = async (new_seat_class) => {
    let seats = data["data"]["seat"];
    console.log(seats)
    let obj = seats[new_seat_class];
    let arr = Object.keys(obj).map((key) => [key, obj[key]]);
    console.log(arr);
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 4));
    console.log(newArr);
    setGrid(newArr);
  };

  const create_grid = async (new_seat_class) => {
    let seats = data["data"]["seat"];
    console.log(seats);
    let obj = seats[new_seat_class];
    let arr = Object.keys(obj).map((key) => [key, obj[key]]);
    console.log(arr);
    const newArr = [];
    while (arr.length) newArr.push(arr.splice(0, 4));
    return newArr;
  };

  const reserve = (col, row) => {
      let copy = grid
    if (col[1] == "free") {
      col[1] = "reserved";
       data["data"]["seat"][SeatClass][col[0]] = 'reserved'
       copy[row][col][1] = 'reserved'
      console.log("reserving seat ", col);
    } else if (col[1] == "reserved") {
      col[1] = "free";
        data["data"]["seat"][SeatClass][col[0]] = "free";
        copy[row][col][1] = "free";
      console.log("reserving seat ", col);
    }
    setGrid(copy)
    setData(data)
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="EconomySeats"
        onChange={async (key) => {
          console.log(key);
          setSeatClass(key);
          show_seats(key);
        }}
        onTabClick={(key, event) => {
          console.log(`changed tab ${key}`);
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
          Tab 1
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
          Tab 2
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
          Tab 2
        </Tabs.TabPane>
      </Tabs>

      {create_grid(SeatClass).map((row) => {
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
      })}

      <Button
        type="primary"
        shape="round"
        onClick={() => {
          console.log(grid);
          let reserved_seats = [];
          for (const row of grid) {
            for (const col of row) {
              if (col[1] == "reserved") {
                reserved_seats.push(col[0]);
              }
            }
          }
          console.log("reserving seats ", reserved_seats);

          // send post requst to finish this
          axios
            .post("http://localhost:5000/ReserveSeats", {
              reserved_seats: reserved_seats,
              flight_id: flight_id,
              seat_class: "EconomySeats", // EconomySeats, BusinessSeats, FirstClassSeats
            })
            .then((res) =>
              console.log(
                `saved successfullly seats ${reserved_seats} in flight ${flight_id}`
              )
            )
            .catch((err) => setError_msg(err.message));
        }}
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
