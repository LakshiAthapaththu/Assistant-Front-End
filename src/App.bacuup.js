import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Demo from './recorder/recorder2.js';
import Selector from './selector/selectors.js';
// import Dropdown from 'react-dropdown'

// import ReactDOM from 'react-dom';
import { ReversedRadioButton ,RadioGroup, RadioButton } from 'react-radio-buttons';

import './dropdown.scss';


// const options = [
//   { value: 'one', label: 'One' },
//   { value: 'two', label: 'Two' }
   
// ]
// const defaultOption = options[0]



class App extends Component {

  constructor(props){
    super(props)
    this.state ={
      command:'',
      subCommand:'',
      // stateDefau
      optionsState:"1",
      selectedValue:'',

      // radio buttons
      buttonVal:"apple"

    }
    this.handleChanges=this.handleChanges.bind(this);
    this.handleButtonChanges=this.handleButtonChanges.bind(this)
    this._onSelect = this._onSelect.bind(this)
  }
  handleChanges(event){
    this.setState({
      command:event.target.value,
      selectedValue:"apple",
      optionsState:event.target.value,
      buttonVal:"apple"
   
    
  });
    // RadioGroup.value="";
    console.log(this.state.command);
    // console.log()
    // this.Selector.method();
 }
 handleButtonChanges(event){
   RadioGroup.value="";
  console.log("in handleButton")
 }
 _onSelect (option) {
    console.log('You selected ', option.label)
    this.setState({selected: option})
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        <p>පහත මෙනුවෙන් විධානයක් තෝරන්න</p>
        
          <select onChange={this.handleChanges} >
            <option value="1">ශේෂය කොපමනද?</option>
            <option value="2">අවසන් ගනුදෙනු පහ පෙන්වන්න </option>
            <option value="3">පින් අංකය වෙනස් කරන්න</option>
            <option value="4">පසු මෙනුවට </option>
          </select>

       {/* <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" /> */}





        <h4>Vertical Radio Buttons</h4>
        <RadioGroup name="optionGroup" onChange={ this.handleButtonChanges } selectedvalue={this.state.selectedValue}  value={this.state.buttonVal}>
          <ReversedRadioButton value="apple">
            Apple
          </ReversedRadioButton>
          <ReversedRadioButton value="orange">
            Orange
          </ReversedRadioButton>
          <ReversedRadioButton value="melon">
            Melon
          </ReversedRadioButton>
        </RadioGroup>

      {/* <Selector/>  */}
      {/* <Selector onRef={ref => (this.child = ref)}/>    */}
      {/* <Selector  onRef={ref => (this.child = ref)} />/> imported selector  */}
      <Demo /> {/*voice Recorder Component */}
      </div>
       
    );
  }
}
// ReactDOM.render(<recorder />, document.getElementById('App'));

export default App;
