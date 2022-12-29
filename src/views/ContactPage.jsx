import { Component } from 'react'
import { ContactList } from '../cmps/ContactList'
import { contactService } from '../services/contact.service'
import { ContactFilter } from '../cmps/ContactFilter'
import { Link } from 'react-router-dom'
import { Loader } from '../cmps/Loader'

export class ContactPage extends Component {
  state = {
    contacts: null,
    filterBy: {
      term: '',
    },
  }

  componentDidMount() {
    this.loadContacts()
  }

  loadContacts = async () => {
    try {
      const contacts = await contactService.getContacts(this.state.filterBy)
      this.setState({ contacts })
    } catch (err) {
      console.log('err:', err)
    }
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadContacts)
  }

  render() {
    const { contacts, filterBy } = this.state
    if (!contacts) return <Loader/>
    return (
      <section className="contact-page main-container full">
        <section className='top flex space-between'>
        <ContactFilter onChangeFilter={this.onChangeFilter} filterBy={filterBy} />
        <Link to="/contact/edit"><div className='add-contact'>Add contact</div></Link>
        </section>
        <ContactList contacts={contacts} />
      </section>
    )
  }
}
