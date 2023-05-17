import React from 'react'
import Styles from     '../../styles/Voting.module.css'
import Image from "next/image";
import Research from "./assets/research.jpeg";
import Operation from "./assets/operation.jpeg";
import {ContractABI} from "./contractABI";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {toast} from 'react-toastify'

const votingForm = () => {

  const contractAddress = "0x256E05570B457F741a66Adf4197d5530255773e0";
  // const [value, setValue] = useState("");

  // // const handleInput = (event) => {
  // //   const inputValue = event.target.value;
  // //   setValue(inputValue);
  // //   console.log(value);
  // // };
  // useEffect(() => {
  //   console.log(value); // Verify that the value is updated
  // }, [value]);

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
  const voteCandidate = async (event, value) => {
    event.preventDefault();
    
    if (!value) {
      console.log('Please select a valid candidate.');
      toast.error('Please select a valid candidate.');
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      // const getCode = await provider.getCode(contractAddress);
      // console.log(getCode);
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
        toast.info('Voting...');
      }
  
      // Proceed with voting
      const transaction = await votingContract.vote(value);
  
      receipt = await transaction.wait()
  
      console.log("Vote submitted successfully!");
      toast.success("Vote Successful");
    } catch (error) {
      toast.error(error.reason);
      console.log("Failed, reason: ", error.reason || error.message);
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
            <button className={Styles.Btn} onClick={(event) => voteCandidate(event, '0')}>Vote</button>
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
            <button className={Styles.voteBtn} onClick={(event) => voteCandidate(event, '1')}>Vote</button>
        </div>
      </div>
    </div>
  )
}

export default votingForm
