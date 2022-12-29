import { Component } from 'react'
import { Loader } from '../cmps/Loader'
import { userService } from '../services/user.service'

export class Signup extends Component {
  state = {
    user: userService.getEmptyUser(),
  }

  onSignup = async (ev) => {
    ev.preventDefault()
    try {
      await userService.signup({ ...this.state.user })
      this.props.history.push('/')
    } catch (err) {
      console.log('err:', err)
    }
  }

  handleChange = ({ target }) => {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }

    this.setState((prevState) => ({
      user: { ...prevState.user, [field]: value },
    }))
  }

  handleRef = (elInput) => {
    elInput?.focus()
  }

  render() {
    const { user } = this.state
    if (!user) return <Loader />
    const { name } = user

    return (
      <section className="main-container full">
        <section className="signup flex column align-center">
          <img
            src="https://res.cloudinary.com/dja6gjgcd/image/upload/v1672175602/samples/higherr/logo_jlshrs.png"
            alt="logo-img"
          />
          <h1>Welcome</h1>
          <form onSubmit={this.onSignup} className='flex column align-center'>
            <label htmlFor="name">Please enter your name</label>
            <input
              onChange={this.handleChange}
              value={name}
              type="text"
              ref={this.handleRef}
              name="name"
              id="name"
            />

            <button className='signup-btn'>Let It</button>
          </form>
        </section>
      </section>
    )
  }
}
