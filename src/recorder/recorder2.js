import React, {Component}          from 'react';
import { render }                  from 'react-dom';
import { FloatingActionButton, MuiThemeProvider }         from 'material-ui';
// import injectTapEventPlugin        from 'react-tap-event-plugin';
import MicrophoneOn                from 'material-ui/svg-icons/av/mic';
import MicrophoneOff               from 'material-ui/svg-icons/av/stop';
import { ReactMic } from 'react-mic';
import axios, {post} from 'axios';
import { withAlert } from 'react-alert'
import ReactLoading from 'react-loading';

// import toBuffer  from 'blob-to-buffer';

// import sampleAudio                 from './sample_audio.webm';
// import ReactGA                     from 'react-ga';

require ('./styles.scss');

// injectTapEventPlugin();

// ReactGA.initialize('UA-98862819-1');

class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      record: false,
      blobObject: null,
      isRecording: false,
      loading:false,
    }
    // this.post=this.post.bind(this);
    // this.fileUpload=this.bind(this);
  }

//   componentDidMount() {
//     ReactGA.pageview(window.location.pathname);
//   }

//  fileUpload(file){
//   // const url = 'http://example.com/file-upload';
//   const formData = new FormData();
//   formData.append('file',file)
//   const config = {
//       headers: {
//           'content-type': 'multipart/form-data'
//       }
//   }
//     return  post('/api/file', formData,config)
//   }
  getdomain = (domain) =>{
    if (domain ==='Bank'){
      return [7,6,7,4,6,3];
    }else{
      return [3,3,3,6,3];
    }
  }

  validator =(domain) =>{
    let list = this.getdomain(domain);
    if (list[this.props.capability] < this.props.command){
      return false;
    }else{
      return true;
    }
  }
  startRecording = () => {
    //this.props.alert.show("The command "+this.props.command)
    if(this.props.command ===''){
        this.props.alert.show("Select a Command to Record")
    //}else if(!this.validator(this.props.domain))
    //{
     // this.props.alert.show("Select a Command to Record")
    }else{
    this.setState({
      record: true,
      isRecording: true
    });}
  }

  stopRecording= () => {
    this.setState({
      record: false,
      isRecording: false
    });
  }

  onStart=() => {
    console.log('You can tap into the onStart callback');
  }

  onStop= (blobObject) => {
    this.setState({
      blobURL : blobObject.blobURL,
      // blobObject.
      data : blobObject.blob,
    });
    // blobObject.data

    // toBuffer(blobObject, function (err, buffer) {
    //   if (err) throw err
     
    //   buffer[0] // => 1
    //   buffer.readUInt8(1) // => 2
    // })
    // console.log(this.state.blobURL+ " this is the URL");
    // console.log("data "+ this.state.data);
    // var buffer = new Buffer(this.state.blobURL, "binary");
    // fileUpload(buffer);
    const formData = new FormData();
    // formData.append('file',buffer);

    formData.append('file',this.state.data);
    formData.append('command',this.props.command);
    formData.append('domain',this.props.domain);
    formData.append('capability',this.props.capability); 
    // form
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
        // json:true
    };
    var self = this;
    post('/api/file', formData,config).then(function (success) {
      self.props.alert.success("Command captured!");
      self.setState({
        loading:false
      });
    }).catch(function (error) {
      self.props.alert.error("Connection Error!");
      self.setState({
        loading:false
      });
    });
    self.setState({
      loading:true
    });
    // console.log(blobObject+ " this is the URL");
  }

  render() {
    const { isRecording } = this.state;
    if(this.state.loading){
      return(
        <ReactLoading type='bubbles' delay={300} color='771010' height='50' width='50' />
      );
    }else{
    return(
      <MuiThemeProvider>
        <div>
          <br></br>
          <ReactMic
            className="oscilloscope"
            record={this.state.record}
            backgroundColor="#000000"
            visualSetting="sinewave"
            audioBitsPerSecond= {128000}
            onStop={this.onStop}
            onStart={this.onStart}
            strokeColor="#ffffff" />
          <div>
            <audio ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
          </div>
          <br />
          <br />
          <FloatingActionButton
            backgroundColor='#1E90FF'
            className="btn"
            secondary={false}
            disabled={isRecording}
            onClick={this.startRecording}>
            <MicrophoneOn />
          </FloatingActionButton>
          <FloatingActionButton
            backgroundColor='#1E90FF'
            className="btn"
            secondary={false}
            disabled={!isRecording}
            onClick={this.stopRecording}>
            <MicrophoneOff />
          </FloatingActionButton>
          <br />
          <br />
          <br />
         </div>
    </MuiThemeProvider>
    );
  }
  }
}
export default withAlert(Demo);

// render(<Demo/>, document.querySelector('#demo'))