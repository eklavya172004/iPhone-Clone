// import './App.css'
import Features from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Honkai from './components/Honkai';
import ModelSelect from './components/ModelSelect'
import Navbar from './components/Navbar'
import * as Sentry from '@sentry/react';

function App() {
  
  return (
  <main className='bg-black'>
      <Navbar/>
      <Hero/>
      <Highlights/>
      <ModelSelect/>
      <Features/>
      <Honkai/>
      <Footer/>
  </main>
  )
}

export default Sentry.withProfiler(App);
