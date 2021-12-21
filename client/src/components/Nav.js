import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;
const Nav = ({})=> {
    
    const location = useLocation();
    return (
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {/* {new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
          })} */}
          <Menu.Item>
            <Link to="/SearchPage">Find Flight</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/Fav">Fav</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/Reserve">res</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/Fav">{location.pathname}</Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  
}

export default Nav
