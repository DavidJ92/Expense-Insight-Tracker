//logging in
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const emailLogin = document.querySelector('#email-login').value.trim();
    const passLogin = document.querySelector('#password-login').value.trim();
  
    if (emailLogin && passLogin) {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ emailLogin, passLogin }),
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Please try again.');
      }
    }
  };
  
  //signing up
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const userSignup = document.querySelector('#username-signup').value.trim();
    const emailSignup = document.querySelector('#email-signup').value.trim();
    const passSignup = document.querySelector('#password-signup').value.trim();
  
    if (userSignup && emailSignup && passSignup) {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ userSignup, emailSignup, passSignup }),
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };
  
  //listening on click
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  