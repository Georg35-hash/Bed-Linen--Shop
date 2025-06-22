import '../src/mainProfile.scss';
import {
  displayProfilePic,
  handleFormSubmit,
  displayUserData,
} from './scripts/profile-handler';

document.addEventListener('DOMContentLoaded', () => {
  const savedImage = localStorage.getItem('profileImage');
  const image = document.getElementById('profilePic');
  if (savedImage && image) {
    image.src = savedImage;
    image.style.display = 'block';
  }

  const input = document.getElementById('photo');
  if (input) input.addEventListener('change', displayProfilePic);

  const form = document.getElementById('userForm');
  if (form) form.addEventListener('submit', handleFormSubmit);

  displayUserData();
});
