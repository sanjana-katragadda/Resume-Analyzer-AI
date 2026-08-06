function ContactCard({ contact }) {

    return (

        <div className="card">

            <h2>Contact Information</h2>

            <p><b>👤 Name:</b> {contact.name}</p>

            <p><b>📧 Email:</b> {contact.email}</p>

            <p><b>📱 Phone:</b> {contact.phone}</p>

        </div>

    );

}

export default ContactCard;