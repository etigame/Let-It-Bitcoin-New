import { Component } from 'react'
import { Loader } from './Loader'

export class ContactFilter extends Component {
  state = {
    filterBy: null,
  }

  componentDidMount() {
    const { filterBy } = this.props
    this.setState({ filterBy: { ...filterBy } })
  }

  handleChange = ({ target }) => {
    const field = target.name
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

    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, term: value } }),
      () => this.props.onChangeFilter({ ...this.state.filterBy })
    )
  }

  handleRef = (elInput) => {
    elInput?.focus()
  }

  render() {
    const { filterBy } = this.state
    if (!filterBy) return <Loader/>

    const { term} = filterBy
    return (
      <form className="contact-filter">
        <section>
          <input
            value={term}
            onChange={this.handleChange}
            ref={this.handleRef}
            type="text"
            placeholder='Search'
          />
        </section>
      </form>
    )
  }
}
