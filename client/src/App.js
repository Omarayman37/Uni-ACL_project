
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, createContext } from "react";
import "./App.css";
import Guest from "./components/Guest.js";
import Airplanes from "./components/Airplanes.js";
import AllAirplanes from "./components/AllAirplanes.js";
import LoginPage from "./components/Login";
import SearchPage from "./components/SearchPage";
import Reservedflights from "./components/Reservedflights";
import HomeGuest from "./components/HomeGuest"; //home page that the guest gets to see when he logs in
import MyFlights from "./components/myFlights"; //page containing the flights of the user signed in
import UserAllFlights from "./components/UserAllFlights"; //contains all flights with an option to reserve it
import EditUser from "./components/RegiesterPage";
import AddAirplane from "./components/AddAirplane";
import ReturnTrip from "./components/ReturnTrip";
import Seat from "./components/Seat";
import Ticket from "./components/Ticket";
import ChooseSeats from "./components/CSeats";
import { Layout, Menu, Breadcrumb, Result, Button } from "antd";
import Nav from "./components/Nav";
import EditUSer from "./components/EditUser";
import FavFlights from "./components/FavFlights";
import PayPage from "./components/Pay";
import FlightCard from "./components/FlightCrad";
import MyTickets from "./components/MyTickets";

import RegisterPage from './components/RegiesterPage'
import PaySuccess from './components/PaySuccess'
import LoginAdmin from './components/LoginAdmin'
import AdminPage from './components/AdminPage'



import Contexts, { Context } from "./components/Contexts";
import StripePayPage from "./components/StripPayPage";
import EditFlight from './components/EditFlight'
// These are global Variables 


const { Header, Content, Footer } = Layout;
function App() {
  const { userLoggedIn, setUserLoggedIn } = useContext(Context);
 
  const navigate = useNavigate();
  const user_exists=()=>{
    let token = localStorage.getItem('token')
    if(token==undefined || token == 'undefined'){
      return false
    }
    return true
  }
  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Nav />
        </Header>
        <Content style={{ padding: "50px 50px" }}>

        
            <Route path="/" element={<SearchPage />} exact />
            <Route path="/FavFlights" element={<FavFlights />} exact />
            <Route path="/ChooseSeats" element={<ChooseSeats />} exact />
            <Route path="/EditUser" element={<EditUSer />} exact />
            <Route path="/PaySuccess" element={<PaySuccess />} exact />
            
            <Route path="/Pay" element={<PayPage />} exact />
            <Route path="/MyTickets" element={<MyTickets />} exact />
            <Route path="/AddAirplane" element={<AddAirplane />} exact />
            <Route path="/ReturnTrip" element={<ReturnTrip />} exact />
            <Route path="/SearchPage" element={<SearchPage />} exact />
            <Route path="/UpdateFlights" element={<UpdateFlights />} exact />
            <Route path="/LoginUser" element={<LoginPage />} />
            <Route path="/myFlights" element={<MyFlights />} />
            <Route path="/userAllFlights" element={<UserAllFlights />} />
            <Route path="/RegisterUser" element={<RegisterPage />} />
            <Route path="/AddAirplanes" element={<Airplanes />} />
            <Route path="/HomeGuest" element={<HomeGuest />} />

            <Route path="/Ticket" element={<Ticket />} />
            <Route path="/LoginAdmin" element={<LoginAdmin />} />
            <Route path="/AdminPage" element={<AdminPage />} />

          {false &&
            (function nonLoggedIn() {
              return (
                <Routes>
                  <Route
                    path="/*"
                    element={
                      <LoginPage
                        user_logged_in={() => {
                          setUserLoggedIn(true);
                          console.log("user looged in i guess, ", userLoggedIn);
                        }}
                      />
                    }
                  />
                  <Route
                    path="/LoginUser"
                    element={
                      <LoginPage
                        user_logged_in={() => {
                          setUserLoggedIn(true);
                        }}
                      />
                    }
                  />

                  <Route path="/RegisterUser" element={<RegisterPage />} />
                </Routes>
              );
            })()}

          {true && (
            <Routes>
              <Route path="/" element={<EditUSer />} exact />
              <Route path="/FavFlights" element={<FavFlights />} exact />
              <Route path="/ChooseSeats" element={<ChooseSeats />} exact />
              <Route path="/EditUser" element={<EditUSer />} exact />
              <Route path="/PaySuccess" element={<PaySuccess />} exact />


              <Route path="/Pay" element={<PayPage />} exact />
              <Route path="/MyTickets" element={<MyTickets />} exact />
              <Route path="/AddAirplane" element={<AddAirplane />} exact />
              <Route path="/ReturnTrip" element={<ReturnTrip />} exact />
              <Route path="/SearchPage" element={<SearchPage />} exact />
              <Route
                path="/LoginUser"
                element={
                  <LoginPage
                    user_logged_in={() => {
                      setUserLoggedIn(true);
                    }}
                  />
                }
              />
              <Route path="/myFlights" element={<MyFlights />} />
              <Route path="/userAllFlights" element={<UserAllFlights />} />
              <Route path="/RegisterUser" element={<RegisterPage />} />
              <Route path="/AddAirplanes" element={<Airplanes />} />
              <Route path="/HomeGuest" element={<HomeGuest />} />

              <Route path="/Ticket" element={<Ticket />} />

              <Route path="/FlightCard" element={<FlightCard />} />
              <Route path="/StripePay" element={<StripePayPage />} />
              <Route
                path="/Payfailure"
                element={
                  <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary" onClick={()=>{
                      navigate('../')
                    }}>Back Home</Button>}
                  />
                }
              />
              
            </Routes>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default App;
