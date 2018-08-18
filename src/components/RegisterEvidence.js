import React, { Component } from 'react';

class RegisterEvidence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        caseId: '',
        fileHash: '',
        createdDate: '',
        evidenceType: '',
        evidenceTitle: '',
        description: ''
      }
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
  }

  handleInputChange = (event) => {
    this.setState({
      details: {
        ...this.state.details,
        [event.target.name]: event.target.value
      }
    })
    console.log(event.target.value);
  }


  render() {
    return (
      <div className="container">
        <h1>Create new Evidence</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-25">
              <label htmlFor="country">Case Id</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                placeholder="Enter your Case ID"
                value={this.state.details.caseId}
                onChange={this.handleInputChange}
                name="caseId"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="country">Case Title</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                placeholder="Enter your Case Title"
                value={this.state.details.evidenceTitle}
                onChange={this.handleInputChange}
                name="evidenceTitle"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="filehash">File Hash</label>
            </div>
            <div className="col-50">
              <input
                type="file"
                id="fname"
                // onChange={this.captureFile}
                name="fileHash"
                placeholder="Enter the Hash"
              />
            </div>
            {/* <div className="col-25">
              <p>{this.state.details.fileHash}</p>
              {
                this.state.uploadedImage ?
                  <img src={this.state.uploadedImage} width="200" height="200" />
                  : ''
              }
            </div> */}
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="createddate">Created Date</label>
            </div>
            <div className="col-75">
              <input
                type="date" 
                name="createdDate"
                value={this.state.details.createdDate}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="country">Evidence Type</label>
            </div>
            <div className="col-75">
              <select id="type" name="evidenceType"
                value={this.state.details.evidenceType}
                onChange={this.handleInputChange}>
                <option value="document">Document</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="other">Others</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="subject">Description of the Evidence</label>
            </div>
            <div className="col-75">
              <textarea
                id="subject"
                name="description"
                placeholder="Write something related to the evidence.."
                style={{ height: 200 }}
                value={this.state.details.description}
                onChange={this.handleInputChange}
              ></textarea>
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterEvidence;