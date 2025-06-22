import axios from 'axios';
export function sendContactForm() {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async e => {
      e.preventDefault();

      const email = e.target.email.value.trim();

      if (!email) {
        alert('❗ Email обовʼязковий');
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

        alert('✅ Пошта успішно відправлена!');
        form.reset();
      } catch (error) {
        console.error(
          '❌ Fehler beim Senden des Kontaktformulars:',
          error?.response || error,
        );
        alert(
          error?.response?.data?.message ||
            '❌ Сталася помилка під час надсилання.',
        );
      }
    });
  });
}
