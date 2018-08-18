import React, { Component } from 'react';

class EvidenceReport extends Component {

  render() {
    return (
      <div className="container">
        <h1>Report for Evidence</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-25">
              <label htmlFor="country">Case Id</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                placeholder="Enter your Case ID"
                // value={this.state.details.caseId}
                // onChange={this.handleInputChange}
                name="caseId"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="filehash">Upload Report</label>
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
              <label htmlFor="createddate">Report Generation Date</label>
            </div>
            <div className="col-75">
              <input
                type="date"
                name="createdDate"
                id="dateofbirth"
              // value={this.state.details.createdDate}
              // onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="country">Evidence Reporter</label>
            </div>
            <div className="col-75">
              <select id="type" name="evidenceType"
              // value={this.state.details.evidenceType} onChange={this.handleInputChange}>
              ><option value="document">Rajesh</option>
                <option value="audio">Dhruv</option>
                <option value="video">Rajni</option>
                <option value="other">Subhi</option>
              </select>
            </div>
          </div>
          
          <div className="row">
            <div className="col-25">
              <label htmlFor="subject">Description of the Report</label>
            </div>
            <div className="col-75">
              <textarea
                id="subject"
                name="description"
                placeholder="Write something related to the evidence.."
                // style={{ height: 200 }}
                // value={this.state.details.description}
                // onChange={this.handleInputChange}
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

export default EvidenceReport;