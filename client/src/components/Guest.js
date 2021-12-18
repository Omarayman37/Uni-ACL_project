import React, { Component } from "react";
import crypto, { AES, createCipheriv, createHash, randomBytes } from "crypto";
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
  
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
const { Option } = Select;

const FormItem = Form.Item;
// const { getFieldDecorator } = this.props.form;

class HelloWorld extends Component {
  // state
  state = {
    user_email: "",
  };
  // functions to controll input
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };

  handleSubmit = (e) => {
    console.log(this.state);
    let login_request_object = this.state;
    login_request_object["user_password"] = createHash("sha256") // hash the passowrd to send it via internet
      .update(login_request_object["user_password"])
      .digest("hex");

    delete login_request_object["user_confirm_password"]; // remove the confirm password field
    axios
      .post("http://localhost:5000/RegisterUser", this.state)
      .then((response) =>
        console.log("sucessfully saved\n" + JSON.stringify(this.state))
      );
  };

  render() {
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
    const prefixSelector = (
      <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
          <Option value="+49">+49</Option>
          <Option value="+20">+20</Option>
        </Select>
      </Form.Item>
    );

    return (
      <div
        style={{
          height: "1000px",
          backgroundImage:
            "url(" +
            "https://cdn.jetphotos.com/full/5/60768_1635979380.jpg" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          paddingTop: "65px",
        }}
      >
        <Form
          onSubmit={this.handleSubmit}
          {...formItemLayout}
          /* style={{ width: "600px" }}*/
        >
          <FormItem
            type="primary"
            {...formItemLayout}
            label="E-mail"
            hasFeedback
          >
            <Input name="user_email" onChange={this.handleChange} />
          </FormItem>
          <FormItem label="Password" hasFeedback >
            <Input.Password name="user_password" onChange={this.handleChange} />
          </FormItem>
          <FormItem label="Confirm Password" hasFeedback>
            <Input.Password
              name="user_confirm_password"
              onChange={this.handleChange}
            />
          </FormItem>
          <FormItem
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want other to call you?">
                  {/* <Icon type="question-circle-o" /> */}
                </Tooltip>
              </span>
            }
            hasFeedback
          >
            <Input name="user_nickname" onChange={this.handleChange} />
          </FormItem>
          <FormItem
            type="primary"
            {...formItemLayout}
            label="First Name"
            hasFeedback
          >
            <Input name="user_first_name" onChange={this.handleChange} />
          </FormItem>
          <FormItem
            type="primary"
            {...formItemLayout}
            label="Last Name"
            hasFeedback
          >
            <Input name="user_last_name" onChange={this.handleChange} />
          </FormItem>
          <FormItem
            type="primary"
            {...formItemLayout}
            label="Home Address"
            hasFeedback
          >
            <Input name="user_home_address" onChange={this.handleChange} />
          </FormItem>
          <FormItem
            type="primary"
            {...formItemLayout}
            label="contry code"
            hasFeedback
          >
            <Input name="user_contry_code" onChange={this.handleChange} />
          </FormItem>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              name="user_telephone_number"
              onChange={this.handleChange}
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="phone2"
            label="Phone Number"
            rules={[{ required: false, message: "optional telephone number!" }]}
          >
            <Input
              name="user_telephone_number_2"
              onChange={this.handleChange}
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <FormItem
            type="primary"
            {...formItemLayout}
            label="Passport Number"
            hasFeedback
          >
            <Input name="user_passport_number" onChange={this.handleChange} />
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" onClick={this.handleSubmit}>
              Register
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default HelloWorld;
