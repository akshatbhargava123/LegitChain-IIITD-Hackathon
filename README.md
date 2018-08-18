# ***Legit Chain***

Legit Chain is the trustworthy, decentralized way to store evidence, forensic information, and legal records that leaves a major social impact on how people trust the govt officials and making things accessible for them.

### Steps to start
- npm install
- ipfs daemon
- ganachi-cli -p 7545
-npm start

## <u>Problem Statement</u>

<p>
In Courts, lot of evidences are tampered in a way or another due to which innocent lives are sued. When someone submit an evidence to the court (may it be a document, video or audio), the evidence is submitted to police after submission of the same. The parties and the court have to trust all the middle parties that come in between the process of <i>approval</i> to <i>submission</i> of the evidence.
</p>

## <u>Our Solution</u>
We propose a solution where all the evidences submitted by a user are pushed to a immutable blockchain based database with a very simple and elegant user interface where user just uploads all the details of the evidence like its image, name, creation date, description and type and we handle all the things behind the scenes (uploading the image to ipfs, signing the details user filled using his / her public key, making the actual transaction to blockchain via organisation's account by verifying the hash so that user doesn't have to pay for the ether via making a submission and the organisation does the payment for user's transaction via taking care of security issues like mutating user's filled information).

## <u>Technology Stack</u>
1. [Solidity](https://solidity.readthedocs.io/en/v0.4.24) for writing Smart Contract(s)
2. [React](https://reactjs.org) for frontend
3. [IPFS](https://ipfs.io/) for file storage
4. [NuCypher](https://www.nucypher.com/blockchain/) for Proxy Re-encryption of the file
5. [Truffle Framework](https://truffleframework.com/ganache) for easy development of smart contracts and deploying to blockchain
6. [Ganache](https://truffleframework.com/ganache) to provide local blockchain
7. [Web3JS](https://web3js.readthedocs.io/en/1.0/) as layer to contact blockchain via normal browser

## <u>Developers</u>
<p>
Team members: Sakshi, Akshat, Dhruv, Hemabh


<b>Sakshi</b>:
   Developed form and list to add and list evidences and the UI of portal to register case by govt. officials

<b>Akshat</b>:
   Developed some portion of Court Smart Contract and completed the Court Contract and work on centralised server

<b>Dhruv</b>:
   Integrated the backend to the UI developed by Sakshi and the register case thing after sakshi finishes that

<b>Hemabh</b>:
   Researched and validated idea, created README and presentation.    

</p>


TODO:

- NuCypher integration
- Dai Coin integration to make sure the currency remains stable for government
