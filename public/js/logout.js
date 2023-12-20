// logging out
const logoutHandler = async (event) => {
  event.preventDefault();

  const logout = document.querySelector('#logout'); // Move the declaration here

  if (logout) {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('Failed to log out. Please try again.');
    }
  }
};

document.querySelector('#logout').addEventListener('click', logout);