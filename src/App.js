import { Component } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { getLoggedInUser } from './store/actions/user.actions'
import { getRate } from './store/actions/bitcoin.actions'
import { connect } from 'react-redux'
import './assets/main.scss'

import { Home } from './views/Home'
import { Signup } from './views/Signup'
import { ContactPage } from './views/ContactPage'
import { StatisticPage } from './views/StatisticPage'
import { AppHeader } from './cmps/AppHeader'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'
import { AppFooter } from './cmps/AppFooter'
import { Loader } from './cmps/Loader'

class _PrivateRoute extends Component {
  render() {
    const { loggedInUser } = this.props

    return loggedInUser ? <Route {...this.props} /> : <Redirect to="/signup" />
  }
}

class _App extends Component {
    // I need this state key 'isLoadingUserData' to define cases when the user refreshes the app and the 'loggedInUser' is null for a moment (I want to prevent the router's redirection to the 'signup' component in this cases, in contrast to cases when 'loggedInUser' is null because the user hasn't sign up yet - in this case I do want redirection to the 'signup' component).
  state = {
    isLoadingUserData: true,
  }

  componentDidMount() {
    this.props.getLoggedInUser().finally(() => {
      this.setState({ isLoadingUserData: false })
    })
    this.props.getRate()
  }

  render() {
    const { isLoadingUserData } = this.state

    if (isLoadingUserData) return <Loader />

    return (
      <Router>
        <div className="main-app main-container">
          <AppHeader />
          <main className="full">
            <Switch>
              <Route path="/contact/edit/:id?" component={ContactEdit} />
              <Route path="/contact/:id" component={ContactDetails} />
              <PrivateRoute path="/statistic" component={StatisticPage} />
              <PrivateRoute path="/contact" component={ContactPage} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/" component={Home} />
            </Switch>
          </main>
          <AppFooter />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser,
})

const mapDispatchToProps = {
  getLoggedInUser,
  getRate
}

export const PrivateRoute = connect(mapStateToProps)(_PrivateRoute)
export const App = connect(null, mapDispatchToProps)(_App)