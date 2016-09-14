import React  from 'react'
import ReactDOM  from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'

// Views
import Admin from './components/shared/Admin'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

// Routes
// <Route path="/users" component={Uses}/>
// <Route path="/users/:userId" component={UserDetails}/>

var routes = (
  <Router history={browserHistory}>
    <Route path="sign-in" component={SignIn}/>

    <Route component={Admin}>
      <Route path="/" component={Dashboard}/>
    </Route>

    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'))