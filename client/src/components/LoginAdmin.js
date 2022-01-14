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
import { useHistory } from 'react-router-dom';
const FormItem = Form.Item;
// const { getFieldDecorator } = this.props.form;
class LoginAdmin extends Component {
  // state
  state = {
    user_email: "",
    show_error: false,
    error: "",
    user_password:""
  };
  // functions to controll input
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value.trim(),
    });
  };
  
 

  handleSubmit = (e) => {
    

    // Here we encrypt using a super scret key and and initialization vector 
    let login_request_object = this.state
    login_request_object["user_password_"] = createHash("sha256")
      .update(login_request_object["user_password"])
      .digest("hex");
    console.log(login_request_object);

    axios
      .post("http://localhost:5000/LoginUser", login_request_object)
      .then((res) => {
        const { success, err } = res.data;
        if (success) {

          console.log(
            "successfull login with credentials : " + JSON.stringify(this.state)
          );
          window.location.href = "http://localhost:3000/"; // TODO: FIX THIS TRASH LATER
        } else {
          console.log("invalud credentails :" + JSON.stringify(this.state));
          // here we tell the UI to display an error we keda

          this.setState({
            show_error: true,
            error: err,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
      
        <FormItem label="Password" hasFeedback>
        <Input.Password name="user_password" onChange={this.handleChange} />
        </FormItem>

      
        
        {this.state.show_error && (
          <FormItem {...tailFormItemLayout}>
            <Alert
              message={this.state.error}
              description="Your Password is wrong"
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

export default LoginAdmin;
