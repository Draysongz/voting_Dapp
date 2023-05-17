import React from 'react'
import Styles from     '../../styles/Voting.module.css'
import Image from "next/image";
import Research from "./assets/research.jpeg";
import Operation from "./assets/operation.jpeg";
import ContractABI from "./ContractABI";
import { ethers } from "ethers";
import { useState } from "react";
import {toast} from 'react-toastify'

const votingForm = () => {

  const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
  const [value, setValue] = useState("");

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    console.log(inputValue);
  };

  const winningCandidate = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const votingContract = new ethers.Contract(
        contractAddress,
        ContractABI,
        signer
      );
      const winningName = await votingContract.winningName();
      const convertByte = ethers.utils.parseBytes32String(winningName);

      console.log(convertByte);
      toast(convertByte + " Project Is Leading");
    } catch (error) {
      console.log("Error Message: ", error.data);
      toast.error("Error Message: ", error.data)
    }
  };
  const voteCandidate = async (event) => {
    event.preventDefault();
    await handleInput(event);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const getCode = await provider.getCode(contractAddress);
      console.log(getCode);
      console.log(address);
      let receipt;
      const votingContract = new ethers.Contract(
        contractAddress,
        ContractABI,
        signer
      );
      const voterInfo = await votingContract.voters(address)
      const hasVoted = voterInfo.anyVotes; // Update this line
      console.log(hasVoted);
      console.log(voterInfo);
  
      if (hasVoted) {
        console.log("Already voted");
        toast.error('Already voted');
      } else {
        // Process the vote
        console.log("Voting...");
        toast.promise('Voting...');
      }
  
      // Proceed with voting
      const transaction = await votingContract.vote(value);
  
      receipt = await wait(transaction);
  
      console.log("Vote submitted successfully!");
      toast.success("Vote Successful");
    } catch (error) {
      toast.error(error);
      console.log("Failed, reason: ", error);
    }
  };
  

  return (
    <div className={Styles.votingCon}>
      <h2 className={Styles.voteCaption}>Vote Now</h2>
      <div className={Styles.voteContainer}>
        <div className={Styles.operational}>
        <h3 className={Styles.res}>Operational Expenses</h3>
          <Image
              src={Operation}
              alt="Placeholder image"
              className="rounded-lg mb-4"
              width={310}
            />
            <p className={Styles.d}>
            Operational Expenses play a critical role in the  day-to-day
            functioning of our company.<br/> Voting on Operational Expenses
            proposals enables members to make decisions.<br></br>
            </p>
            <button className={Styles.Btn} onClick={voteCandidate} value='0'>Vote</button>
        </div>

        <div className={Styles.research}>
          <h3 className={Styles.res}>Research Projects</h3>
          <Image
              src={Research}
              alt="Placeholder image"
              className={Styles.resImage}
              
              width={310}
            />
            <p className={Styles.d}>With Research Projects, we aim to foster<br/> innovation and 
            explore new frontiers. Members can vote on proposals  that focus on
            groundbreaking research initiatives, </p>
            <button className={Styles.voteBtn} value='1' onClick={voteCandidate}>Vote</button>
        </div>
      </div>
    </div>
  )
}

export default votingForm
