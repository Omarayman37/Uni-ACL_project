import React, { Component, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  Tabs,
  Divider,
  Tag,
  Typography,
  Popconfirm,
} from "antd";
import "antd/dist/antd.css";
import {
  SketchOutlined,
  DingdingOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Seat from "./Seat";
import "../App.css";
import Flight from "./Flight";
const { Title } = Typography;

const PayPage = () => {
  const [flight, setFlight] = useState({});
  const [eco, setEco] = useState([]);
  const [business, setBusiness] = useState([]);
  const [first, setfirst] = useState([]);
  const [price, setPrice] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const reserve_seat=(flight_id, seat_nr, price)=>{
      axios
        .post("http://localhost:5000/createTicket", {
          flight_id: flight["_id"],
          seat_nr,
          price,
        })
        .then((response) =>
          console.log(
            `sucessfully created ticket ${flight_id} and seat ${seat_nr}, price:${price}`
          )
        );
  }
  useEffect(() => {
    const f = location.state.flight;
    setFlight(f);
    console.log(`paying for flight ${f}`);
    let res_eco = location.state.reserved_seats_eco;
    setEco(res_eco);
    let res_bui = location.state.reserved_seats_business;
    setBusiness(res_bui);
    let res_fir = location.state.reserved_seats_first;
    setfirst(res_fir);
    let price = f["price"];
    let total_price =
      res_eco.length * price +
      res_bui.length * (price * 1.2) +
      res_fir.length * (price * 1.4);
    setPrice(Math.floor(total_price));
  }, []);
  return (
    <div>
      <Flight flight={flight} />

      <Divider>First Class</Divider>
      {first.map((seat) => (
        <Tag color="magenta">{seat}</Tag>
      ))}
      <Divider>Buisness</Divider>

      {business.map((seat) => (
        <Tag color="cyan">{seat}</Tag>
      ))}
      <Divider>Economy</Divider>

      {eco.map((seat) => (
        <Tag color="green">{seat}</Tag>
      ))}

      <Title>Total Price</Title>
      <Row>
        <Col span={4}>
          <Title level={2}>{price}</Title>
        </Col>
        <Col>
          <Popconfirm
            placement="rightBottom"
            title={"Sure You want to Confirm Paymen"}
            onConfirm={() => {
              console.log("confirmed the payment");
              // Here we actually Pay we keda

              //
              // here we update database
              for (const seat of eco) {
                  reserve_seat(flight['_id'], seat, price);
              }
              for (const seat of business) {
                reserve_seat(flight["_id"], seat, price*1.2);
              }
              for (const seat of first) {
                reserve_seat(flight["_id"], seat, price*1.4);
              }
              
              
              // navigate
              //navigate.navigate("../PaySuccess");
            }}
            okText="Yes Pay"
            cancelText="Wait"
          >
            <Button>Bottom</Button>
          </Popconfirm>
        </Col>
      </Row>
    </div>
  );
};

export default PayPage;
