import { NavLink, Link, withRouter } from 'react-router-dom'

function _AppHeader(props) {
  // function onBack() {
  //     props.history.goBack()
  // }

  return (
    <section className="app-header main-container full">
      <section className="flex space-between align-center">
        <div className="logo flex align-center">
          <Link to={'/'}>
            <img
              src="https://res.cloudinary.com/dja6gjgcd/image/upload/v1672175602/samples/higherr/logo_jlshrs.png"
              alt="logo-img"
            />
          </Link>
          <Link to={'/'}>
            <h1 className="bold">Let It Bitcoin</h1>
          </Link>
        </div>
        <nav className="app-nav">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/contact">Contacts</NavLink>
          <NavLink to="/statistic">Statistics</NavLink>
        </nav>
      </section>
    </section>
  )
}

export const AppHeader = withRouter(_AppHeader)
