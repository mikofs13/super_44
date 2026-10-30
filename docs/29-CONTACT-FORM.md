# Contact form setup and operation

30 October 2026. The owner requested a form for work and collaboration enquiries delivered to their email. The portfolio remains a Next.js static export: no server route, database, email API key or account password was added.

`src/components/ContactForm.tsx` renders a native HTML POST form to FormSubmit using `contact.email` from `src/content/profile.json`. It collects name, reply email, optional project/opportunity subject, and message. The fixed email subject identifies Super 44 enquiries; the visitor's email enables replies. Required inputs, email format and length limits use browser validation. FormSubmit handles the hosted spam check and submission result, without an in-page claim that email was delivered. A honeypot is present and the provider's default CAPTCHA is retained. The original direct email link remains available.

The form has no client component or submission script and works without JavaScript. It loads no third-party script before submission. On Send enquiry, the browser navigates to FormSubmit. The form discloses that the service processes the entered details and links to its privacy policy. Native Back normally returns to the form; if the service is unavailable, visitors can use the visible email link instead. Provider availability and inbox delivery are external dependencies.

## Required owner activation

1. Open `/contact/` on the deployed website (or HTTP localhost preview).
2. Submit a real test enquiry using an email address you control. Complete the provider's spam check yourself.
3. Check **michaelfeleke13@gmail.com**, including Spam, for FormSubmit's activation message. Confirm it yourself; the site cannot verify ownership of your inbox.
4. Submit another test and confirm that you receive it and can Reply to the sender. Test again from the published site before considering email delivery ready.

No real test message was sent and no inbox activation was performed during implementation. Until you activate the form, delivery is not verified or ready to claim as operational. FormSubmit documents holding submissions pending activation; do not rely on that instead of completing this setup. [Activation help](https://formsubmit.co/help).

The service's default result page handles confirmation, so no deployment URL needs to be hardcoded. If changing recipients in `profile.json`, rebuild and repeat activation for the new address. Do not place SMTP passwords or API secrets in JSON or browser code. Moving to another service later requires updating the action and re-verifying native submission and privacy text.

## Verification boundaries

Browser tests intercept all FormSubmit POSTs with synthetic responses. They verify validation, destination, posted field names, fallback link, no CAPTCHA-disabling flag, responsive layout, automated accessibility and submission without JavaScript. They never contact the email provider or prove inbox delivery. See [verification report](verification/REPORT.md).

References: [FormSubmit documentation](https://formsubmit.co/documentation), [activation FAQ](https://formsubmit.co/help), [privacy policy](https://formsubmit.co/privacy.pdf).
