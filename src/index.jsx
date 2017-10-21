import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles/index'
import Routes from './routes'

const App = () => (
  <div>
    <Routes />
  </div>
)

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)
