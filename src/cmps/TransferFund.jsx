import { Component } from 'react'

export class TransferFund extends Component {
  state = {
    amount: '',
  }

  onTransfer = (ev) => {
    ev.preventDefault()
    const { amount } = this.state
    const { maxCoins } = this.props
    if (amount > maxCoins || amount < 1) return
    this.props.onTransferCoins(amount)
    this.setState({ amount: '' })
  }

  handleChange = ({ target }) => {
    let field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value || ''
        break
      case 'checkbox':
        value = target.checked
        break
      default:
        break
    }

    this.setState({ [field]: value })
  }

  handleRef = (elInput) => {
    elInput?.focus()
  }

  render() {
    const { amount } = this.state
    // if (!amount) return <div>Loading...</div>

    return (
      <section className="transfer-fund">
        <form onSubmit={this.onTransfer}>
          <input
            onChange={this.handleChange}
            value={amount}
            type="text"
            ref={this.handleRef}
            name="amount"
            id="amount"
            placeholder="Amount"
          />

          <button className="btn-transfer bold">Transfer</button>
        </form>
      </section>
    )
  }
}
