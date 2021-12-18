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
import MyFlights_button from "./myFlights_button";
import AllFlights_button from "./userAllFlightsButton";




class HomeGuest extends Component {
    render() {
        return(
        <div>

<Col span={12}>
              <Form.Item><MyFlights_button/></Form.Item>
              <Form.Item><AllFlights_button/></Form.Item>
            </Col>
             </div>
             
    
        );
    }
}

export default HomeGuest;