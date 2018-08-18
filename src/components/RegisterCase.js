import React, { Component } from 'react';
import ipfs from '../ipfs'

class RegisterCase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: {
        caseId: '',
        FIR: '',
        startDateTime: '',
        plantiff: '',
        defendant: '',
        description: ''
      },
      accounts: this.props.accounts,
      uploadedImage: ''
    };

    console.log(this.state)

    // this.registerCase = this.props.onRegisterCase;
  }

  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      ipfs.files.add({ content: Buffer(reader.result) }, (error, result) => {
        if (error) return console.log(error);
        console.log('ipfs hash', result[0].hash);
        const blob = new Blob([reader.result], { type: "image/jpeg" });
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);

        this.setState({
          details: {
            ...this.state.details,
            FIR: result[0].hash
          },
          uploadedImage: imageUrl
        });
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      details: {
        ...this.state.details,
        [event.target.name]: event.target.value
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onRegisterCase(
      this.state.details.defendant,
      this.state.details.plantiff,
      this.state.details.caseId,
      this.state.details.description,
      this.state.details.startDateTime
    );

  }

  render() {
    return (
      <div className="container">
        <h1>Register new Case</h1>
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
              <label htmlFor="filehash">FIR</label>
            </div>
            <div className="col-75">
              <input
                type="file"
                id="fname"
                onChange={this.captureFile}
                name="FIR"
                placeholder="Enter the FIR"
              />
            </div>
            <div className="col-25">
              <p>{this.state.details.FIR}</p>
              {
                this.state.uploadedImage ?
                  <img src={this.state.uploadedImage} width="200" height="200" />
                  : ''
              }
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="createddate">Registration Date</label>
            </div>
            <div className="col-75">
              <input
                type="date"
                name="startDateTime"
                value={this.state.details.startDateTime}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="country">Plantiff</label>
            </div>
            <div className="col-75">
              <select
                id="type"
                name="plantiff"
                value={this.state.details.plantiff}
                onChange={this.handleInputChange}
              >
                {
                  this.props.accounts.map((account, i) => {
                    return <option value={account} key={i}>{account}</option>;
                  })
                }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="country">Defandant</label>
            </div>
            <div className="col-75">
              <select
                id="type"
                name="defendant"
                value={this.state.details.defendant}
                onChange={this.handleInputChange}
              >
                {
                  this.props.accounts.map((account, i) => {
                    return <option value={account} key={i}>{account}</option>;
                  })
                }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="subject">Description of the Case</label>
            </div>
            <div className="col-75">
              <textarea
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


export default RegisterCase;