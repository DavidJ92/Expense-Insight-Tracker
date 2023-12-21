//logging out
const logout = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/logout', {
      method: 'POST',
    });
  
    if (response.ok) {
      document.location.replace('/logout');
    } else {
      alert('Failed to log out. Please try again.');
    }
  };

  //listening on click
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#logout').addEventListener('click', logout);
  })
  
  