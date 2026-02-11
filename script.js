const bookButton = document.getElementById('book-consultation');
const contactSection = document.getElementById('contact');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

bookButton.addEventListener('click', () => {
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const service = formData.get('service');

  formStatus.textContent = `Thank you, ${name}. Your ${service} consultation request has been received. Our legal team will contact you within 24 hours.`;
  contactForm.reset();
});
