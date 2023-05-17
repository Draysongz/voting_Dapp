import Head from 'next/head'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import VotingForm from './components/VotingForm.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {



  return (
    <>
    <ToastContainer/>
        <Navbar/>
        <Hero/>
        <VotingForm/>
    </>
  )
}
