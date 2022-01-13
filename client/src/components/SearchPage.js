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
  Card,
  Radio,
  DatePicker,
  Slider,
  Divider,
  Typography,
  Space,
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import NavigateButton from "./navigate_buton";
import moment from "moment";
import { DownloadOutlined, PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import "../App.css";
import Flight from './Flight'
import FavButton from './FavButton'
import FlightCard from "./FlightCrad";
const { Text, Link } = Typography;

class SearchPage extends Component {
  state = {
    flights: [],
    number_of_seats: 0,
  };
  async componentWillMount(props) {
    if (this.props.querry) {
      console.log(
        "Search page was given an initial querry of ",
        this.props.querry
      );

      const inital_state = Object.assign(this.state, this.props.querry);

      inital_state["start_date"] = new Date("2021-12-02"); // ! TODO: remove this and put the pnae arrival time here
      await this.setState(inital_state);
      console.log("date format", inital_state["end_date"]);
      console.log("moment object", moment(this.state["end_date"]));
      console.log("this state end date", this.state["end_date"]);
      this.handleChange({
        target: {
          value: inital_state["end_date"],
          name: "end_date",
        },
      }); // Eftekasa to force the Search on the backend we keda
    }

    //
  }

  // handel changes
  handleChange = async (evt) => {
    const value = evt.target.value;
    console.log(typeof evt.target.value);
    this.setState({
      [evt.target.name]: typeof value === "string" ? value.trim() : value,
    }); // here SetState is async non bloking and making it bloking is bad so we change a opy of the state better
    const new_state_after_async_setState = this.state;
    new_state_after_async_setState[evt.target.name] = value;
    const { ["flights"]: deletedKey, ...querry } =
      new_state_after_async_setState; // as we do not want to send the flights from state but send eveything else
    const response = await axios.post("http://localhost:5000/get-flights", {
      querry: querry,
    });

    const flights = response["data"]["data"];
    console.log("recived updated flights: ", flights);
    this.setState({ flights: flights });
  };
  handleChangeStartDate = (evt) => {
    if (evt == null) return;
    const obj = {
      target: {
        name: "start_date",
        value: evt._d,
      },
    };
    this.handleChange(obj);
  };
  handleChangePrice = (evt) => {
    const obj = {
      target: {
        name: "price",
        value: evt * 10,
      },
    };
    this.handleChange(obj);
  };
  handleChangeEndDate = (evt) => {
    if (evt == null) return;
    const obj = {
      target: {
        name: "end_date",
        value: evt._d,
      },
    };
    this.handleChange(obj);
  };

  handleSubmit = (e) => {
    console.log(this.state);
    axios
      .post("http://localhost:5000/RegisterFlight", this.state)
      .then((response) =>
        console.log("sucessfully saved\n" + JSON.stringify(this.state))
      );
  };

  reroute = (e) => {
    console.log("rerouting");
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <div className="card-container">
        <Card
          title="Search Flights"
          extra={<a href="#">More</a>}
          style={{ width: 900 }}
        >
          <Form
            name="search from"
            layout="inline"
            onSubmit={this.handleSubmit}
            initialValues={{
              end_date:
                this.state["end_date"] != undefined
                  ? moment(this.state["end_date"])
                  : null,
              start_date:
                this.state["start_date"] != undefined
                  ? moment(this.state["start_date"])
                  : null,
            }}
          >
            <Row>
              <Col span={10} align="center">
                <Form.Item name="start_date" label="Start Date">
                  <DatePicker
                    onChange={this.handleChangeStartDate}
                    showTime
                    format="YYYY-MM-DD"
                    //defaultValue={this.state["start_date"]}
                  />
                </Form.Item>
              </Col>
              <Col span={10} align="center">
                <Form.Item name="end_date" label="End Date">
                  <DatePicker
                    onChange={this.handleChangeEndDate}
                    showTime
                    // value={moment(this.state["end_date"])}
                    format={"YYYY-MM-DD"}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10} align="center">
                <Form.Item label="from">
                  <Input
                    value={this.state["from"]}
                    name="from"
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={10} align="center">
                <Form.Item label="to">
                  <Input
                    value={this.state["to"]}
                    name="to"
                    onChange={this.handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={10} align="center">
                <Form.Item label="trip duration">
                  <Input name="duration" onChange={this.handleChange} />
                </Form.Item>
              </Col>
              <Col span={10} align="center">
                <Form.Item label="flight number">
                  <Input name="id" onChange={this.handleChange} />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={24}>
                <Card title="Default size card" style={{ width: "500px" }}>
                  <Space align="center">
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<MinusCircleOutlined />}
                      size="large"
                      onClick={(evt) => {
                        let new_number_of_state =
                          this.state.number_of_seats > 0
                            ? this.state.number_of_seats - 1
                            : 0;
                        //this.setState({ number_of_seats: new_number_of_state });
                        this.handleChange({
                          target: {
                            name: "number_of_seats",
                            value: new_number_of_state,
                          },
                        });
                      }}
                    />
                    <Text type="secondary">
                      {this.state.number_of_seats || 0}
                    </Text>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={<PlusCircleOutlined />}
                      size="large"
                      onClick={(evt) => {
                        let new_number_of_state =
                          this.state.number_of_seats + 1;
                        //this.setState({ number_of_seats: new_number_of_state });
                        this.handleChange({
                          target: {
                            name: "number_of_seats",
                            value: new_number_of_state,
                          },
                        });
                      }}
                    />
                  </Space>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item name="price" label="Price">
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
            <Row>
              <Col span={12}>
                <Form.Item>
                  <Button type="primary" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <NavigateButton
                    func={() => {
                      return this.state;
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Divider>Results</Divider>
        {this.state.flights.map((flight, index) => (
          <Card key={index}>
            <Flight flight={flight} />
            <FavButton flight={flight} />
          </Card>
        ))}
        {/* {this.state.flights.map((flight, index)=>{
          <FlightCard key={index} flight={flight}/>
        })} */}
      </div>
    );
  }
}

export default SearchPage;
