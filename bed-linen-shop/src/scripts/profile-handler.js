import { userData } from './api/user-api';

export function displayProfilePic(event) {
  const input = event.target;
  const image = document.getElementById('profilePic');

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = event => {
      const base64Image = event.target.result;
      image.src = base64Image;
      image.style.display = 'block';
      localStorage.setItem('profileImage', base64Image);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
export function displayUserData() {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');

  if (!userId) {
    document.getElementById('errorMessage').textContent =
      'User ID is missing in URL';
    return;
  }

  userData(userId)
    .then(response => {
      const user = response.data;

      if (!user || !user.email || !user._id) {
        throw new Error('User data is incomplete');
      }
      const container = document.getElementById('profile');
      container.innerHTML = `
          <span><strong>Login:</strong> <input value="${user.login}" id="loginInput"/></span>
          <span><strong>Email:</strong> <input value="${user.email}" id="emailInput"/></span>
      `;
    })
    .catch(err => {
      document.getElementById('errorMessage').textContent = err.message;
    });
}
export async function handleFormSubmit(event) {
  event.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const userId = params.get('id');

  const updatedLogin = document.getElementById('loginInput').value;
  const updatedEmail = document.getElementById('emailInput').value;

  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: updatedLogin, email: updatedEmail }),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Failed to update user');
    }

    alert('Changes saved successfully');
  } catch (err) {
    document.getElementById('errorMessage').textContent = err.message;
  }
}
