const apiUrl = 'http://localhost:3000/users';

// Fungsi untuk Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch(apiUrl);
  const users = await response.json();

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Login successful!');
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid username or password.');
  }
});

// Fungsi untuk Register
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  const newUser = { username, password, role };

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });

  alert('Registration successful! Please login.');
  window.location.href = 'login.html';
});

// Fungsi untuk Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  alert('Logged out successfully.');
  window.location.href = 'login.html';
});

// Cek Status Login (Opsional, untuk proteksi halaman)
const checkLogin = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    alert('You must be logged in to access this page.');
    window.location.href = 'login.html';
  }
};
