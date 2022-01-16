import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/Contexts";
const Send_request = async (url, data) => {
  try {
    console.group();
    console.log(`sending request to ${url} with data`);
    let token = localStorage.getItem("token");
    
    data = { ...data, token: token };
    console.dir(data);
    const base = "http://localhost:5000/";
    const full_url = base + url;
    console.log(`full url is ${full_url}`);
    let res = await axios.post(full_url, data);
    console.log("result form server is");
    console.dir(res);
    console.groupEnd();
    return res.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.status === 403) {
      console.log(
        `unauthrized access of a non logged in user you will be redirected`
      );
      //window.location.href = "http://localhost:3000/LoginUser"; // Now you have a place
    }
    console.error(e);
    return {}
  }
};

export default Send_request;
