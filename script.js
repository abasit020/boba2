const bookButton = document.getElementById('book-consultation');
const contactSection = document.getElementById('contact');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';

if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
  window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

bookButton.addEventListener('click', () => {
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const service = formData.get('service');
  const message = formData.get('message');

  if (!window.emailjs) {
    formStatus.textContent = 'Email service is unavailable right now. Please try again shortly.';
    return;
  }

  if (
    EMAILJS_PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY' ||
    EMAILJS_SERVICE_ID === 'YOUR_EMAILJS_SERVICE_ID' ||
    EMAILJS_TEMPLATE_ID === 'YOUR_EMAILJS_TEMPLATE_ID'
  ) {
    formStatus.textContent = 'Please configure EmailJS keys in script.js before sending messages.';
    return;
  }

  formStatus.textContent = 'Sending your consultation request...';

  try {
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: name,
      from_email: email,
      legal_service: service,
      message
    });

    formStatus.textContent = `Thank you, ${name}. Your ${service} consultation request has been sent successfully.`;
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = 'Unable to send your request right now. Please try again shortly.';
  }
});
