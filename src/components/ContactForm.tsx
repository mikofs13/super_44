import styles from '@/app/page.module.css';

export default function ContactForm({ email }: { email: string }) {
  return <form className={styles.contactForm} action={`https://formsubmit.co/${encodeURIComponent(email)}`} method="POST" aria-label="Work with me" aria-describedby="contact-delivery">
    <input type="hidden" name="_subject" value="Super 44 — New collaboration enquiry"/>
    <input type="hidden" name="_template" value="table"/>
    <div className={styles.contactHoney} aria-hidden="true"><label>Leave this field empty<input type="text" name="_honey" tabIndex={-1} autoComplete="off"/></label></div>
    <div className={styles.contactFields}>
      <div><label htmlFor="contact-name">Your name <span>(required)</span></label><input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Your name"/></div>
      <div><label htmlFor="contact-email">Email address <span>(required)</span></label><input id="contact-email" type="email" name="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/></div>
    </div>
    <div><label htmlFor="contact-subject">Project or opportunity <span>(optional)</span></label><input id="contact-subject" name="subject" maxLength={160} placeholder="What would you like to work on?"/></div>
    <div><label htmlFor="contact-message">Your message <span>(required)</span></label><textarea id="contact-message" name="message" required minLength={20} maxLength={5000} rows={6} placeholder="Tell me about your project, what you need, and how we could work together." aria-describedby="contact-message-hint"/><p id="contact-message-hint" className={styles.contactHint}>20–5,000 characters. Include a timeline if you have one.</p></div>
    <div className={styles.contactSend}><button className="button" type="submit">Send enquiry <span aria-hidden="true">↗</span></button><p id="contact-delivery" className={styles.contactHint}>Your details are sent through <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit<span className={styles.srOnly}> privacy policy (opens in a new tab)</span></a> to my inbox. Continue there to complete the spam check and see the submission result.</p></div>
  </form>;
}
