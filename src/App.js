import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
// import Dropzone from './dropzone/Dropzone';

class App extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isLoading: false,
      files: [],
      result: "",
      visible: false
    };
  }

  handlePredictClick = (event) => {
    this.setState({ isLoading: true });
    var self = this;
    axios.get('http://07f3791774b7.ngrok.io/')
      .then(function (response) {
        console.log(response);
        console.log(response.data);
        var data = response.data;
        console.log("Data is: ", data)
        self.setState({
          result: data,
          isLoading: false,
          visible: true
        });
      })
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  handleUpload = (event) => {
    var formData = new FormData();
    formData.append("file", this.state.files[0]);

    console.log("initial formdata", formData);
    var self = this;
    axios.post(' http://07f3791774b7.ngrok.io/upload', formData
    )
      .then(function (response) {
        console.log("Submitted Formdata:", formData);
        console.log(response);
        console.log(response.data);
      })

  }

  onChange(e) {
    var files = e.target.files;
    console.log(files);
    var filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
    this.setState({ files: [...this.state.files, ...filesArr] });
  }


  render() {
    const isLoading = this.state.isLoading;
    // const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title">Fraud Detection App</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Upload financial data</Form.Label>
                {/* <Form.File
                  // type="text"
                  // placeholder="Text Field 1"
                  id="exampleFormControlFile1"
                  label="Example file input"
                // name="textfield1"
                // value={formData.textfield1}
                // onChange={this.handleChange}
                /> */}
                <Row>
                  <label className="custom-file-upload">
                    <input type="file" multiple onChange={this.onChange} />
                    <i className="fa fa-cloud-upload" /> Attach
                </label>
                </Row>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleUpload}>
                  Upload
                </Button>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  {isLoading ? 'Making prediction' : 'Predict'}
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {!this.state.visible ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{this.state.result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container >
    );
  }
}

export default App;