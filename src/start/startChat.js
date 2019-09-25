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

require ('./styles.scss');

class StartChat extends Component {
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
          <Button variant="contained" color="primary" className={classes.button}>
            Send
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
         </div>
    </MuiThemeProvider>
    );
  }
  }
}
export default withAlert(StartChat);

// render(<Demo/>, document.querySelector('#demo'))