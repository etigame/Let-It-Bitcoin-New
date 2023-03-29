const INITIAL_STATE = {
  loggedInUser: null,
}

export function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET_LOGGED_IN_USER':
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      }
    case 'SET_LOGGED_IN_USER':
      return {
        ...state,
        loggedInUser: action.loggedInUser,
      }
    default:
      return state
  }
}
