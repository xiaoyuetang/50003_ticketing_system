import React, { Component } from "react";
import Select from "react-select";
import axios from 'axios';       //here


import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  FormTextarea,
  Button,
  Card,
  CardTitle,
  CardSubtitle,
  Modal,
  ModalBody,
  ModalHeader
} from "shards-react";
import "./contactUsForm.css";

var my_precious_url = "";
const topics = [
  { label: "API DevOps", value: 1 },
  { label: "Chart as a Service", value: 2 },
  { label: "Recruitment Platform", value: 3 },
  { label: "Aesop", value: 4 },
  { label: "Travel Marketplace", value: 5 },
  { label: "Banking Lifestyle App", value: 6 },
  { label: "AR Car Visualizer", value: 7 },
  { label: "AR Car Manual", value: 8 },
  { label: "AR Gamification", value: 9 },
  { label: "AR Threatre", value: 10 },
  { label: "AR Menu", value: 11 },
  { label: "AI Wealth Manager", value: 12 },
  { label: "Multilingual Chatbot", value: 13 },
  { label: "AI Translator", value: 14 },
  { label: "Digital Butler", value: 15 },
  { label: "Video Analytics", value: 16 },
  { label: "Sentiment Analysis", value: 17 },
  { label: "ACNAPI MFA Login", value: 18 },
  { label: "Ticketing Platform", value: 19 },
  { label: "Smart Lock", value: 20 },
  { label: "Smart Home", value: 21 },
  { label: "Smart Parking", value: 22 },
  { label: "Smart Restaurant", value: 23 },
  { label: "Queuing System", value: 24 },
  { label: "IoT Led Wall", value: 25 },
  { label: "Other", value: 26 }
];

class IdContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,

      title: "",
      problem: "",
      relatedtags: null,
      selectedFile: null,     //Here
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.singleFileChangedHandler = this.singleFileChangedHandler.bind(this);  //Here
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  handleChangeSelect = event => {
    console.log(event);

    this.setState({
      relatedtags: [event]
    });
  };

  toggle() {
    this.setState({
      open: !this.state.open
    });
    console.log(
      "Form Details: \n" +
        "\ntitle: " +
        this.state.title +
        "\nproblem:" +
        this.state.problem +
        "\nrealtedtags: " +
        this.state.relatedtags +
        "\nuploadedImage: "+
        this.state.selectedFile   //Here
    );

    //Image starts here
    const data = new FormData();
    // If file selected
    if ( this.state.selectedFile ) {
    data.append( 'profileImage', this.state.selectedFile ); //, this.state.selectedFile.name
    axios.post( 'https://courier50003.herokuapp.com/portal/profile-img-upload',data, {
    //axios.post( 'http://localhost:5000/api/profile-img-upload',data, {
      headers: {
       'accept': 'application/json',
       'Accept-Language': 'en-US,en;q=0.8',
       
       
      }//'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      
     }).then(function (response) {
      console.log("Yes yes!");
      if ( 200 === response.status ) {
        my_precious_url = response.data.location;
        
      }
    })
    }

    console.log("my url is:"+my_precious_url);
    //image parts end here

    // var unirest = require("unirest");

    // var req = unirest(
    //   "POST",
    //   "https://courier50003.herokuapp.com/portal/usersubmit"
    // );

    // req.headers({
    //   "cache-control": "no-cache",
    //   "content-type": "application/json"
    // });

    // req.type("json");
    // req.send({
    //   email: this.state.email,
    //   contact_num: this.state.contactnum,
    //   message: this.state.problem,
    //   category: this.state.relatedtags,
    //   imageurl: my_precious_url                 //Here
    // });

    // req.end(function(res) {
    //   if (res.error) throw new Error(res.error);

    //   console.log(res.body);
    // });
    
  }

  //Image 
  singleFileChangedHandler = ( event ) => {
    console.log(event.target.files);
		this.setState({
		 selectedFile: event.target.files[0]
		});
     }; 
     
  render() {
    const { open } = this.state;
    return (
      <Card className="ContactUsCard">
        <CardTitle>Tell us your problem!</CardTitle>
        <CardSubtitle>We will reply within 2 business days.</CardSubtitle>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <label>Title</label>
                    <FormInput
                      name="title"
                      onChange={this.handleChange}
                      size="sm"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="feInputAddress">
                      Description of Problem
                    </label>
                    <FormTextarea
                      name="problem"
                      onChange={this.handleChange}
                      id="feInputAddress"
                      rows="4"
                      size="sm"
                    />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="feInputAddress2">
                      Related Topics and Assets
                    </label>
                    <Select
                      isMulti
                      options={topics}
                      onChange={this.handleChangeSelect}
                    />
                  </FormGroup>


                  {/*Image Upload here*/}
                  <div className="card-body">
                    <p className="card-text">Attachment</p>
                    <input type="file" onChange={this.singleFileChangedHandler}/>
                  </div>
                

                  <Button onClick={this.toggle}>Submit Now!</Button>
                  <Modal open={open} toggle={this.toggle}>
                    <ModalHeader>Submitted</ModalHeader>
                    <ModalBody>
                      Thanks! We have received your request. Meanwhile, you
                      might want to check out these common problems: help help
                      help
                    </ModalBody>
                  </Modal>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

export default IdContactUs;