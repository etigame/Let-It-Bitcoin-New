import { Component } from 'react'
import { ContactList } from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { loadContacts, setFilterBy } from '../store/actions/contact.actions'
import { Link } from 'react-router-dom'
import { Loader } from '../cmps/Loader'
import { connect } from 'react-redux'

class _ContactPage extends Component {

  componentDidMount() {
    this.props.loadContacts()
  }

  // loadContacts = async () => {
  //   try {
  //     const contacts = await contactService.getContacts(this.props.filterBy)
  //     this.props.dispatch({ type: 'LOAD_CONTACTS', contacts })
  //   } catch (err) {
  //     console.log('err:', err)
  //   }
  // }

  onChangeFilter = (filterBy) => {
    this.props.setFilterBy(filterBy)
    this.props.loadContacts()
    // this.setState({ filterBy }, this.loadContacts)
  }

  render() {
    const { contacts, filterBy } = this.props
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

const mapStateToProps = state => ({
  contacts: state.contactModule.contacts,
  filterBy: state.contactModule.filterBy
})

const mapDispatchToProps = {
  loadContacts,
  setFilterBy
}

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage)