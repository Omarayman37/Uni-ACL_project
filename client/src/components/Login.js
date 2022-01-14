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
        <FormItem type="primary" {...formItemLayout} label="Username" hasFeedback>
          <Input name="user_email" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Password" hasFeedback>
          <Input.Password name="user_password" onChange={this.handleChange} />
        </FormItem>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
}



