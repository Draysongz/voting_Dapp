import React from 'react'
import Styles from     '../../styles/Nav.module.css'
import { ethers } from 'ethers';
import {useState} from 'react'
import {toast} from 'react-toastify'


const  Navbar = () => {
  const [connected, setConnected] = useState(false)
  const[userAddress, setUserAddress] = useState('')

   // a function to connect wallet
   const handleConnectMetamask = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      // chainId of the connected network
      const chainId = await signer.getChainId()
    // we have a conditional block here that says if the user chainID isn't equal to that of the the Mumbai Network
    if (chainId !== "0x13881") {
      try {
        // make a request to change the connected chain
        await provider.send("wallet_switchEthereumChain", [
          { chainId: `0x13881` },
        ]);
      } catch (error) {
        // catcch error block
        console.error("Error requesting account switch:", error);
        return;
      }
    }

    toast.success('Wallet connected')
    // a constant to get address
    const address = await signer.getAddress();
    // use the slice method to truncate address
    const truncatedAddress = address.slice(0, 4) + ".." + address.slice(-2);
    // set signer
    setConnected(signer);
    // set connected address
    setUserAddress(truncatedAddress);
  } catch (error) {
    
    console.log("Error Connecting: ", error);
    toast.error(error)
  }
  };
  return (
    <div>
      <ul className={Styles.navContainer}>
        <li><a href='/' className={Styles.logo}><span className={Styles.vote}>Vote</span>Xpress</a></li>
        <button className={Styles.connectBtn} onClick={handleConnectMetamask}>{ connected ? userAddress : "Connect Wallet"}</button>
      </ul>
    </div>
  )
}

export default Navbar       