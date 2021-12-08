import React, { Component } from "react";
import { Link } from "react-router-dom";
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
  Card,
  Radio,
  DatePicker,
  Slider,
} from "antd";
import "antd/dist/antd.css";

class SearchPage extends Component {
  state = {};
  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };
  handleChangeDepartureDate = (evt) => {
    const obj = {
      target: {
        name: "departure_time",
        value: evt._d,
      },
    };
    this.handleChange(obj);
  };
  handleChangePrice = (evt) => {
    const obj = {
      target: {
        name: "price",
        value: evt*10,
      },
    };
    this.handleChange(obj);
  };
  handleChangeArrivalDate = (evt) => {
    const obj = {
      target: {
        name: "arrival_time",
        value: evt._d,
      },
    };
    this.handleChange(obj);
  };

  handleSubmit = (e) => {
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <Form name="search from" layout="inline" onSubmit={this.handleSubmit}>
          <Row>
            <Col span={8}>
              <Form.Item name="departure_time" label="Departure Time">
                <DatePicker
                  onChange={this.handleChangeDepartureDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="arrival_time" label="Arrival Time">
                <DatePicker
                  name="arrival_time"
                  onChange={this.handleChangeArrivalDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="from">
                <Input name="from" onChange={this.handleChange} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="to">
                <Input name="to" onChange={this.handleChange} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item label="trip duration">
                <Input name="duration" onChange={this.handleChange} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="flight number">
                <Input name="id" onChange={this.handleChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="slider" label="Slider">
                <Slider
                  onChange={this.handleChangePrice}
                  marks={{
                    0: "100",
                    20: "200",
                    40: "400",
                    60: "600",
                    80: "800",
                    100: "1000",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default SearchPage;
