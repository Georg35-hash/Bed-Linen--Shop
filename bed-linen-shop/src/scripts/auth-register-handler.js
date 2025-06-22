export async function register() {
  const form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          login: data.login,
          email: data.email,
          password: data.password,
          repPassword: data.repPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Registration successful!');
      } else {
        alert(result.error || 'Registration failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  });
}

export async function login() {
  const form = document.getElementById('loginForm');
  if (!form) {
    console.error('loginForm not found in DOM');
    return;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Sending login data:', {
      email: data.email,
      password: data.password,
    });

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Login successful');
        localStorage.setItem('token', result.token);
        if (result.userId) {
          localStorage.setItem('userId', result.userId);
        } else {
          console.warn('User ID not received from server');
        }

        window.location.href = '/src/pages/homeEN.html';
      } else {
        alert(result.error || 'Login failed');
      }
    } catch (err) {
      alert('Error connecting to server');
    }
  });
}
