import React, { Component } from 'react';
import './EvidenceList.css';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import EvidenceOne from './EvidenceOne';
// import { Route } from '../../../../../.cache/typescript/2.6/node_modules/@types/react-router';
// import EvidenceOne from './EvidenceOne';
// import EvidenceTwo from 'EvidenceTwo';


class EvidenceList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCase: '',
      evidences: this.props.evidences
    }
  }

  handleChange = (event) => {
    this.setState({
      selectedCase: event.target.value
    });
  }

  componentWillReceiveProps() {
    console.log(this.props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Enter caseid to fetch all evidences</h1>
        <input
          name="selectedCase"
          placeholder="Ex: case001"
          value={this.state.selectedCase}
          onChange={this.handleChange}
        />
        {
          this.state.selectedCase ?
            <div>
              <h1>Evidence List of this case</h1>

              <table className="w3-table-all">
                <thead>
                  <tr className="w3-blue">
                    <th>File Hash (click to download)</th>
                    <th>Created Date</th>
                    <th>Evidence Type</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.evidences.map((evidence, i) => {
                      return (
                        <tr key={i}>
                          <td onClick={this.downloadFile}>
                            <a href={this.props.uploadedImage} target="_blank">
                              {evidence.fileHash}
                            </a>
                          </td>
                          <td>
                          {new Date(evidence.createdDateTime).toLocaleDateString()}
                          </td>
                          <td>{evidence.evidenceType}</td>
                          <td><a href={this.props.uploadedImage}></a></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div > : ''
        }
      </div>
    )
  }

}

export default EvidenceList;
