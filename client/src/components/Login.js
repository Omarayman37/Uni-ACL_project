import React, { Component, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import crypto, { AES, createCipheriv, createHash, randomBytes } from "crypto";
import { Context } from "./Contexts";
import send_request from "../util/send_request";
export default function Login2() {
    const navigate = useNavigate()
    const context = useContext(Context);
     const onFinish = async (values) => {
       console.log("Success:", values);
       const {token} = await send_request('LoginUser', values)
       localStorage.setItem('token', token)
       console.log(`token is now = to ${token} and on local storage = ${localStorage.getItem('token')}`)
       //context.setUserLoggedIn(true);
       navigate('../')
     };

     const onFinishFailed = (errorInfo) => {
       console.log("Failed:", errorInfo);
     };

    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
}



