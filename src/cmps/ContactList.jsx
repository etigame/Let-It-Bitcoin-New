import { ContactPreview } from './ContactPreview'

export function ContactList({contacts}) {
  return (
    <section className="contact-list">
      {contacts.map(contact => 
        <ContactPreview contact={contact} key={contact._id}/>
      )}
    </section>
  )
}
