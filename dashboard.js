const getUserRole = async () => {
  // Simulasi mendapatkan data user login (ganti dengan sistem autentikasi yang sebenarnya)
  const username = prompt("Enter username:");
  const password = prompt("Enter password:");

  const users = await fetch('http://localhost:3000/users').then(res => res.json());
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    return user.role;
  } else {
    alert('Invalid credentials!');
    return null;
  }
};

const renderAdminPage = () => {
  document.getElementById('dashboard-content').innerHTML = `
    <h3>Welcome, Admin</h3>
    <ul>
      <li><a href="admin.html">Manage Products</a></li>
      <li><a href="admin.html">Manage Categories</a></li>
      <li><a href="admin.html">Manage Suppliers</a></li>
      <li><a href="admin.html">View Transactions</a></li>
      <li><a href="admin.html">View Reports</a></li>
    </ul>
  `;
};

const renderKasirPage = () => {
  document.getElementById('dashboard-content').innerHTML = `
    <h3>Welcome, Kasir</h3>
    <ul>
      <li><a href="kasir.html">Process Transactions</a></li>
      <li><a href="kasir.html">View Daily Sales</a></li>
    </ul>
  `;
};

const renderOperatorPage = () => {
  document.getElementById('dashboard-content').innerHTML = `
    <h3>Welcome, Operator</h3>
    <ul>
      <li><a href="operator.html">Manage Stock</a></li>
      <li><a href="operator.html">Monitor Inventory</a></li>
    </ul>
  `;
};

document.addEventListener('DOMContentLoaded', async () => {
  const role = await getUserRole();

  if (role === 'admin') {
    renderAdminPage();
  } else if (role === 'kasir') {
    renderKasirPage();
  } else if (role === 'operator') {
    renderOperatorPage();
  } else {
    document.getElementById('dashboard-content').innerHTML = `
      <h3>Access Denied</h3>
      <p>You do not have permission to access this page.</p>
    `;
  }
});
