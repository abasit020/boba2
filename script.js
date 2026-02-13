const bookButton = document.getElementById('book-consultation');
const contactSection = document.getElementById('contact');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const EMAILJS_PUBLIC_KEY = 'I3x2xybaTL0jcZifD';
const EMAILJS_SERVICE_ID = 'service_qfwyh2p';
const EMAILJS_TEMPLATE_ID = 'template_u84quor';

const submitButton = contactForm.querySelector('button[type="submit"]');

if (window.emailjs) {
  window.emailjs.init(EMAILJS_PUBLIC_KEY);
}

bookButton.addEventListener('click', () => {
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!window.emailjs) {
    formStatus.textContent = 'Email service is unavailable right now. Please try again shortly.';
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get('from_name');
  const service = formData.get('legal_service');

  formStatus.textContent = 'Sending your consultation request...';
  submitButton.disabled = true;

  try {
    await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
    formStatus.textContent = `Thank you, ${name}. Your ${service} consultation request has been sent successfully.`;
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = 'Unable to send your request right now. Please try again shortly.';
  } finally {
    submitButton.disabled = false;
  }
});
