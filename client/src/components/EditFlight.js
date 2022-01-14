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
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  let {_id} = location.state;
  

  const onFinish = (values) => {
    let updated_obj = {
      id: id,
      departure_time: departure_time,
      arrival_time: arrival_time,
      price: price,
      from: from,
      to: to,
    };
    Send_request("EditFlight", {
      ...updated_obj,
      _id:_id,
    });
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



  const [Flight, setFlight] = useState({});
  const [id, setid] = useState('');
  const [departure_time, setdeparture_time] = useState('');
  const [arrival_time, setarrival_time] =useState('');
  const [price, setprice] = useState(0);
  const [from, setfrom] = useState('');
  const [to, setto] = useState('');
  const navigate = useNavigate();
  /// States for all the fields from the initial User
  useEffect(async () => {
    try {
      const data = await Send_request("get-Flight",{flight_id:_id});
      const _Flight = data["Flight"];
      console.log(`initial Flight data ${JSON.stringify(_Flight)}`);
      setid(_Flight["id"]);
      setdeparture_time(_Flight.departure_time);
      setarrival_time(_Flight["arrival_time"]);
      setprice(_Flight["price"]);
      setfrom(_Flight["from"]);
      setto(_Flight["to"]);
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
