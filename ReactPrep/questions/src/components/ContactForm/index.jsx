import submitForm from './submitForm';

const ContactForm = () => {
  return (
    <form
      onSubmit={submitForm}
      action='https://questions.greatfrontend.com/api/questions/contact-form'
      method="post"
    >
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required></textarea>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

export default ContactForm;
