import React, { Component } from "react";
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
import axios from 'axios';

const FormItem = Form.Item;
// const { getFieldDecorator } = this.props.form;

class HelloWorld extends Component {
  // state
  state = {
    user_email: "",
  };
  // functions to controll input
  handleChange = (evt)=> {
  const value = evt.target.value;
  this.setState({
    [evt.target.name]: value
  });
}

  handleSubmit = (e) => {
    console.log(this.state);
    axios
      .post("http://localhost:5000/RegisterUser", this.state)
      .then((response) => console.log('sucessfully saved\n' + JSON.stringify(this.state)));
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
          "padding-top":"65px"
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
          <FormItem label="Password" hasFeedback>
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
