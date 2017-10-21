import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import Scanner from './components/Scanner'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/scanner' component={Scanner} />
  </Switch>
)

export default Routes