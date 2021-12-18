import React, { useState, Component } from "react";
import { Button } from "antd";
import "antd/dist/antd.css";

import { useNavigate, createSearchParams } from "react-router-dom";

const NavigateButton = (props) => {
  let navigate = useNavigate();
  let function_to_get_current_state = props.func;

  const get_reverse_of_serach_query = (querry) => {
    console.log(querry)
    const arrival_time = querry['arrival_time'] || new Date(Date.now()) // this will be our start date as you can't go back before arriving first // TODO: Not implemented properly now // * this is the arrival time of the flight
    const end_date = querry['end_date'] //* this is the last day we want to stay in some contry
    const to = querry['from'] // because we are going back
    const from = querry['to']
    return {
      start_date:arrival_time,
      end_date:end_date,
      to:to,
      from:from
    }
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={(e) => {
          console.log(
            "state before navigating is ",
            function_to_get_current_state()
          );
          let state = function_to_get_current_state();
          let params = get_reverse_of_serach_query(state);
          console.log(
            "reverse search params is",
            params
          );

          navigate('../ReturnTrip', {state:params})
        }}
      >
        navigate
      </Button>
    </div>
  );
};

export default NavigateButton;
