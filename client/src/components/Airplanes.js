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
  Space
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import axios from 'axios';

const FormItem = Form.Item;
// const { getFieldDecorator } = this.props.form;

class Airplanes extends Component {
  // state
  state = {
    id: "",
    name: "",
    number_of_seats: "",
    pilots: [],

  };
  // functions to controll input
  
  // geters
  get_id = (event) => {
    this.setState({
      id: event.target.value,
    });
  };
  get_name = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  get_number_of_seats = (event) => {
    this.setState({
      number_of_seats: event.target.value,
    });
  };
  get_range = (event) => {
    this.setState({
      ange: event.target.value,
    });
  };
  get_pilots = (event) => {
    this.setState({
      pilots: this.state.pilots + ',' +  event.target.value ,
    });
  };



  handleSubmit = (e) => {
    console.log(this.state);
    axios
      .post("http://localhost:5000/", this.state)
      .then((response) => this.setState({ articleId: response.data.id }));
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
    const onFinish = values => {
      console.log('Received values of form:', values);
    };
    return (
      <Form
        onSubmit={this.handleSubmit}
        {...formItemLayout}
        /* style={{ width: "600px" }}*/
        style={{ height : "1200px",
          backgroundImage:
            "url(" +
            "https://cdn.jetphotos.com/full/5/60768_1635979380.jpg" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <FormItem type="primary" {...formItemLayout} label="ID" hasFeedback rules={[{ required: true, message: 'Missing ID' }]}>
          <Input onChange={this.get_id} />
        </FormItem>
        <FormItem label="Name"  hasFeedback rules={[{ required: true, message: 'Missing name' }]}>
          <Input onChange={this.get_name} />
        </FormItem>
        <FormItem label="Number of seats" hasFeedback rules={[{ required: true , message:'Missing number of seats'}]}>
          <Input onChange={this.get_number_of_seats} />
        </FormItem>
        <FormItem label="Range" hasFeedback rules={[{ required: true, message: 'Missing ID' }]}>
          <Input onChange={this.get_range} />
        </FormItem>
        <Form name="dynamic_form_nest_item"  onFinish={onFinish} AutoComplete="off">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  fieldKey={[fieldKey, 'name']}
                  rules={[{ required: true, message: 'Missing name' }]}
                >
                  <Input onChange={this.get_pilots} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Pilot
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <FormItem {...tailFormItemLayout}>
          <Button type="primary" onClick={this.handleSubmit}>
            Register
          </Button>
        </FormItem>
    </Form>
      
      </Form>
    );
  }
}

export default Airplanes;
