document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');
  
    // 🔍 Basic form validation
    if (!username || !password) {
      message.textContent = 'Username and password are required.';
      message.style.color = 'red';
      return;
    }
  
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const result = await response.json();
  
      if (result.success) {
        message.textContent = result.message;
        message.style.color = 'green';
        // Optional: Redirect to dashboard
        // window.location.href = '/dashboard.html';
      } else {
        message.textContent = result.message;
        message.style.color = 'red';
      }
    } catch (err) {
      message.textContent = 'Something went wrong. Try again.';
      message.style.color = 'red';
    }
  });
  