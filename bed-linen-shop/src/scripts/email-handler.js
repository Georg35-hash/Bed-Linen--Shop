import axios from 'axios';
export function sendContactForm() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const email = e.target.email.value.trim();

      if (!email) {
        alert('❗ Email is required');
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:3000/api/email',
          { email },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        alert('✅ Letter is sended!');
        form.reset();
      } catch (error) {
        console.error(
          '❌ Error sending contact form:',
          error?.response || error,
        );
        alert(
          error?.response?.data?.message ||
            '❌ An error occurred while sending.',
        );
      }
    });
  });
}
