import { Component } from 'react'
import { Loader } from '../cmps/Loader'
import { contactService } from '../services/contact.service'

export class ContactEdit extends Component {
  state = {
    contact: contactService.getEmptyContact(),
  }

  async componentDidMount() {
    const contactId = this.props.match.params.id
    if (contactId) {
      const contact = await contactService.getContactById(contactId)
      this.setState({ contact })
    }
  }

  onAddContact = async (ev) => {
    ev.preventDefault()
    try {
      await contactService.saveContact({ ...this.state.contact })
      this.props.history.push('/contact')
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
      contact: { ...prevState.contact, [field]: value },
    }))
  }

  onRemoveContact = async () => {
    try {
      await contactService.deleteContact(this.state.contact._id)
      this.props.history.push('/contact')
    } catch (err) {
      console.log('err:', err)
    }
  }

  onBack = () => {
    this.props.history.push(`/contact/${this.state.contact._id || ''}`)
  }

  handleRef = (elInput) => {
    elInput?.focus()
  }

  render() {
    const { contact } = this.state
    if (!contact) return <Loader />

    const { name, phone, email, imgUrl } = contact
    return (
      <section className="main-container full">
        <section className="contact-edit flex column align-center">
          <button onClick={this.onBack} className="back-btn">
            <img
              src="https://res.cloudinary.com/dja6gjgcd/image/upload/v1672254148/samples/let%20it%20bitcoin/icons8-back-arrow-50_e7h93h.png"
              alt="btn-back"
            />
          </button>

          <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
          <img src={imgUrl} alt="contact-img" className="contact-img" />
          <form onSubmit={this.onAddContact} className="flex column">
            <label htmlFor="name">Name</label>
            <input
              onChange={this.handleChange}
              value={name}
              ref={this.handleRef}
              type="text"
              name="name"
              id="name"
            />

            <label htmlFor="phone">Phone</label>
            <input
              onChange={this.handleChange}
              value={phone}
              type="text"
              name="phone"
              id="phone"
            />

            <label htmlFor="email">Email</label>
            <input
              onChange={this.handleChange}
              value={email}
              type="text"
              name="email"
              id="email"
            />

            <button className='btn-save'>Save</button>
          </form>

          {contact._id && (
            <button onClick={this.onRemoveContact} className='btn-delete'><img src="https://res.cloudinary.com/dja6gjgcd/image/upload/v1672258033/samples/let%20it%20bitcoin/icons8-trash-can-30_nd4deg.png" alt="delete-btn" /></button>
          )}
        </section>
      </section>
    )
  }
}
