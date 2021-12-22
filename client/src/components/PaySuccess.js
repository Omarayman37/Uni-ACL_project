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
  Divider,
  Tag,
  Typography,
  Popconfirm,
  Result,
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
import Flight from "./Flight";
const { Title } = Typography;

const PayPage = () => {
  const [flight, setFlight] = useState({});
  const [eco, setEco] = useState([]);
  const [business, setBusiness] = useState([]);
  const [first, setfirst] = useState([]);
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

useEffect(() => {}, []);
return (
  <div>
    <Result
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button onClick={()=>{navigate('../SearchPage')}} type="primary" key="console">
          Book More Flights
        </Button>,
        <Button key="buy" onClick={()=>{navigate('../MyTickets')}}>Back to Tickets</Button>,
      ]}
    />
  </div>
);
}
    

export default PayPage;
