import React, { Component } from "react";
import { Link } from "react-router-dom";
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
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import FlightsAdminButton from "./FlightsAdminButton";
import UsersAdminButton from "./UsersAdminButton";




class HomeGuest extends Component {
    render() {
        return(
        <div>

<Col span={12}>
              <Form.Item><FlightsAdminButton/></Form.Item>
              <Form.Item><UsersAdminButton/></Form.Item>
            </Col>
             </div>
             
    
        );
    }
}

export default HomeGuest;