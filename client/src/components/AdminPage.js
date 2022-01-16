import { Layout, Menu,Form,Col,Row } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import { PageHeader, Button, Descriptions } from 'antd';
import { Avatar } from 'antd';
import FlightsAdminButton from "./FlightsAdminButton";
import UsersAdminButton from "./UsersAdminButton";
import React, { Component } from "react";
import { Card } from 'antd';

let mountNode = document.getElementById('root');
const { Header, Content, Footer, Sider } = Layout;

const { Meta } = Card;
class AdminPage extends Component {
  render(){
    return (
     
            <>
              <div>
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7nFdX1g_CVR4WyP5LgKOGytP0J8PE53_RQ&usqp=CAU"size={70} />
              <Avatar size={64} icon={<UserOutlined />} />
                
              </div>
            
              <div class="header" >
              <b   style={{ textAlign: 'Left',  fontSize:30 , flex: 100, fontFamily: 
             'my-custom-font'}}>Admin</b>
             
              </div>
            
              <div>

              <Col span={12}>
              <Form.Item><FlightsAdminButton/></Form.Item>
              <Form.Item><UsersAdminButton/></Form.Item>
              </Col>
             </div>
            
            </>
          
          );
          
      
    }
}
    export default AdminPage;
    