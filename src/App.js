import React, { Component } from 'react';
import './App.css';
import Contract from 'truffle-contract';
import CourtContract from '../build/contracts/Court.json';
import getWeb3 from './utils/getWeb3'
import ipfs from './ipfs'

// import EvidenceList from './EvidenceList';
import EvidenceList from './components/EvidenceList';
import EvidenceReport from './components/EvidenceReport';
import RegisterCase from './components/RegisterCase';
import RegisterEvidence from './components/RegisterEvidence';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      buffer: null,
      transactionHash: '',
      transactionCompleted: '',
      evidenceCount: null,
      details: {
        fileHash: '',
        caseId: 'case001',
        description: '',
        evidenceType: '',
        createdDate: ''
      },
      evidences: [],
      uploadedImage: '',
      account: '',
      accounts: []
    };

    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.registerCase = this.registerCase.bind(this);
    this.courtContract = null;
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({ web3: results.web3 });
      this.instantiateContract();
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  test = () => {
    this.initEvidenceList(this.state.details.caseId);
  }

  getEvidenceInstance = (result) => {
    return {
      caseId: result[0],
      evidenceId: result[1].c[0],
      description: result[2],
      fileHash: result[3],
      evidenceType: result[4],
      createdDateTime: result[5],
    };
  }

  initEvidenceCount() {
    return new Promise(resolve => {
      this.courtContract.getEvidenceCount(this.state.details.caseId)
        .then((r) => {
          this.setState({ evidenceCount: r.c[0] });
          console.log('evidenceCountRes:', r.c[0]);
          resolve(r.c[0]);
        }).catch((err) => {
          resolve(false);
          console.log(err)
        });
    });
  }

  initEvidenceList = (caseId) => {
    let promises = [], evidences = [];
    for (let i = 0; i < this.state.evidenceCount; i++) {
      promises.push(this.courtContract.getEvidenceById(this.state.details.caseId, i));
    }
    Promise.all(promises).then(results => {
      results.forEach(r => {
        let evidence = this.getEvidenceInstance(r);
        evidences.push(evidence);
        console.log(evidence);
      });
      this.setState({ evidences });
    });
  }

  instantiateContract = () => {
    const courtContractArtifact = Contract(CourtContract)
    courtContractArtifact.setProvider(this.state.web3.currentProvider)
    const contractDeployed = courtContractArtifact.deployed();

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      this.state.web3.eth.defaultAccount = accounts[0];

      contractDeployed.then((instance) => {
        this.courtContract = instance;

        this.initEvidenceCount().then(done => {
          if (done) {
            this.initEvidenceList();
          }
        });

        this.setState({ account: accounts[0], accounts: accounts });
      }).catch(err => console.error(err));
    });
  }

  handleInputChange = (event) => {
    this.setState({
      details: {
        ...this.state.details,
        [event.target.name]: event.target.value
      }
    });
  }

  registerCase(
    firstPartyAddress,
    secondPartyAddress,
    caseId,
    caseDescription,
    startDateTime = new Date().toISOString(),
    judgeAddress = "testjudge",
    courtId = "courtxyz"
  ) {
    this.courtContract.registerCase(
      courtId, // courtId
      firstPartyAddress, // firstParty
      secondPartyAddress, // secondParty
      judgeAddress, // judge
      caseId, // caseId
      caseDescription, // caseDescription
      startDateTime, // startDateTime of the case
      {
        from: this.state.account
      }
    ).then(r => {
      console.log(r)
    }).catch(err => console.log(err));
  }

  captureFile(event) {
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
            fileHash: result[0].hash
          },
          uploadedImage: imageUrl
        });
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    this.courtContract.registerEvidence(
      this.state.details.caseId,
      this.state.details.description,
      this.state.details.fileHash,
      this.state.details.evidenceType,
      this.state.details.createdDate, {
        from: this.state.account,
        gas: 3000000,
      }).then((r) => {
        console.log('evidence register result', r);
        return this.setState({
          transactionHash: r.transactionHash,
          transactionCompleted: true,
        });
      }).catch(error => {
        console.log(error)
      })
    alert('Request fulfilled');
  }

  onClick(event) {
    event.preventDefault();
    this.simpleStorageInstance.evidenceCount.call(this.state.account).then((r) => {
      var docCount = r[0]
      var docs = []
      for (var i = 0; i < docCount; i++) {
        docs.push(this.simpleStorageInstance.getEvidence.call(i));
      }

      Promise.all(docs).then(function (values) {
        console.log(values);
      })
    })
  }

  render() {
    // console.log(this.state.details);
    return (
      <div>

        <button
          onClick={this.test}
        >test</button>

        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Legit Chain</h1>
          </header>
        </div>
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
                <label htmlFor="filehash">File Hash</label>
              </div>
              <div className="col-50">
                <input
                  type="file"
                  id="fname"
                  onChange={this.captureFile}
                  name="fileHash"
                  placeholder="Enter the Hash"
                />
              </div>
              <div className="col-25">
                <p>{this.state.details.fileHash}</p>
                {
                  this.state.uploadedImage ?
                    <img src={this.state.uploadedImage} width="200" height="200" alt="person" />
                    : ''
                }
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="createddate">Created Date</label>
              </div>
              <div className="col-75">
                <input
                  type="date"
                  name="createdDate"
                  id="dateofbirth"
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
                <select id="type" name="evidenceType" value={this.state.details.evidenceType} onChange={this.handleInputChange}>
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
          <br /><br /><br />
          <EvidenceList evidences={this.state.evidences} />
          {/* <RegisterCase
            accounts={this.state.accounts}
            onRegisterCase={this.registerCase}
            courtContract={this.courtContract}
          /> */}
        </div>
      </div>
    );
  }
}

export default App
