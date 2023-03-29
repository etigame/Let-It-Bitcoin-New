import { contactService } from '../../services/contact.service'

export function loadContacts() {
  return async (dispatch, getState) => {
    try {
      const filterBy = getState().contactModule.filterBy
      const contacts = await contactService.getContacts(filterBy)
      dispatch({ type: 'LOAD_CONTACTS', contacts })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function getContactById(id) {
  return async (dispatch) => {
    try {
      const contact = await contactService.getContactById(id)
      dispatch({type: 'LOAD_CONTACT', contact})
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function saveContact(contact) {
  return async (dispatch) => {
    try {
      if (contact._id) {
        const savedContact = await contactService.updateContact(contact)
        dispatch({type: 'UPDATE_CONTACT', savedContact})
      } else {
        const savedContact = await contactService.addContact(contact)
        dispatch({type: 'ADD_CONTACT', savedContact})
      } 
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removeContact(contactId) {
  return async (dispatch) => {
    try {
      await contactService.deleteContact(contactId)
      dispatch({ type: 'REMOVE_CONTACT', contactId })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  // this func is not async because it's only a change in the store
  return (dispatch) => {
    try {
      dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
