import React, { Component } from "react";
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
  Card,
  Radio,
  DatePicker,
  Slider,
  Divider,
  Typography,
  Space,
  PageHeader,
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";
import "../App.css";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const { Text, Link } = Typography;

const Ticket = ({  }) => {
  const [start_date, setStart_date] = useState(0);
  const [end_date, setEnd_date] = useState(2);
  const [from, setFrom] = useState(3);
  const [to, setTo] = useState(4);
  const [tripduration, setTripduration] = useState(5);
  const [flight_id, setFlight_id] = useState(6);
  const [user_email, setUser_email] = useState("");
  const [price, setPrice] = useState(8);
  const [seat_nr, setSeat_nr] = useState("E0");
  const [ticket, setTicket] = useState({})
  const [flight, setFlight] = useState({})
  const location = useLocation();
  useEffect(async () => {
    let ticket = location.state.ticket;
    /**ticket {"ticket":{"_id":"61c25920b8e359b01280b828","IDUser":"61c1e11fe14ea80392b8ade5","IDFlight":"61c0a4a95d2eb7a50cd7c87c","from":"testing","to":"Testing 2 again","arrival_time":"2022-01-01T15:40:34.059Z","departure_time":"2022-01-01T15:40:29.650Z","__v":0}} */
    const data = await axios.post("http://localhost:5000/get-flight", {
      flight_id: ticket.IDFlight,
    });
    let flight = data["data"]["flight"];
    const user_data = await axios.post("http://localhost:5000/get-user");
    let user = user_data["data"]["user"];
    console.log(
      `ticket ${JSON.stringify(location.state)}, flight:${JSON.stringify(
        flight
      )}\nuser:${JSON.stringify(user)}`
    );
    setStart_date(`${new Date(flight["departure_time"])}`);
    setEnd_date(`${new Date(flight["arrival_time"])}`);
    setFrom(flight["from"]);
    setTo(flight["to"]);
    setTripduration(flight["duration"]);
    setFlight_id(flight["id"]);
    setUser_email(user["email"]);
    setPrice(ticket["price"]);
    setSeat_nr(ticket["seat_number"]);

    setFlight(flight)
    setTicket(ticket)
  }, []);
  return (
    <div className="card-container">
      <Card title="TICKET" style={{ width: 900 }}>
        <Form name="search from" layout="inline">
          <Row>
            <Col span={10} align="center">
              <Form.Item name="start_date" label="Departure Time">
                {start_date}
              </Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item name="end_date" label="Arrival Time">
                {end_date}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10} align="center">
              <Form.Item label="from">{from}</Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item label="to">{to}</Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={10} align="center">
              <Form.Item label="trip duration">{tripduration}</Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item label="flight id">{flight_id}</Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item label="email">{user_email}</Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item label="price">{price}</Form.Item>
            </Col>
          </Row>

          <Button type="primary" onClick={async ()=>{
            await axios.post("http://localhost:5000/CancelTicket", {
              ticket_id: ticket["_id"],
              seat_nr: seat_nr,
              flight_id:flight['_id']
            });
            console.log(`canceled ${ticket} seat number : ${seat_nr} from flight: ${flight}`)
          }}>Cancel</Button>

          {/* <img src="http://eslkidsgames.com/Flash/QR%20Code%20Maker/eslkidsgames.com.png"  alt="" title="Ticket" /> */}
          <Row>
            <Col span={8}>
              <QRCode value="https://thumbs.dreamstime.com/z/realistic-airline-ticket-boarding-pass-design-blue-unreal-flight-time-passenger-name-vector-illustration-pattern-136281503.jpg" />
            </Col>
            <Col span={8}>
              <PageHeader title={`Seat Number: ${seat_nr}`}></PageHeader>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Ticket;
