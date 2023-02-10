import './App.css';
import React, {useState} from 'react'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Details from './components/Details';
import { Route, Routes } from 'react-router-dom';
function App() {

  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Details/:id' element={<Details/>}/>
          <Route path='*' element={<Home getdata />}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
