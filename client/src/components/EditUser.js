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

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
      let updated_obj = {
          first_name:first_name,
          email:email,
          password:password,
          home_address:home_address,
          last_name:last_name,
          contry_code:contry_code,
          telephone_number:telephone_number,
          passport:passport
      }
  
    
    axios
      .post("http://localhost:5000/EditUser", updated_obj)
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


  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ["A52", "L01"].map((domain) => `${domain}${value}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));



const [user, setUser] = useState({})
const [first_name, setFirst_name] = useState("")
const [last_name, setLast_name] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [telephone_number, settelephone_number] = useState("")
const [contry_code, setContry_code] = useState("")
const [home_address, setHome_address] = useState("")
const [passport, setPassport] = useState("")
const navigate = useNavigate()
  /// States for all the fields from the initial User
  useEffect( async() => {
      try {
          const data = await axios.post("http://localhost:5000/get-user");
          const _user = data["data"]["user"];
          console.log(`initial user data ${JSON.stringify(_user)}`);
          setFirst_name(_user["first_name"]);
          setLast_name(_user.last_name);
          setEmail(_user["email"]);
          setPassword(_user["password"]);
          settelephone_number(_user["telephone_number"]);
          setHome_address(_user["home_address"]);
      } catch (error) {
          navigate('/LoginUser')
      }
     
  }, [])
  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish}>
      <Form.Item name="email" label="E-mail">
        <Paragraph editable={{ onChange: setEmail }}>{email}</Paragraph>
      </Form.Item>

      <Form.Item name="password" label="Password">
        <Paragraph editable={{ onChange: setPassword }}>{password}</Paragraph>
      </Form.Item>

      <Form.Item name="first_name" label="First Name">
        <Paragraph editable={{ onChange: setFirst_name }}>
          {first_name}
        </Paragraph>
      </Form.Item>

      <Form.Item name="last_name" label="Last Name">
        <Paragraph editable={{ onChange: setLast_name }}>{last_name}</Paragraph>
      </Form.Item>

      <Form.Item name="telephone_number" label="Phone Number">
        <Paragraph editable={{ onChange: settelephone_number }}>
          {telephone_number}
        </Paragraph>
      </Form.Item>

      <Form.Item name="home_address" label="Address">
        <Paragraph editable={{ onChange: setHome_address }}>
          {home_address}
        </Paragraph>
      </Form.Item>

      <Form.Item name="contry_code" label="Country Code">
        <Paragraph editable={{ onChange: setContry_code }}>
          {contry_code}
        </Paragraph>
      </Form.Item>
      <Form.Item name="passport" label="Passprot Number">
        <Paragraph editable={{ onChange: setPassport }}>
          {passport}
        </Paragraph>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
