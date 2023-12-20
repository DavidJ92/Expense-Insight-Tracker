// logging out
const logoutHandler = async (event) => {
  console.log('Logout button clicked');
  event.preventDefault();

  const logoutButton = document.querySelector('#logout'); // Move the declaration here

  if (logoutButton) {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log out. Please try again.');
    }
  }
};

// Add event listener after logoutHandler declaration
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('#logout');

  if (logoutButton) {
    logoutButton.addEventListener('click', logoutHandler);
  }
});