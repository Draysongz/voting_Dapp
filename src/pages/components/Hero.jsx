import React from 'react'
import Styles from     '../../styles/Hero.module.css'
import HeroImage from "./assets/removalai.png";
import Image from 'next/image'

const Hero = () => {
  
  return (
    <div className={Styles.Hero}>
        <div className={Styles.left}>
            <h2 className={Styles.title}><span className={Styles.welcome}>Welcome to VoteXpress </span>- Empowering Democracy < br/>
            Through Secure and Transparent Voting</h2>
            <p className={Styles.des}>VoteXpress is a cutting-edge decentralized application (DApp) that revolutionizes the way
            <br/>we participate in democratic processes. With our secure and transparent platform, we aim <br/>
            to bring integrity, efficiency, and accessibility to the voting experience.</p>

           
        </div>

         <div className={Styles.right}>
         <Image
            src={HeroImage}
            alt="Placeholder image"
            width={450}
            height={450}
            className={Styles.heroImage}
          />
        </div>
    </div>
  )
}

export default Hero