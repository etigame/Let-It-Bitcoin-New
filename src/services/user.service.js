import { storageService } from './storage.service'
import { utilService } from './util.service'

export const userService = {
    // getUser,
    signup,
    getLoggedInUser,
    addMove,
    getEmptyUser
}

const LOGGEDIN_USER_KEY = 'loggedInUser'

// const user = {
//     name: 'Etika',
//     coins: 9462,
//     moves: []
// }

// function getUser() {
//     return user
// }

function signup(user) {
    storageService.store(LOGGEDIN_USER_KEY, user)
}

function getEmptyUser() {
    return {
        name: '',
        coins: 100,
        moves: []
    }
}

function getLoggedInUser() {
    return storageService.load(LOGGEDIN_USER_KEY)
}

function addMove(contact, amount) {
    const loggedInUser = getLoggedInUser()
    let {moves} = loggedInUser
    const currMove = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount: +amount,
        _id: utilService.makeId()
    }
    moves.unshift(currMove)
    loggedInUser.coins -= amount

    storageService.store(LOGGEDIN_USER_KEY, loggedInUser)

    return loggedInUser
}