pragma solidity ^0.4.24;

contract Court
{
    struct Evidence{
        string description;
        string fileHash; // ipfs file hash to access the evidence media file
        address owner; // the person who is uploading the evidence (one of either firstParty or the secondParty)
        // string evidenceId;
        string evidenceType; // 'documentary' / 'audio' / 'video'
        uint timestamp; // uploaded to blockchain time
        string createdDateTime; // 'ISO datetime string, tells evidence creation true time reported by party'
    }

    struct Case {
        string courtId;
        string firstParty;
        string secondParty;
        string judge;
        string FIR;
        string caseId;
        string caseDescription;
        mapping(uint => Evidence) evidences; // evidence[evidenceNum] = someEvidence
        uint totalEvidences; // length of evidences
        string startDateTime;
        bool initialised;
    }

    mapping(string => Case) cases; // cases[caseId] = someCase;
    mapping(address => string[]) casesGoingOn;

    constructor() public { }

    function registerCase(
        string _courtId,
        string _firstParty,
        string _secondParty,
        string _judge,
        string _FIR,
        string _caseId,
        string _caseDescription,
        string _startDateTime
    ) public {
        cases[_caseId] = Case({
            courtId: _courtId,
            firstParty: _firstParty,
            secondParty: _secondParty,
            judge: _judge,
            FIR: _FIR,
            caseId: _caseId,
            caseDescription: _caseDescription,
            totalEvidences: 0,
            startDateTime: _startDateTime,
            initialised: true
        });
        // add caseId to casesGoingOn mapping to user if not already exists
        // addCase(_firstParty, _caseId);
        // addCase(_secondParty, _caseId);
    }

    function addCase(address party, string caseId) private {
        bool alreadyExists = false;
        for (uint i = 0; i < casesGoingOn[party].length; i++)
            if (compareString(casesGoingOn[party][i], caseId) == 0) alreadyExists = true;
        if (alreadyExists) casesGoingOn[party].push(caseId);
    }

    function getNumCasesGoingOn() public view returns (uint) {
        return casesGoingOn[msg.sender].length;
    }

    function getCaseGoingOn(uint index) public view returns (string) {
        return casesGoingOn[msg.sender][index];
    }

    function compareString(
        string _a,
        string _b
    ) private returns (int) {
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);
        uint minLength = a.length;
        if (b.length < minLength) minLength = b.length;
        //@todo unroll the loop into increments of 32 and do full 32 byte comparisons
        for (uint i = 0; i < minLength; i ++)
            if (a[i] < b[i]) return -1;
            else if (a[i] > b[i]) return 1;
        if (a.length < b.length) return -1;
        else if (a.length > b.length) return 1;
        else return 0;
    }

    function registerEvidence(
        string _caseId,
        string _description,
        string _fileHash,
        string _evidenceType,
        string _createdDateTime
    ) public {
        // require(
        //     msg.sender == cases[_caseId].firstParty || msg.sender == cases[_caseId].secondParty,
        //     "You must be either of parties to register an evidence"
        // );
        Evidence memory newEvidence = Evidence({
            description: _description,
            fileHash: _fileHash,
            owner: msg.sender,
            evidenceType: _evidenceType,
            createdDateTime: _createdDateTime,
            timestamp: now
        });
        cases[_caseId].evidences[cases[_caseId].totalEvidences] = newEvidence;
        cases[_caseId].totalEvidences = cases[_caseId].totalEvidences + 1;
    }

    function getCaseById(
        string caseId
    ) public view returns (string, string, string, uint, string, string) {
        // // require(cases[caseId].initialised, "No such case exists!");
        Case memory reqcase = cases[caseId];
        return (
            reqcase.courtId,
            reqcase.caseDescription,
            reqcase.startDateTime,
            reqcase.totalEvidences,
            reqcase.firstParty,
            reqcase.secondParty
        );
    }

    function getEvidenceCount(
        string caseId
    ) public view returns (uint) {
        return cases[caseId].totalEvidences;
    }

    function getEvidenceById(
        string caseId,
        uint evidenceId
    ) public view returns (string, uint, string, string, string, string) {
        Evidence memory evd = cases[caseId].evidences[evidenceId];
        return (
            caseId,
            evidenceId,
            evd.description,
            evd.fileHash,
            evd.evidenceType,
            evd.createdDateTime
        );
    }

    // function registerDetective() public returns (address) {
    //     players.push(msg.sender);
    //     return detective;
    // }

    // function registerForensic() public returns (address) {
    //     players.push(msg.sender);
    //     return forensic;
    // }

    // function getEvidence(uint _id) public view returns(string, uint, string, address, uint) {
    //     Evidence memory evd = evds[_id];
    //     return (
    //         evd.description,
    //         evd.caseNumber,
    //         evd.hash,
    //         evd.owner,
    //         evd.timestamp
    //     );
    // }

}
