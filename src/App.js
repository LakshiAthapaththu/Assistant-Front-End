import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Demo from './recorder/recorder2.js';
import logo from './static/bankAssistant2.jpg';
import {Container,Row,Col} from 'react-grid-system';
import { Provider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import Button from '@material-ui/core/Button';
var num = null;


class App extends Component {

  constructor(props){
    super(props)
    this.state ={
      command:'0',
      domain:'Bank',
      capability:'-1',
      start: false,
    }
    this.handleStartConv = this.handleStartConv.bind(this);
  }

  handleStartConv() {
    this.setState({start: true});
  }

  render() {
    var options = {
      position: 'top center',
      timeout: 5000,
      offset: '10px',
      transition: 'fade'
    }
    const start_conv = this.state.start;
    let button;

    if (start_conv) {
      button =  <Demo className= "Demo"
                  domain ={this.state.domain}
                  capability ={this.state.capability}
                  command = {this.state.command}/>;
    } else {

      button = <Button variant="contained" color="primary" className={classes.button}>
        Send
        {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
        <Icon className={classes.rightIcon}>send</Icon> onClick={this.handleStartConv}
      </Button>;
    }

    return (
      <Provider template={AlertTemplate} {...options}>
      <div className="App">
      <Container>
       <Row>
       <Col sm={12}>
        <h3>Start Banking in Sinhala </h3>
        {/* </p> */}
        <p>දැන් ඔබටත් ඔබේ මව් බසින්ම සියලු බැංකු කටයුතු සිදු කිරීමට අවස්ථාව </p>
      </Col>
      <br />
      </Row>
      <br />
      <Row>
      <Col sm={3.5}>
      <h4>  </h4>
      <br/>
      <img  src={logo} alt="logo"  height="450" width="300"/>
    </Col>
    <Col sm={2}>
    </Col>
    <Col sm={5}>
      <h4>උත්සාහ කර බලන්න</h4>
      <p>'මයික්‍රොෆෝන්' (microphone) සලකුන ඔබා ඔබේ අවශ්‍යතාවය සිංහලෙන් කියන්න.</p>
      <br/>
      <div>
        {button}
      </div>
          {/*  <Demo className= "Demo"
            domain ={this.state.domain}
            capability ={this.state.capability}
            command = {this.state.command}
            />*/}
    
          
      </Col>
      </Row>
     </Container>
      </div>
      </Provider>
       
    )}
}


export default App;
