
import React, { Component } from 'react';
import './EvidenceList.css';
import ipfs from './ipfs';

class EvidenceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  changeCaseIdForList = (event) => {
    this.setState({
      caseIdForList: event.target.value
    });
  }

  initEvidenceList = () => {
  }

  downloadFile = () => {
    ipfs.files.get('')
  }

  render() {
    return (
      <div>
        <h1>Evidence List of this case</h1>
        {
          <table className="w3-table-all">
            <thead>
              <tr className="w3-blue">
                <th>Court Id</th>
                <th>File Hash (click to download)</th>
                <th>Created Date</th>
                <th>Evidence Type</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                  <td>{this.props.hardcoded.courtId}</td>
                  <td onClick={this.downloadFile}>
                    <a href={this.props.uploadedImage} target="_blank">{this.props.hardcoded.fileHash}</a>
                  </td>
                  <td>{this.props.createdData}</td>
                  <td>{this.props.hardcoded}</td>
                </tr> */}
              <tr>
                <td>12312</td>
                <td onClick={this.downloadFile}>
                  <a href={this.props.uploadedImage} target="_blank">qx38778829482jfhebjdks847uhjdwu</a>
                </td>
                <td>03/10/1998</td>
                <td>Document</td>
              </tr>
              <tr>
                <td>23423</td>
                <td>
                  <a href={this.props.uploadedImage} target="_blank">357yehfgdshue378974678hdfudjuih</a>
                </td>
                <td>12/02/2012</td>
                <td>Audio</td>
              </tr>
              <tr>
                <td>34232</td>
                <td>
                  <a href={this.props.uploadedImage} target="_blank">ruery3847920874uerdijkf398908ij</a>
                </td>
                <td>30/12/2015</td>
                <td>Video</td>
              </tr>
            </tbody>
          </table>
        }
      </div >
    )
  }

}

export default EvidenceList;