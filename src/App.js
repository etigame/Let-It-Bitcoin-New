import { Component } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { userService } from './services/user.service'
import './assets/main.scss' 

import { Home } from './views/Home'
import { Signup } from './views/Signup'
import { ContactPage } from './views/ContactPage'
import { StatisticPage } from './views/StatisticPage'
import { AppHeader } from './cmps/AppHeader'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'
import { AppFooter } from './cmps/AppFooter'

function PrivateRoute(props) {
  const user = userService.getLoggedInUser()
    return user ? <Route {...props} /> : <Redirect to='/signup' />
}


export class App extends Component {

  render() {
    return (
      <Router>
      <div className="main-app main-container">
        <AppHeader/>
        <main className='full'>
          <Switch>
            <Route path="/contact/edit/:id?" component={ContactEdit}/>
            <Route path="/contact/:id" component={ContactDetails}/>
            <PrivateRoute path="/statistic" component={StatisticPage}/>
            <PrivateRoute path="/contact" component={ContactPage}/>
            <Route path="/signup" component={Signup}/>
            <PrivateRoute path="/" component={Home}/>
          </Switch>
        </main>
        <AppFooter />
      </div>
      </Router>
    )
  }
}
