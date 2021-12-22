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
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";
import "../App.css";
import { useState } from 'react';
import QRCode from "react-qr-code";

const { Text, Link } = Typography;

const Ticket = (props)=> {
  const [start_date, setStart_date] = useState(1)
  const [end_date, setEnd_date] = useState(2)
  const [from, setFrom] = useState(3)
  const [to, setTo] = useState(4)
  const [tripduration, setTripduration] = useState(5)
  const [flight_id, setFlight_id] = useState(6)
  const [user_id, setUser_id] = useState(7)
  const [price, setPrice] = useState(8)


 
  return (
    <div className="card-container">
      <Card
        title="TICKET"
      
        style={{ width: 900 }}
      >
        <Form
          name="search from"
          layout="inline"
         

        >
          <Row>
            <Col span={10} align="center">
              <Form.Item name="start_date" label="Start Date">

               {start_date}
              </Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item name="end_date" label="End Date">
              {end_date}
                
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10} align="center">
              <Form.Item label="from">
              {from}
              </Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item label="to">
                
              {to}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={10} align="center">
              <Form.Item label="trip duration">
              {tripduration}
              </Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item label="flight id">
             {flight_id}
              </Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item label="user id">
                {user_id}
              </Form.Item>
            </Col>
            <Col span={10} align="center">
              <Form.Item label="price">
                {price}
              </Form.Item>
            </Col>
          </Row>
          
          <Button type="primary">Cancel</Button>
        
          {/* <img src="http://eslkidsgames.com/Flash/QR%20Code%20Maker/eslkidsgames.com.png"  alt="" title="Ticket" /> */}

          <QRCode value="https://thumbs.dreamstime.com/z/realistic-airline-ticket-boarding-pass-design-blue-unreal-flight-time-passenger-name-vector-illustration-pattern-136281503.jpg" />
        </Form>
      </Card>
     
     
    </div>
  )


 
  }

 
   
export default Ticket;
