import { Component } from 'react'
import { Loader } from '../cmps/Loader'
import { MoveList } from '../cmps/MoveList'
// import { bitcoinService } from '../services/bitcoin.service'
import { getLoggedInUser } from '../store/actions/user.actions'
import { connect } from 'react-redux'

class _Home extends Component {
  // state = {
  //   btcRate: null,
  // }

  componentDidMount() {
    this.props.getLoggedInUser()
    // this.loadBtcRate()
  }

  // loadBtcRate = async () => {
  //   try {
  //     const btcRate = await bitcoinService.getRate()
  //     this.setState({ btcRate })
  //   } catch (err) {
  //     console.log('err:', err)
  //   }
  // }

  render() {
    const { loggedInUser, btcRate } = this.props
    if (!loggedInUser || !btcRate) return <Loader />

    const { name, coins } = loggedInUser
    const dollarUSLocale = Intl.NumberFormat('en-US')
    const usd = dollarUSLocale.format(coins / btcRate)

    return (
      <section className="main-container full">
        <section className="home grid">
          <section className="user-info">
            <h1>Hello, {name}</h1>
            <p className='light'>Current Balance</p>
            <p className='regular'>BIT: <span className='light btc'>&#8383; {coins}</span></p>
            <p>USD: <span className='light'>$ {usd}</span></p>
            <p>BTC Rate: <span className='light'>{btcRate}</span></p>
          </section>

          <section className="move-list-container">
            <MoveList
              title={'Your last moves'}
              moves={loggedInUser.moves}
              location={'home'}
              btcRate={btcRate}
            />
          </section>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser,
  btcRate: state.bitcoinModule.btcRate
})

const mapDispatchToProps = {
  getLoggedInUser
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)