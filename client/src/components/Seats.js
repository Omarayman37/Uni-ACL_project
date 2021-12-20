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
} from "antd";
import "antd/dist/antd.css";
import {
  DownloadOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Seat from "./Seat";
const Seats = ({ flight_id }) => {
  const [freeSeats, setFreeSeats] = useState([]);
  const [takenSeats, setTakenSeats] = useState([]);
  const [allSeats, setAllSeats] = useState([]);
  const [grid, setGrid] = useState([]);
  useEffect(async () => {
    const seats = axios
      .post("http://localhost:5000/get-Seats", { flight_id: flight_id })
      .then((response) => {
        console.log("gotten seats\n" + JSON.stringify(response));
        return response["data"];
      });
    
    
    // setFreeSeats(free_seats);
    // setTakenSeats(taken_seats);
    // let f = free_seats.map((seat) => [seat, "availaible"]);
    // let t = taken_seats.map((seat) => [seat, "taken"]);
    // let sorted = t.concat(f);

    // sorted.sort((a, b) => {
    //   return a[0] - b[0];
    // });
    // setAllSeats(sorted);

    // const newArr = [];
    // while (sorted.length) newArr.push(sorted.splice(0, 4));
    // console.log(newArr);
    // setGrid(newArr)
  }, []);

  const reserve = (col) => {
    if (col[1] == "availaible") {
      col[1] = "reserved";
      console.log("reserving seat ", col);
    } else if (col[1] == "reserved") {
      col[1] = "availaible";
      console.log("reserving seat ", col);
    }
  };
  return (
    <div>
      {grid.map((row) => {
        return (
          <Row span={8} key={row}>
            {row.map((col) => {
              console.log(`col: ${col}`);
              return (
                <Col span={2}>
                  <Seat
                    onClick={() => {
                      reserve(col);
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

      <Button type="primary" shape="round">
        Checkout
      </Button>
    </div>
  );
};

export default Seats;
