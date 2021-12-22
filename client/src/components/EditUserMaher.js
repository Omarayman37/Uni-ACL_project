import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditUser extends Component {

  constructor(props) {
    super(props)


    this.onChangeemail = this.onChangeemail.bind(this);

    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangefirst_name = this.onChangefirst_name.bind(this);
    
    this.onChangelast_name = this.onChangelast_name.bind(this);
    this.onChangehome_address=this.onChangehome_address.bind(this);
    
    this.onChangenickname=this.onChangenickname.bind(this);
    this.onChangepassport=this.onChangepassport.bind(this);

    this.onChangetelephone_number = this.onChangetelephone_number.bind(this);
    
   
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      email:'',
      password: '',
      nickname: '',
      first_name: '',
      last_name: '',
      home_address: '',
      telephone_number:'',
      passport:''

    }
  }

//   componentDidMount() {
//     axios.get('http://localhost:4000/flights/edit-flight/' + this.props.match.params.id)
//       .then(res => {
//         this.setState({
//           flightNum:res.data.flightNum,
//           airportFrom: res.data.airportFrom,
//           airportTo: res.data.airportTo,
//           leaveAt:res.data.leaveAt,
//           arriveAt:res.data.arriveAt,
//           economy: res.data.economy,
//           business: res.data.business,
//           first: res.data.first,
//           date: res.data.date,
//           arrivalDate:res.data.arrivalDate

//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }

  onChangeemail(e){
    this.setState({email:e.target.value})
  }
 
  onChangepassword(e) {
     this.setState({password: e.target.value})
   }
   onChangenickname(e) {
     this.setState({nickname: e.target.value})
   }
 
   onChangefirst_name(e) {
     this.setState({first_name: e.target.value})
   }
   onChangelast_name(e){
     this.setState({last_name: e.target.value})
   }
 
   onChangehome_address(e){
     this.setState({home_address: e.target.value})
   }
   onChangetelephone_number(e){
     this.setState({telephone_number: e.target.value})
   }
 
   onChangepassport(e) {
     this.setState({passport: e.target.value})
   }
   
   
   
  onSubmit(e) {
    console.log("ana d5lt henad");

    e.preventDefault()
        console.log("ana d5lt hena");
    const flightObject = {
      email:this.state.email,
    
      password: this.state.password,
      nickname: this.state.nickname,

      first_name:this.state.first_name,
      last_name:this.state.last_name,

      home_address: this.state.home_address,
      telephone_number: this.state.telephone_number,
      passport: this.state.passport
    };

    axios.post('http://localhost:5000/updateUser' , flightObject)
      .then((res) => {
        console.log(res.data)
        console.log(' User succesfully updated')
      }).catch((error) => {
          console.log("ya bdany");
        console.log(error)
      })
    // Redirect to Flight List 
    //this.props.history.push('/flight-list')
    //window.location.reload(false);
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
      <b style={{color: 'black',fontSize:'50px',position: 'absolute',left: '50%',transform: 'translate(-50%, -40%)'}}>Edit Flight</b>
      <br></br>
      <br></br>

      <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="text" value={this.state.email} onChange={this.onChangeemail} placeholder ="Email-Address"required/>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" value={this.state.password} onChange={this.onChangepassword} placeholder ="Passcode"required/>
        </Form.Group>

        <Form.Group controlId="nickname">
          <Form.Label>Nickname</Form.Label>
          <Form.Control type="text" value={this.state.nickname} onChange={this.onChangenickname} placeholder ="Nickname" required/>
        </Form.Group>

        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={this.state.first_name} onChange={this.onChangefirst_name} placeholder ="First Name" required/>
        </Form.Group>
        
        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={this.state.last_name} onChange={this.onChangelast_name} placeholder ="Last Name" required/>
        </Form.Group>

        <Form.Group controlId="home_address">
          <Form.Label>Home Address</Form.Label>
          <Form.Control type="text" value={this.state.home_address} onChange={this.onChangehome_address} placeholder ="Home Address" required/>
        </Form.Group>

        <Form.Group controlId="telephone_number">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" value={this.state.telephone_number} onChange={this.onChangetelephone_number} placeholder ="Phone Number" required/>
        </Form.Group>

        <Form.Group controlId="passport">
          <Form.Label>Passport Number</Form.Label>
          <Form.Control type="text" value={this.state.passport} onChange={this.onChangepassport} placeholder ="Passport Number" required/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update User
        </Button>
      </Form>
    </div>);
  }
}
