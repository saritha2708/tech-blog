const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#typeEmailX').value.trim();
    const password = document.querySelector('#typePasswordX').value.trim();

    if (!email || !password){
        alert('Please provide email and password');
        return;
    }
  
    try{
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      alert(err);
    }
  };
  
  
  
  document
    .querySelector('#loginBtn')
    .addEventListener('click', loginFormHandler);
  

  