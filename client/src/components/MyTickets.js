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

const MyTickets = () => {
 
  const [tickets, setTickets] = useState([])
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // get  tickets 
        
  }, []);
  return (
    <div>
      
    </div>
  );
};

export default MyTickets;
