import React, { Component } from "react";
import {Link } from "react-router-dom";
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
import crypto, {AES, createCipheriv, createHash, randomBytes} from "crypto";
import {Context} from './Contexts';
import send_request from '../util/send_request'
const FormItem = Form.Item;
// const { getFieldDecorator } = this.props.form;
// const {setLoggedInUser} = useContext(Context)
class LoginPage extends Component {
  static contextType = Context;

  // state
  state = {
    user_email: "",
    show_error: false,
    error: "",
    user_password: "",
  };
  // functions to controll input
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value.trim(),
    });
  };

  handleSubmit = async (e) => {
    // Here we encrypt using a super scret key and and initialization vector
    let login_request_object = this.state;
    login_request_object["user_password_"] = createHash("sha256")
      .update(login_request_object["user_password"])
      .digest("hex");
    console.log(login_request_object);
    const url = "http://localhost:5000/LoginUser";

    let data = await  send_request('LoginUser', login_request_object)
    const {token, error, msg} = data
    if(error){
      this.setState({show_error:true, error:msg})
    }else{
      localStorage.setItem('token', token)
      this.context.setUserLoggedIn(true);
      console.log(this.context);
    }
    
  };

  render() {
    const { history } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form
        onSubmit={this.handleSubmit}
        {...formItemLayout}
        /* style={{ width: "600px" }}*/
        style={{
          height: "1200px",

          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <FormItem type="primary" {...formItemLayout} label="E-mail" hasFeedback>
          <Input name="user_email" onChange={this.handleChange} />
        </FormItem>
        <FormItem label="Password" hasFeedback>
          <Input.Password name="user_password" onChange={this.handleChange} />
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>
            Login
          </Button>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Link type="primary" to="/RegisterUser" onClick={this.handleSubmit}>
            Register
          </Link>
        </FormItem>
        {this.state.show_error && (
          <FormItem {...tailFormItemLayout}>
            <Alert
              message={this.state.error}
              description="Your Username or Password is wrong"
              type="error"
              showIcon
              display
            />
          </FormItem>
        )}
      </Form>
    );
  }
}

export default LoginPage;
