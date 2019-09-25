import { ReversedRadioButton ,RadioGroup, RadioButton } from 'react-radio-buttons';
import React, { Component } from 'react';
// import Radio from './radioButton/radioButton.js';

// require ('./selectors.scss');    


class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.shuffle = this.shuffle.bind(this);
    }

    /**
     * Shuffle the order of intents that are shown in the drop down
     * @param a
     * @returns {*}
     */
    shuffle(a) {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }


    render() {
      var Options=[];
        if (this.props.domain === 'Bank'){ //changed-------------------------------------------------------->>
            var bankCommands = ['නව ගිණුමක් විවෘත කිරීම', 'ඉතිරීකිරීමේ ගිණුම', 'ස්ථාවර තැන්පතු'
                ,'ඉතිරීකිරීමේ ගිණුම් වර්ගය','තම ගිණුම තේරීම','නැවත උත්සාහ කිරීම','නැවත උත්සාහ නොකිරීම',
                'තොරතුරු නිවැරදි බව','තොරතුරු වැරදි බව','තහවුරු කිරීම','කාර්යය නතර කිරීම','කාල සිමාව',
                'පොළිය කල් පිරීමේදී ලබාගැනීම','පොළිය මාසිකව ලබාගැනීම'];
            // const numbers_1=Array.from({length: bankCommands.length-1}, (v, k) => k+1);
            // console.log("numvers_1"+numbers_1);
            // const shuffledNumbers_1 = this.shuffle(numbers_1);
            // console.log("numvers_1_shuffled"+shuffledNumbers_1);
            // const shuffledNumbers = [0];
            // shuffledNumbers.push.apply(shuffledNumbers, shuffledNumbers_1);
            // console.log("shuffledNumbers"+shuffledNumbers);

            //const numbers=Array.from(Array(bankCommands.length).keys());
            //console.log("numbers"+numbers);
            //const shuffledNumbers = this.shuffle(numbers);
            const shuffledNumbers = this.props.shuffledNumbers.split(',');
            console.log("shuffledNumbers in dropdownnn"+shuffledNumbers);

            //this.props.setTheFirstIntentAfterOrdering(shuffledNumbers[0]);
            //alert("going to update the cpability order "+shuffledNumbers[0]);
            const bankCommandOrdered = [];
            for(let i=0; i<bankCommands.length; i++){
                // push the component to bankCommandOrdered!
                bankCommandOrdered.push(bankCommands[shuffledNumbers[i]]);
            }
            var bankCommandsList = bankCommandOrdered.map(function(name,index){
                Options.push(<option value={shuffledNumbers[index]} key={shuffledNumbers[index]} >
                    {name}
                </option>);
            })
    }else{
        var commands = ['ක්ෂේත්‍රයක් තෝරන්න'];
        var bankCommandsList = commands.map(function(name,index){
          Options.push(<option value={index} key={index} >
                                 {name}
                       </option>);
        })
    }
    var slct ={
        background: 'transparent',
        width: 268,
        padding: 5,
        border: '1px solid black',
        height: 34,
      
    }
      return (
        <div className="dropdown" >
        <select style={slct}
          onChange={ this.props.handleSelectChanges} 
          value={this.props.selectValue} 
        >
        {Options}
        </select>
        
        </div> 
      );
    }
  }

  export default Dropdown;