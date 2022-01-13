import React, { Component, useState, useEffect } from "react";
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
import {
  DownloadOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
const Seat = ({ state, onClick }) => {
  // const [status, setStatus] = useState("free");
  // useEffect(() => {
  //   setStatus(state);
  // }, [state]);

  return (
    <div>
      {state == "free" && (
        <Button
          type="primary"
          shape="circle"
          icon={<PlusCircleOutlined />}
          size="large"
          ghost={true}
          onClick={() => {
            //setStatus("reserved");
            onClick();
          }}
        />
      )}

      {state == "reserved" && (
        <Button
          type="primary"
          shape="circle"
          icon={<CheckCircleOutlined />}
          size="large"
          onClick={() => {
            //setStatus("free");
            onClick();
          }}
        />
      )}

      {state == "taken" && (
        <Button
          type="danger"
          shape="circle"
          icon={<CloseCircleOutlined />}
          size="large"
        />
      )}
    </div>
  );
};

export default Seat;
