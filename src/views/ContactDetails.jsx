import { Component } from 'react'
import { contactService } from '../services/contact.service'
import { bitcoinService } from '../services/bitcoin.service'
import { Link } from 'react-router-dom'
import { TransferFund } from '../cmps/TransferFund'
import { MoveList } from '../cmps/MoveList'
import { userService } from '../services/user.service'
import { Loader } from '../cmps/Loader'

export class ContactDetails extends Component {
  state = {
    contact: null,
    movesToContact: null,
    btcRate: null,
    loggedInUser: null
  }

  componentDidMount() {
    this.loadLoggedInUser()
    this.loadContact()
    this.loadMovesToContact()
    this.loadBtcRate()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadContact()
    }
  }

  loadContact = async () => {
    try {
      const contact = await contactService.getContactById(this.props.match.params.id)
      this.setState({ contact })
    } catch (err) {
      console.log('err:', err)
    }
  }

  loadLoggedInUser (){
      const loggedInUser = userService.getLoggedInUser()
      if (loggedInUser) this.setState({ loggedInUser })
  }

  loadMovesToContact = async () => {
    const { moves } = await userService.getLoggedInUser()
    const movesToContact = moves.filter(
      (move) => move.toId === this.props.match.params.id
    )
    this.setState({ movesToContact })
  }

  onTransferCoins = (amount) => {
    const updatedUser = userService.addMove(this.state.contact, amount)
    this.setState({ loggedInUser: updatedUser })
    this.props.history.push('/contact')
  }

  loadBtcRate = async () => {
    try {
      const btcRate = await bitcoinService.getRate()
      this.setState({ btcRate })
    } catch (err) {
      console.log('err:', err)
    }
  }

  onBack = () => {
    this.props.history.push('/contact')
  }

  render() {
    const { contact, movesToContact, loggedInUser, btcRate } = this.state
    if (!contact || !movesToContact || !loggedInUser) return <Loader />

    return (
      <section className="main-container full">
        <section className="contact-details flex column align-center">
          <button onClick={this.onBack} className="back-btn">
            <img
              src="https://res.cloudinary.com/dja6gjgcd/image/upload/v1672254148/samples/let%20it%20bitcoin/icons8-back-arrow-50_e7h93h.png"
              alt="btn-back"
            />
          </button>

          <img src={contact.imgUrl} alt="contact-img" className="contact-img" />
          <h1>{contact.name}</h1>
          <p>{contact.phone}</p>
          <p>{contact.email}</p>

          <Link to={`/contact/edit/${contact._id}`} className="btn-edit">
            Edit
          </Link>

          <TransferFund
            contact={contact}
            maxCoins={loggedInUser.coins}
            onTransferCoins={this.onTransferCoins}
          />

          <MoveList
            title={'Moves history'}
            moves={movesToContact}
            location={'details'}
            btcRate={btcRate}
          />
        </section>
      </section>
    )
  }
}
