import React, { Component } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import Navbar from './components/layout/navbar/Navbar'


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className="App">

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
