import { userService } from '../../services/user.service'

export function getLoggedInUser() {
  return async (dispatch) => {
    try {
      const loggedInUser = await userService.getLoggedInUser()
      dispatch({ type: 'GET_LOGGED_IN_USER', loggedInUser })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function signup(user) {
  return async (dispatch) => {
    try {
      await userService.signup(user)
      const loggedInUser = getLoggedInUser()
      dispatch({ type: 'SET_LOGGED_IN_USER', loggedInUser })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addMove(contact, amount) {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.addMove(contact, amount)
      dispatch({type: 'SET_LOGGED_IN_USER', loggedInUser: updatedUser})
    } catch (err) {
      console.log('err:', err)
    }
  }
}
