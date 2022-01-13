import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Typography,
  AutoComplete,
} from "antd";
import crypto, { AES, createCipheriv, createHash, randomBytes } from "crypto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Send_request from "../util/send_request";


const { Option } = Select;
const { Paragraph } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const EditFlight = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let updated_obj = {
      id: id,
      departure_time: departure_time,
      arrival_time: arrival_time,
      price: price,
      from: from,
      to: to,
    };
    axios
      .post("http://localhost:5000/EditFlight", {
        ...updated_obj,
        token: window.localStorage.getItem("token"),
      })
      .then((response) =>
        console.log(
          "updated Successfully saved\n" + JSON.stringify(updated_obj)
        )
      );
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="49">+49</Option>
        <Option value="02">+02</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const flight_id = 0 
const flight_departure_time = 2; 
const flight_price = 4; 
const flight_arrival_time = 4; 
const flight_from = 5; 
const flight_to = 6; 
const _id = "abc"

  const [Flight, setFlight] = useState({});
  const [id, setid] = useState(flight_id);
  const [departure_time, setdeparture_time] = useState(flight_departure_time);
  const [arrival_time, setarrival_time] =useState(flight_arrival_time);
  const [price, setprice] = useState(flight_price);
  const [from, setfrom] = useState(flight_from);
  const [to, setto] = useState(flight_to);
  const [_id1, set_id1] = useState();
  const navigate = useNavigate();
  /// States for all the fields from the initial User
  useEffect(async () => {
    try {
      const data = await Send_request("get-Flight");
      const _Flight = data["data"]["Flight"];
      console.log(`initial Flight data ${JSON.stringify(_Flight)}`);
      setid(_Flight["id"]);
      setdeparture_time(_Flight.departure_time);
      setarrival_time(_Flight["arrival_time"]);
      setprice(_Flight["price"]);
      setfrom(_Flight["from"]);
      setto(_Flight["to"]);
      set_id1(_Flight["_id1"]);
    } catch (error) {
      navigate("/LoginUser");
    }
  }, []);
  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish}>
      <Form.Item name="id" label="id">
        <Paragraph editable={{ onChange: setid }}>{id}</Paragraph>
      </Form.Item>

      <Form.Item name="departure_time" label="departure time">
        <Paragraph editable={{ onChange: setdeparture_time }}>
          {departure_time}
        </Paragraph>
      </Form.Item>

      <Form.Item name="arrival_time" label="arrival_time">
        <Paragraph editable={{ onChange: setarrival_time }}>
          {arrival_time}
        </Paragraph>
      </Form.Item>

      <Form.Item name="price" label="price">
        <Paragraph editable={{ onChange: setprice }}>{price}</Paragraph>
      </Form.Item>

      <Form.Item name="from" label="from">
        <Paragraph editable={{ onChange: setfrom }}>{from}</Paragraph>
      </Form.Item>
      <Form.Item name="to" label="to">
        <Paragraph editable={{ onChange: setto }}>{to}</Paragraph>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};




export default EditFlight;
