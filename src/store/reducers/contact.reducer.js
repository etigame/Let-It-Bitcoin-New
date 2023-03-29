const INITIAL_STATE = {
  contacts: null,
  displayedContact: null,
  filterBy: {
    term: ''
  },
}

export function contactReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOAD_CONTACTS':
      return {
        ...state,
        contacts: action.contacts,
      }
      
    case 'LOAD_CONTACT': 
    return {
      ...state,
      displayedContact: action.contact
    }
    
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.savedContact],
      }
    case 'REMOVE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact._id !== action.contactId),
      }
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact => contact._id === action.savedContact._id ? action.savedContact : contact),
      }
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: {...action.filterBy},
      }

    default:
      return state
  }
}
