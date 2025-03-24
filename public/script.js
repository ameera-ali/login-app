document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    const result = await response.json();
    const message = document.getElementById('message');
    if (result.success) {
      message.textContent = result.message;
      message.style.color = 'green';
    } else {
      message.textContent = result.message;
      message.style.color = 'red';
    }
  });
  