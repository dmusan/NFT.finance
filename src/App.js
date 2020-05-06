import React, { Component } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './components/layout/navbar/Navbar'
import HomePage from './components/layout/home/HomePage'
import NewOrderPage from './components/layout/neworder/NewOrderPage'
import MyOrdersPage from './components/layout/myorders/MyOrdersPage'
import AllOrdersPage from './components/layout/allorders/AllOrdersPage'


class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/neworder' component={NewOrderPage} />
          <Route path='/myorders' component={MyOrdersPage} />
          <Route path='/allorders' component={AllOrdersPage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
