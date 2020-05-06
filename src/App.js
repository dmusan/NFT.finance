import React, { Component } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import Navbar from './components/layout/navbar/Navbar'
import HomePage from './components/layout/home/HomePage'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <HomePage />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
