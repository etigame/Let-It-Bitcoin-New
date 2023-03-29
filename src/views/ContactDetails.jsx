import { Component } from 'react'
// import { contactService } from '../services/contact.service'
// import { bitcoinService } from '../services/bitcoin.service'
import { getLoggedInUser, addMove } from '../store/actions/user.actions'
import { getContactById } from '../store/actions/contact.actions'
import { Link } from 'react-router-dom'
import { TransferFund } from '../cmps/TransferFund'
import { MoveList } from '../cmps/MoveList'
// import { userService } from '../services/user.service'
import { Loader } from '../cmps/Loader'
import { connect } from 'react-redux'

class _ContactDetails extends Component {
  state = {
    movesToContact: null,
    // btcRate: null,
  }

  componentDidMount() {
    this.props.getLoggedInUser()
    this.props.getContactById(this.props.match.params.id)
    this.loadMovesToContact()
    // this.loadBtcRate()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getContactById(this.props.match.params.id)
    }
  }

  // loadContact = async () => {
  //   try {
  //     const contact = await contactService.getContactById(this.props.match.params.id)
  //     this.setState({ contact })
  //   } catch (err) {
  //     console.log('err:', err)
  //   }
  // }

  loadMovesToContact = async () => {
    try {
      // const { moves } = await userService.getLoggedInUser()
      const { moves } = await this.props.loggedInUser
      const movesToContact = moves.filter(
        (move) => move.toId === this.props.match.params.id
      )
      this.setState({ movesToContact })
    } catch (err) {
      console.log('err:', err);
    }
  }

  onTransferCoins = (amount) => {
    // const updatedUser = userService.addMove(this.state.contact, amount)
    // this.setState({ loggedInUser: updatedUser })
    this.props.addMove(this.props.displayedContact, amount)
    this.props.history.push('/contact')
  }

  // loadBtcRate = async () => {
  //   try {
  //     const btcRate = await bitcoinService.getRate()
  //     this.setState({ btcRate })
  //   } catch (err) {
  //     console.log('err:', err)
  //   }
  // }

  onBack = () => {
    this.props.history.push('/contact')
  }

  render() {
    const { movesToContact } = this.state
    const {loggedInUser, displayedContact, btcRate} = this.props
    if (!displayedContact || !movesToContact || !loggedInUser || !btcRate) return <Loader />

    return (
      <section className="main-container full">
        <section className="contact-details flex column align-center">
          <button onClick={this.onBack} className="back-btn">
            <img
              src="https://res.cloudinary.com/dja6gjgcd/image/upload/v1672254148/samples/let%20it%20bitcoin/icons8-back-arrow-50_e7h93h.png"
              alt="btn-back"
            />
          </button>

          <img src={displayedContact.imgUrl} alt="contact-img" className="contact-img" />
          <h1>{displayedContact.name}</h1>
          <p>{displayedContact.phone}</p>
          <p>{displayedContact.email}</p>

          <Link to={`/contact/edit/${displayedContact._id}`} className="btn-edit">
            Edit
          </Link>

          <TransferFund
            contact={displayedContact}
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

const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser,
  displayedContact: state.contactModule.displayedContact,
  btcRate: state.bitcoinModule.btcRate
})

const mapDispatchToProps = {
  getLoggedInUser,
  addMove,
  getContactById
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)