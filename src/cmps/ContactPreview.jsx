import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
  return (
    <section className="contact-preview">
      <Link to={`/contact/${contact._id}`}>
        <section className="contact-preview-content">
          <img src={contact.imgUrl} alt="contact-img" />
          <section className="contact-details-container grid">
            <span className='regular'>{contact.name}</span>
            <span className='light'>{contact.phone}</span>
          </section>
        </section>
      </Link>
    </section>
  )
}
