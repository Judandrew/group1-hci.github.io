// Warehouse IOMS - Application Logic

// ==================== DATA ====================
let products = [
  { id: 1, sku: 'SKU-4821', name: 'Wireless Keyboard', category: 'Electronics', qty: 145, location: 'Zone A-12', status: 'In Stock', supplier: 'TechParts Inc.' },
  { id: 2, sku: 'SKU-2190', name: 'Wireless Mouse', category: 'Electronics', qty: 8, location: 'Zone A-14', status: 'Low Stock', supplier: 'TechParts Inc.' },
  { id: 3, sku: 'SKU-3301', name: 'USB-C Hub', category: 'Electronics', qty: 62, location: 'Zone B-03', status: 'In Stock', supplier: 'Global Supply Co.' },
  { id: 4, sku: 'SKU-1105', name: 'A4 Paper Ream', category: 'Office Supplies', qty: 320, location: 'Zone C-01', status: 'In Stock', supplier: 'Office Essentials Ltd.' },
  { id: 5, sku: 'SKU-7782', name: 'Ergonomic Chair', category: 'Furniture', qty: 12, location: 'Zone D-08', status: 'In Stock', supplier: 'Global Supply Co.' },
  { id: 6, sku: 'SKU-9910', name: 'LED Desk Lamp', category: 'Office Supplies', qty: 0, location: 'Zone C-05', status: 'Out of Stock', supplier: 'Office Essentials Ltd.' },
  { id: 7, sku: 'SKU-5540', name: 'Screwdriver Set', category: 'Tools', qty: 5, location: 'Zone E-02', status: 'Low Stock', supplier: 'TechParts Inc.' },
  { id: 8, sku: 'SKU-6621', name: 'Monitor Stand', category: 'Furniture', qty: 28, location: 'Zone D-11', status: 'In Stock', supplier: 'Global Supply Co.' },
];

let orders = [
  { id: 1, number: 'ORD-1098', customer: 'Acme Corp', items: 4, priority: 'High', status: 'Pending', created: '2026-09-25', itemsList: [
    { sku: 'SKU-4821', name: 'Wireless Keyboard', required: 10, available: 145, location: 'Zone A-12', picked: false },
    { sku: 'SKU-2190', name: 'Wireless Mouse', required: 15, available: 8, location: 'Zone A-14', picked: false },
    { sku: 'SKU-3301', name: 'USB-C Hub', required: 5, available: 62, location: 'Zone B-03', picked: false },
    { sku: 'SKU-1105', name: 'A4 Paper Ream', required: 20, available: 320, location: 'Zone C-01', picked: false },
  ]},
  { id: 2, number: 'ORD-1097', customer: 'Beta Industries', items: 2, priority: 'Normal', status: 'Picking', created: '2026-09-24', itemsList: [
    { sku: 'SKU-7782', name: 'Ergonomic Chair', required: 3, available: 12, location: 'Zone D-08', picked: true },
    { sku: 'SKU-6621', name: 'Monitor Stand', required: 3, available: 28, location: 'Zone D-11', picked: false },
  ]},
  { id: 3, number: 'ORD-1096', customer: 'Gamma Ltd', items: 3, priority: 'High', status: 'Ready', created: '2026-09-24', itemsList: [] },
  { id: 4, number: 'ORD-1095', customer: 'Delta Co', items: 5, priority: 'Normal', status: 'Completed', created: '2026-09-23', itemsList: [] },
  { id: 5, number: 'ORD-1094', customer: 'Echo Partners', items: 1, priority: 'Low', status: 'Pending', created: '2026-09-23', itemsList: [
    { sku: 'SKU-5540', name: 'Screwdriver Set', required: 2, available: 5, location: 'Zone E-02', picked: false },
  ]},
  { id: 6, number: 'ORD-1093', customer: 'Foxtrot Inc', items: 2, priority: 'Normal', status: 'Pending', created: '2026-09-22', itemsList: [] },
  { id: 7, number: 'ORD-1092', customer: 'Golf Services', items: 4, priority: 'High', status: 'Completed', created: '2026-09-21', itemsList: [] },
];

let movements = [
  { date: '2026-09-26 10:15', product: 'Wireless Keyboard (SKU-4821)', type: 'Received', qty: 120, prev: 25, new: 145, user: 'Totoy Bato' },
  { date: '2026-09-26 09:40', product: 'Wireless Mouse (SKU-2190)', type: 'Released', qty: -12, prev: 20, new: 8, user: 'Sam Picker' },
  { date: '2026-09-25 16:20', product: 'USB-C Hub (SKU-3301)', type: 'Transferred', qty: -15, prev: 77, new: 62, user: 'Totoy Bato' },
  { date: '2026-09-25 14:05', product: 'A4 Paper Ream (SKU-1105)', type: 'Received', qty: 100, prev: 220, new: 320, user: 'Totoy Bato' },
  { date: '2026-09-25 11:30', product: 'LED Desk Lamp (SKU-9910)', type: 'Adjusted', qty: -3, prev: 3, new: 0, user: 'Totoy Bato' },
  { date: '2026-09-24 15:45', product: 'Ergonomic Chair (SKU-7782)', type: 'Released', qty: -4, prev: 16, new: 12, user: 'Sam Picker' },
  { date: '2026-09-24 10:10', product: 'Monitor Stand (SKU-6621)', type: 'Received', qty: 20, prev: 8, new: 28, user: 'Totoy Bato' },
];

let notifications = [
  { id: 1, type: 'lowstock', title: 'Low stock: Wireless Mouse', msg: 'Only 8 units remaining (SKU-2190)', time: '6 hours ago', read: false },
  { id: 2, type: 'order', title: 'New pending order', msg: 'ORD-1098 from Acme Corp needs attention', time: '4 hours ago', read: false },
  { id: 3, type: 'delivery', title: 'Incoming delivery', msg: 'PO-8831 from TechParts Inc. arriving today', time: '2 hours ago', read: false },
  { id: 4, type: 'complete', title: 'Order completed', msg: 'ORD-1092 marked as completed', time: '3 hours ago', read: true },
  { id: 5, type: 'adjust', title: 'Stock adjustment', msg: 'LED Desk Lamp quantity adjusted to 0', time: '1 day ago', read: true },
];

// Current logged-in user
let currentUser = {
  name: 'Totoy Bato',
  email: 'totoybato@gmail.com',
  role: 'Warehouse Supervisor',
  employeeId: 'EMP-1042',
  department: 'Warehouse Operations',
  phone: '+63 917 555 0142',
  joined: 'March 12, 2025',
  lastLogin: new Date().toLocaleString()
};


let incomingDeliveries = [
  { id: 1, po: 'PO-8831', supplier: 'TechParts Inc.', productId: 2, productName: 'Wireless Mouse (SKU-2190)', qty: 50, expected: '2026-09-26', status: 'Arriving Today' },
  { id: 2, po: 'PO-8840', supplier: 'Global Supply Co.', productId: 3, productName: 'USB-C Hub (SKU-3301)', qty: 80, expected: '2026-09-27', status: 'Scheduled' },
  { id: 3, po: 'PO-8845', supplier: 'Office Essentials Ltd.', productId: 6, productName: 'LED Desk Lamp (SKU-9910)', qty: 40, expected: '2026-09-26', status: 'Arriving Today' },
  { id: 4, po: 'PO-8850', supplier: 'TechParts Inc.', productId: 7, productName: 'Screwdriver Set (SKU-5540)', qty: 25, expected: '2026-09-28', status: 'Scheduled' },
];

let currentProductId = null;
let currentOrderId = null;
let recvData = {};

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });
  document.getElementById('recv-date').valueAsDate = new Date();
  populateRecvProducts();
  renderInventory();
  renderOrders();
  renderMovements();
  renderNotifications();
  renderIncoming();
  updateDashboardIncoming();
  updateUserUI();
});

// ==================== AUTH ====================
function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value;
  if (!user || !pass) {
    showLoginError('Please fill in all required fields.');
    return false;
  }
  // Accept pre-filled or any non-empty
  if (user === 'totoybato@gmail.com' || user.toLowerCase().includes('totoy')) {
    currentUser.name = 'Totoy Bato';
    currentUser.email = 'totoybato@gmail.com';
  } else {
    currentUser.name = user.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Totoy Bato';
    currentUser.email = user.includes('@') ? user : user + '@warehouse.com';
  }
  currentUser.lastLogin = new Date().toLocaleString();
  document.getElementById('view-login').classList.add('hidden');
  document.getElementById('view-app').classList.remove('hidden');
  updateUserUI();
  showToast('Welcome back, ' + currentUser.name + '!', 'success');
  showView('dashboard');
  return false;
}

function showLoginError(msg) {
  const el = document.getElementById('login-error');
  document.getElementById('login-error-msg').textContent = msg;
  el.classList.remove('hidden');
}

function handleLogout() {
  if (confirm('Are you sure you want to log out?')) {
    document.getElementById('view-app').classList.add('hidden');
    document.getElementById('view-login').classList.remove('hidden');
    document.getElementById('login-error').classList.add('hidden');
    closeProfilePanel();
    showToast('You have been logged out.', 'info');
  }
}

function updateUserUI() {
  const nameEls = document.querySelectorAll('#user-name, #profile-name');
  nameEls.forEach(el => { if (el) el.textContent = currentUser.name; });
  const emailEl = document.getElementById('profile-email');
  if (emailEl) emailEl.textContent = currentUser.email;
  const roleEl = document.getElementById('profile-role');
  if (roleEl) roleEl.textContent = currentUser.role;
  const empEl = document.getElementById('profile-empid');
  if (empEl) empEl.textContent = currentUser.employeeId;
  const deptEl = document.getElementById('profile-dept');
  if (deptEl) deptEl.textContent = currentUser.department;
  const phoneEl = document.getElementById('profile-phone');
  if (phoneEl) phoneEl.textContent = currentUser.phone;
  const joinedEl = document.getElementById('profile-joined');
  if (joinedEl) joinedEl.textContent = currentUser.joined;
  const lastEl = document.getElementById('profile-lastlogin');
  if (lastEl) lastEl.textContent = currentUser.lastLogin;
  // Avatar initials
  const initials = currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  document.querySelectorAll('.user-initials').forEach(el => { el.textContent = initials; });
}

// ==================== PROFILE / USER MANAGEMENT ====================
function toggleProfilePanel() {
  const panel = document.getElementById('profile-panel');
  panel.classList.toggle('hidden');
}

function closeProfilePanel() {
  document.getElementById('profile-panel')?.classList.add('hidden');
}

function openUserManagement() {
  closeProfilePanel();
  showView('user-management');
}

// ==================== NAVIGATION ====================
function showView(view) {
  ['dashboard','inventory','product-detail','receiving','orders','order-detail','movements','reports','user-management'].forEach(v => {
    document.getElementById('page-' + v)?.classList.add('hidden');
  });
  document.getElementById('page-' + view)?.classList.remove('hidden');
  if (view === 'receiving') renderIncoming();
  if (view === 'dashboard') updateDashboardIncoming();

  document.querySelectorAll('.sidebar-link').forEach(a => {
    a.classList.remove('active');
    if (a.dataset.view === view ||
        (view === 'product-detail' && a.dataset.view === 'inventory') ||
        (view === 'order-detail' && a.dataset.view === 'orders') ||
        (view === 'user-management' && a.dataset.view === 'user')) {
      a.classList.add('active');
    }
  });

  const titles = {
    dashboard: ['Dashboard', 'Warehouse overview and key metrics'],
    inventory: ['Inventory Management', 'View, search, and manage products'],
    'product-detail': ['Product Details', 'Detailed product information'],
    receiving: ['Receiving Management', 'Record incoming goods'],
    orders: ['Order / Picking Management', 'Manage and fulfill customer orders'],
    'order-detail': ['Order Details & Picking', 'Pick items and update order status'],
    movements: ['Stock Movement & Tracking', 'History of all inventory movements'],
    reports: ['Reports & Notifications', 'Alerts, reports, and warehouse insights'],
    'user-management': ['User Management', 'Your profile and account settings']
  };
  if (titles[view]) {
    document.getElementById('page-title').textContent = titles[view][0];
    document.getElementById('page-subtitle').textContent = titles[view][1];
  }
  closeProfilePanel();
}

// ==================== TOAST ====================
function showToast(msg, type = 'info') {
  const colors = { success: 'bg-success-600', error: 'bg-danger-600', info: 'bg-primary-600', warning: 'bg-warning-600' };
  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
  const toast = document.createElement('div');
  toast.className = `toast ${colors[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm min-w-[240px]`;
  toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${msg}`;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==================== INVENTORY ====================
function getStatusBadge(status) {
  const map = {
    'In Stock': 'bg-success-500/15 text-success-500',
    'Low Stock': 'bg-warning-500/15 text-warning-500',
    'Out of Stock': 'bg-danger-500/15 text-danger-500'
  };
  return `<span class="status-badge ${map[status] || 'bg-dark-700 text-gray-400'}">${status}</span>`;
}

function renderInventory(list = products) {
  const tbody = document.getElementById('inventory-tbody');
  tbody.innerHTML = list.map(p => `
    <tr class="table-row">
      <td class="px-5 py-3 font-mono text-xs text-gray-400">${p.sku}</td>
      <td class="px-5 py-3 font-medium text-gray-200">${p.name}</td>
      <td class="px-5 py-3 text-gray-500">${p.category}</td>
      <td class="px-5 py-3 text-right font-medium text-gray-200">${p.qty}</td>
      <td class="px-5 py-3 text-gray-400">${p.location}</td>
      <td class="px-5 py-3">${getStatusBadge(p.status)}</td>
      <td class="px-5 py-3 text-gray-500">${p.supplier}</td>
      <td class="px-5 py-3 text-right">
        <button onclick="viewProduct(${p.id})" class="text-primary-400 hover:underline text-xs mr-2">View</button>
        <button onclick="openEditProduct(${p.id})" class="text-gray-500 hover:underline text-xs">Edit</button>
      </td>
    </tr>
  `).join('');
}

function filterInventory() {
  const q = document.getElementById('inv-search').value.toLowerCase();
  const status = document.getElementById('inv-status-filter').value;
  let list = products.filter(p =>
    (p.sku.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
    (!status || p.status === status)
  );
  renderInventory(list);
}

function filterLowStock() {
  document.getElementById('inv-status-filter').value = 'Low Stock';
  filterInventory();
}

function viewProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentProductId = id;
  document.getElementById('pd-name').textContent = p.name;
  document.getElementById('pd-sku').textContent = p.sku;
  document.getElementById('pd-qty').textContent = p.qty;
  document.getElementById('pd-location').textContent = p.location;
  document.getElementById('pd-status').innerHTML = getStatusBadge(p.status);
  document.getElementById('pd-category').textContent = p.category;
  document.getElementById('pd-supplier').textContent = p.supplier;
  showView('product-detail');
}

function openAddProduct() {
  document.getElementById('modal-product-title').textContent = 'Add Product';
  document.getElementById('product-form').reset();
  document.getElementById('prod-id').value = '';
  document.getElementById('modal-product').classList.remove('hidden');
}

function openEditProduct(id) {
  id = id || currentProductId;
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modal-product-title').textContent = 'Edit Product';
  document.getElementById('prod-id').value = p.id;
  document.getElementById('prod-sku').value = p.sku;
  document.getElementById('prod-name').value = p.name;
  document.getElementById('prod-category').value = p.category;
  document.getElementById('prod-qty').value = p.qty;
  document.getElementById('prod-location').value = p.location;
  document.getElementById('prod-supplier').value = p.supplier;
  document.getElementById('modal-product').classList.remove('hidden');
}

function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('prod-id').value;
  const data = {
    sku: document.getElementById('prod-sku').value,
    name: document.getElementById('prod-name').value,
    category: document.getElementById('prod-category').value,
    qty: parseInt(document.getElementById('prod-qty').value),
    location: document.getElementById('prod-location').value,
    supplier: document.getElementById('prod-supplier').value,
  };
  data.status = data.qty === 0 ? 'Out of Stock' : data.qty < 15 ? 'Low Stock' : 'In Stock';

  if (id) {
    const idx = products.findIndex(p => p.id == id);
    const prev = products[idx];
    const prevQty = prev.qty;
    products[idx] = { ...prev, ...data };
    // Record stock adjustment if quantity changed
    if (data.qty !== prevQty) {
      const diff = data.qty - prevQty;
      movements.unshift({
        date: new Date().toLocaleString('en-CA', { hour12: false }).replace(',', ''),
        product: `${data.name} (${data.sku})`,
        type: 'Adjusted',
        qty: diff,
        prev: prevQty,
        new: data.qty,
        user: currentUser.name
      });
      renderMovements();
    }
    showToast('Product updated successfully', 'success');
    if (currentProductId == id) viewProduct(parseInt(id));
  } else {
    data.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(data);
    // New product starting stock as Received-style initial adjustment
    if (data.qty > 0) {
      movements.unshift({
        date: new Date().toLocaleString('en-CA', { hour12: false }).replace(',', ''),
        product: `${data.name} (${data.sku})`,
        type: 'Adjusted',
        qty: data.qty,
        prev: 0,
        new: data.qty,
        user: currentUser.name
      });
      renderMovements();
    }
    showToast('Product added successfully', 'success');
  }
  closeModal('modal-product');
  renderInventory();
  populateRecvProducts();
  return false;
}

function confirmDeleteProduct() {
  document.getElementById('modal-confirm').classList.remove('hidden');
}

function deleteProduct() {
  products = products.filter(p => p.id !== currentProductId);
  closeModal('modal-confirm');
  showToast('Product deleted', 'success');
  showView('inventory');
  renderInventory();
}

// ==================== RECEIVING ====================
function populateRecvProducts() {
  const sel = document.getElementById('recv-product');
  sel.innerHTML = '<option value="">Select product...</option>' +
    products.map(p => `<option value="${p.id}">${p.name} (${p.sku})</option>`).join('');
}

function goToRecvReview(e) {
  e.preventDefault();
  const productId = document.getElementById('recv-product').value;
  const product = products.find(p => p.id == productId);
  recvData = {
    supplier: document.getElementById('recv-supplier').value,
    delivery: document.getElementById('recv-delivery').value,
    productId,
    productName: product ? `${product.name} (${product.sku})` : '',
    qty: document.getElementById('recv-qty').value,
    date: document.getElementById('recv-date').value,
    condition: document.getElementById('recv-condition').value,
  };
  document.getElementById('rev-supplier').textContent = recvData.supplier;
  document.getElementById('rev-delivery').textContent = recvData.delivery;
  document.getElementById('rev-product').textContent = recvData.productName;
  document.getElementById('rev-qty').textContent = recvData.qty;
  document.getElementById('rev-date').textContent = recvData.date;
  document.getElementById('rev-condition').textContent = recvData.condition;

  document.getElementById('recv-step1').classList.add('hidden');
  document.getElementById('recv-step2').classList.remove('hidden');
  updateRecvSteps(2);
  return false;
}

function backToRecvForm() {
  document.getElementById('recv-step2').classList.add('hidden');
  document.getElementById('recv-step1').classList.remove('hidden');
  updateRecvSteps(1);
}

function confirmReceiving() {
  const p = products.find(x => x.id == recvData.productId);
  if (p) {
    const prev = p.qty;
    p.qty += parseInt(recvData.qty);
    p.status = p.qty === 0 ? 'Out of Stock' : p.qty < 15 ? 'Low Stock' : 'In Stock';
    movements.unshift({
      date: new Date().toLocaleString('en-CA', { hour12: false }).replace(',', ''),
      product: `${p.name} (${p.sku})`,
      type: 'Received',
      qty: parseInt(recvData.qty),
      prev,
      new: p.qty,
      user: currentUser.name
    });
  }
  document.getElementById('recv-step2').classList.add('hidden');
  document.getElementById('recv-step3').classList.remove('hidden');
  updateRecvSteps(3);
  renderInventory();
  renderMovements();
  showToast('Goods received and inventory updated', 'success');
}

function resetRecvForm() {
  document.getElementById('recv-form').reset();
  document.getElementById('recv-date').valueAsDate = new Date();
  document.getElementById('recv-step1').classList.remove('hidden');
  document.getElementById('recv-step2').classList.add('hidden');
  document.getElementById('recv-step3').classList.add('hidden');
  updateRecvSteps(1);
}

function updateRecvSteps(step) {
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('step-' + i);
    if (i <= step) {
      el.className = 'w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-medium';
    } else {
      el.className = 'w-8 h-8 rounded-full bg-dark-700 text-gray-500 flex items-center justify-center text-sm font-medium';
    }
  }
}

// ==================== ORDERS ====================
function getOrderStatusBadge(status) {
  const map = {
    Pending: 'bg-warning-500/15 text-warning-500',
    Picking: 'bg-primary-600/20 text-primary-400',
    Ready: 'bg-success-500/15 text-success-500',
    Completed: 'bg-dark-700 text-gray-400'
  };
  return `<span class="status-badge ${map[status]}">${status}</span>`;
}

function getPriorityBadge(p) {
  const map = { High: 'bg-danger-500/15 text-danger-500', Normal: 'bg-dark-700 text-gray-400', Low: 'bg-primary-600/20 text-primary-400' };
  return `<span class="status-badge ${map[p]}">${p}</span>`;
}

function renderOrders(list = orders) {
  const tbody = document.getElementById('orders-tbody');
  tbody.innerHTML = list.map(o => `
    <tr class="table-row">
      <td class="px-5 py-3 font-medium text-gray-200">${o.number}</td>
      <td class="px-5 py-3 text-gray-300">${o.customer}</td>
      <td class="px-5 py-3 text-gray-400">${o.items} items</td>
      <td class="px-5 py-3">${getPriorityBadge(o.priority)}</td>
      <td class="px-5 py-3">${getOrderStatusBadge(o.status)}</td>
      <td class="px-5 py-3 text-gray-500">${o.created}</td>
      <td class="px-5 py-3 text-right">
        <button onclick="viewOrder(${o.id})" class="text-primary-400 hover:underline text-xs">View / Pick</button>
      </td>
    </tr>
  `).join('');
}

function filterOrders(status) {
  document.querySelectorAll('.order-filter-btn').forEach(b => {
    b.classList.remove('active', 'bg-primary-600/20', 'text-primary-400');
    b.classList.add('text-gray-400');
    if (b.dataset.filter === status) {
      b.classList.add('active', 'bg-primary-600/20', 'text-primary-400');
      b.classList.remove('text-gray-400');
    }
  });
  const list = status === 'all' ? orders : orders.filter(o => o.status === status);
  renderOrders(list);
}

function viewOrder(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  currentOrderId = id;
  document.getElementById('od-number').textContent = o.number;
  document.getElementById('od-customer').textContent = o.customer;
  document.getElementById('od-status-badge').innerHTML = getOrderStatusBadge(o.status);

  const steps = ['Pending', 'Picking', 'Ready', 'Completed'];
  const idx = steps.indexOf(o.status);
  ['pending','picking','ready','completed'].forEach((s, i) => {
    const el = document.getElementById('prog-' + s);
    if (i <= idx) {
      el.className = 'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-primary-600 text-white';
    } else {
      el.className = 'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-dark-700 text-gray-500';
    }
  });

  const tbody = document.getElementById('od-items-tbody');
  if (o.itemsList && o.itemsList.length) {
    tbody.innerHTML = o.itemsList.map((item, i) => {
      const insufficient = item.available < item.required;
      return `
        <tr class="${insufficient ? 'bg-danger-500/10' : ''}">
          <td class="px-4 py-2 font-mono text-xs text-gray-400">${item.sku}</td>
          <td class="px-4 py-2 text-gray-200">${item.name}</td>
          <td class="px-4 py-2 text-right text-gray-300">${item.required}</td>
          <td class="px-4 py-2 text-right ${insufficient ? 'text-danger-500 font-medium' : 'text-gray-300'}">${item.available}${insufficient ? ' ⚠' : ''}</td>
          <td class="px-4 py-2 text-gray-400">${item.location}</td>
          <td class="px-4 py-2 text-center">
            <input type="checkbox" ${item.picked ? 'checked' : ''} ${o.status === 'Completed' || o.status === 'Ready' ? 'disabled' : ''}
                   onchange="togglePicked(${i})" class="w-4 h-4 text-primary-600 rounded bg-dark-800 border-dark-600" />
          </td>
        </tr>
      `;
    }).join('');
  } else {
    tbody.innerHTML = '<tr><td colspan="6" class="px-4 py-6 text-center text-gray-500">No item details available for this order</td></tr>';
  }

  document.getElementById('btn-start-picking').classList.toggle('hidden', o.status !== 'Pending');
  document.getElementById('btn-complete-order').classList.toggle('hidden', o.status !== 'Picking' && o.status !== 'Ready');

  showView('order-detail');
}

function togglePicked(idx) {
  const o = orders.find(x => x.id === currentOrderId);
  if (o && o.itemsList[idx]) {
    o.itemsList[idx].picked = !o.itemsList[idx].picked;
  }
}

function startPicking() {
  const o = orders.find(x => x.id === currentOrderId);
  if (o) {
    o.status = 'Picking';
    showToast('Picking started for ' + o.number, 'info');
    viewOrder(currentOrderId);
    renderOrders();
  }
}

function completeOrder() {
  const o = orders.find(x => x.id === currentOrderId);
  if (!o) return;
  if (o.itemsList && o.itemsList.length) {
    const allPicked = o.itemsList.every(i => i.picked);
    if (!allPicked) {
      showToast('Please mark all items as picked before completing', 'warning');
      return;
    }
    o.itemsList.forEach(item => {
      const p = products.find(x => x.sku === item.sku);
      if (p) {
        const prev = p.qty;
        p.qty = Math.max(0, p.qty - item.required);
        p.status = p.qty === 0 ? 'Out of Stock' : p.qty < 15 ? 'Low Stock' : 'In Stock';
        movements.unshift({
          date: new Date().toLocaleString('en-CA', { hour12: false }).replace(',', ''),
          product: `${p.name} (${p.sku})`,
          type: 'Released',
          qty: -item.required,
          prev,
          new: p.qty,
          user: currentUser.name
        });
      }
    });
  }
  o.status = 'Completed';
  showToast(o.number + ' completed successfully', 'success');
  viewOrder(currentOrderId);
  renderOrders();
  renderInventory();
  renderMovements();
}

// ==================== MOVEMENTS ====================
function renderMovements(list = movements) {
  const tbody = document.getElementById('movements-tbody');
  tbody.innerHTML = list.map(m => {
    const qtyClass = m.qty > 0 ? 'text-success-500' : 'text-danger-500';
    const typeClass = {
      Received: 'bg-success-500/15 text-success-500',
      Released: 'bg-danger-500/15 text-danger-500',
      Transferred: 'bg-primary-600/20 text-primary-400',
      Adjusted: 'bg-warning-500/15 text-warning-500'
    }[m.type] || 'bg-dark-700 text-gray-400';
    return `
      <tr class="table-row">
        <td class="px-5 py-3 text-gray-500 text-xs">${m.date}</td>
        <td class="px-5 py-3 font-medium text-gray-200">${m.product}</td>
        <td class="px-5 py-3"><span class="status-badge ${typeClass}">${m.type}</span></td>
        <td class="px-5 py-3 text-right font-medium ${qtyClass}">${m.qty > 0 ? '+' : ''}${m.qty}</td>
        <td class="px-5 py-3 text-right text-gray-400">${m.prev}</td>
        <td class="px-5 py-3 text-right font-medium text-gray-200">${m.new}</td>
        <td class="px-5 py-3 text-gray-500">${m.user}</td>
      </tr>
    `;
  }).join('');
}

function filterMovements() {
  const q = document.getElementById('mov-search').value.toLowerCase();
  const type = document.getElementById('mov-type-filter').value;
  let list = movements.filter(m =>
    m.product.toLowerCase().includes(q) && (!type || m.type === type)
  );
  renderMovements(list);
}

// ==================== NOTIFICATIONS ====================
function renderNotifications() {
  const iconMap = {
    lowstock: 'fa-exclamation-triangle text-warning-500',
    order: 'fa-clipboard-list text-primary-400',
    delivery: 'fa-truck text-success-500',
    complete: 'fa-check-circle text-success-500',
    adjust: 'fa-sliders-h text-gray-500'
  };
  const renderList = (containerId) => {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = notifications.map(n => `
      <div class="px-4 py-3 hover:bg-dark-800 cursor-pointer ${n.read ? '' : 'bg-primary-600/10'}" onclick="markRead(${n.id})">
        <div class="flex gap-3">
          <i class="fas ${iconMap[n.type] || 'fa-bell'} mt-0.5"></i>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium ${n.read ? 'text-gray-400' : 'text-gray-200'}">${n.title}</p>
            <p class="text-xs text-gray-500 truncate">${n.msg}</p>
            <p class="text-xs text-gray-600 mt-0.5">${n.time}</p>
          </div>
          ${!n.read ? '<span class="w-2 h-2 bg-primary-500 rounded-full mt-1.5"></span>' : ''}
        </div>
      </div>
    `).join('');
  };
  renderList('notif-list');
  renderList('reports-notif-list');
  const unread = notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notif-badge');
  if (badge) {
    badge.textContent = unread;
    badge.classList.toggle('hidden', unread === 0);
  }
}

function toggleNotifications() {
  document.getElementById('notif-dropdown').classList.toggle('hidden');
  closeProfilePanel();
}

function markRead(id) {
  const n = notifications.find(x => x.id === id);
  if (!n) return;
  n.read = true;
  renderNotifications();
  // Navigate to the relevant module
  document.getElementById('notif-dropdown')?.classList.add('hidden');
  switch (n.type) {
    case 'lowstock':
      showView('inventory');
      filterLowStock();
      break;
    case 'order':
      showView('orders');
      filterOrders('Pending');
      break;
    case 'delivery':
      showView('receiving');
      break;
    case 'complete':
      showView('orders');
      filterOrders('Completed');
      break;
    case 'adjust':
      showView('movements');
      break;
    default:
      showView('reports');
  }
}

function markAllRead() {
  notifications.forEach(n => n.read = true);
  renderNotifications();
  showToast('All notifications marked as read', 'info');
}

// ==================== REPORTS ====================
function showReport(type) {
  const preview = document.getElementById('report-preview');
  const title = document.getElementById('report-title');
  const content = document.getElementById('report-content');
  preview.classList.remove('hidden');

  if (type === 'inventory') {
    title.textContent = 'Inventory Report';
    content.innerHTML = `
      <table class="w-full">
        <thead class="bg-dark-800 text-gray-400"><tr>
          <th class="text-left px-3 py-2">SKU</th><th class="text-left px-3 py-2">Name</th>
          <th class="text-right px-3 py-2">Qty</th><th class="text-left px-3 py-2">Status</th>
        </tr></thead>
        <tbody class="divide-y divide-dark-700">${products.map(p => `<tr><td class="px-3 py-2 font-mono text-xs text-gray-400">${p.sku}</td><td class="px-3 py-2 text-gray-200">${p.name}</td><td class="px-3 py-2 text-right text-gray-300">${p.qty}</td><td class="px-3 py-2">${getStatusBadge(p.status)}</td></tr>`).join('')}</tbody>
      </table>`;
  } else if (type === 'lowstock') {
    title.textContent = 'Low-Stock Report';
    const low = products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock');
    content.innerHTML = low.length ? `
      <table class="w-full">
        <thead class="bg-dark-800 text-gray-400"><tr>
          <th class="text-left px-3 py-2">SKU</th><th class="text-left px-3 py-2">Name</th>
          <th class="text-right px-3 py-2">Qty</th><th class="text-left px-3 py-2">Status</th>
        </tr></thead>
        <tbody class="divide-y divide-dark-700">${low.map(p => `<tr><td class="px-3 py-2 font-mono text-xs text-gray-400">${p.sku}</td><td class="px-3 py-2 text-gray-200">${p.name}</td><td class="px-3 py-2 text-right font-medium text-warning-500">${p.qty}</td><td class="px-3 py-2">${getStatusBadge(p.status)}</td></tr>`).join('')}</tbody>
      </table>` : '<p class="text-gray-500">No low-stock items.</p>';
  } else if (type === 'movements') {
    title.textContent = 'Stock Movement Report (Last 7)';
    content.innerHTML = `
      <table class="w-full">
        <thead class="bg-dark-800 text-gray-400"><tr>
          <th class="text-left px-3 py-2">Date</th><th class="text-left px-3 py-2">Product</th>
          <th class="text-left px-3 py-2">Type</th><th class="text-right px-3 py-2">Qty</th>
        </tr></thead>
        <tbody class="divide-y divide-dark-700">${movements.slice(0,7).map(m => `<tr><td class="px-3 py-2 text-xs text-gray-500">${m.date}</td><td class="px-3 py-2 text-gray-200">${m.product}</td><td class="px-3 py-2 text-gray-400">${m.type}</td><td class="px-3 py-2 text-right ${m.qty>0?'text-success-500':'text-danger-500'}">${m.qty>0?'+':''}${m.qty}</td></tr>`).join('')}</tbody>
      </table>`;
  } else if (type === 'orders') {
    title.textContent = 'Order Report';
    content.innerHTML = `
      <table class="w-full">
        <thead class="bg-dark-800 text-gray-400"><tr>
          <th class="text-left px-3 py-2">Order</th><th class="text-left px-3 py-2">Customer</th>
          <th class="text-left px-3 py-2">Status</th><th class="text-left px-3 py-2">Date</th>
        </tr></thead>
        <tbody class="divide-y divide-dark-700">${orders.map(o => `<tr><td class="px-3 py-2 font-medium text-gray-200">${o.number}</td><td class="px-3 py-2 text-gray-300">${o.customer}</td><td class="px-3 py-2">${getOrderStatusBadge(o.status)}</td><td class="px-3 py-2 text-gray-500">${o.created}</td></tr>`).join('')}</tbody>
      </table>`;
  }
}



// ==================== TRANSFER STOCK ====================
function openTransferModal() {
  const p = products.find(x => x.id === currentProductId);
  if (!p) return;
  if (p.qty <= 0) {
    showToast('No stock available to transfer', 'warning');
    return;
  }
  document.getElementById('transfer-product-name').textContent = p.name + ' (' + p.sku + ')';
  document.getElementById('transfer-available').textContent = p.qty;
  document.getElementById('transfer-qty').value = '';
  document.getElementById('transfer-qty').max = p.qty;
  document.getElementById('transfer-location').value = '';
  document.getElementById('modal-transfer').classList.remove('hidden');
}

function submitTransfer(e) {
  e.preventDefault();
  const p = products.find(x => x.id === currentProductId);
  if (!p) return false;
  const qty = parseInt(document.getElementById('transfer-qty').value);
  const newLoc = document.getElementById('transfer-location').value.trim();
  if (!qty || qty < 1 || qty > p.qty) {
    showToast('Invalid quantity', 'error');
    return false;
  }
  if (!newLoc) {
    showToast('Please enter a new location', 'error');
    return false;
  }
  const prev = p.qty;
  // For prototype: transfer updates location and logs Transferred movement (qty stays same overall)
  // Record as transfer of that qty to new location
  p.location = newLoc;
  movements.unshift({
    date: new Date().toLocaleString('en-CA', { hour12: false }).replace(',', ''),
    product: `${p.name} (${p.sku})`,
    type: 'Transferred',
    qty: -qty,  // outgoing from old perspective; stock total unchanged
    prev: prev,
    new: prev,  // total stock same, location changed
    user: currentUser.name
  });
  // Note in toast
  closeModal('modal-transfer');
  viewProduct(p.id);
  renderInventory();
  renderMovements();
  showToast(`Transferred ${qty} units of ${p.name} to ${newLoc}`, 'success');
  return false;
}

// ==================== INCOMING DELIVERIES ====================
function renderIncoming() {
  const el = document.getElementById('incoming-list');
  if (!el) return;
  if (!incomingDeliveries.length) {
    el.innerHTML = '<p class="text-gray-500 text-sm p-4 text-center">No pending incoming deliveries.</p>';
    return;
  }
  el.innerHTML = incomingDeliveries.map(d => {
    const statusClass = d.status === 'Arriving Today' ? 'bg-primary-600/20 text-primary-400' : 'bg-dark-700 text-gray-400';
    return `
      <div class="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-dark-700 last:border-0 hover:bg-dark-800/50 transition">
        <div class="flex-1 min-w-[200px]">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-medium text-gray-200">${d.po}</span>
            <span class="status-badge ${statusClass}">${d.status}</span>
          </div>
          <p class="text-sm text-gray-400">${d.productName}</p>
          <p class="text-xs text-gray-500 mt-0.5">${d.supplier} · Qty: ${d.qty} · Expected: ${d.expected}</p>
        </div>
        <button onclick="markDeliveryArrived(${d.id})" class="px-4 py-2 bg-success-600 hover:bg-success-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 whitespace-nowrap">
          <i class="fas fa-check"></i> Mark as Arrived
        </button>
      </div>
    `;
  }).join('');
}

function markDeliveryArrived(id) {
  const d = incomingDeliveries.find(x => x.id === id);
  if (!d) return;
  if (!confirm(`Confirm receipt of ${d.po}?\n${d.productName} — Qty: ${d.qty}\nThis will add stock to inventory.`)) return;

  const p = products.find(x => x.id === d.productId);
  if (p) {
    const prev = p.qty;
    p.qty += d.qty;
    p.status = p.qty === 0 ? 'Out of Stock' : p.qty < 15 ? 'Low Stock' : 'In Stock';
    movements.unshift({
      date: new Date().toLocaleString('en-CA', { hour12: false }).replace(',', ''),
      product: `${p.name} (${p.sku})`,
      type: 'Received',
      qty: d.qty,
      prev,
      new: p.qty,
      user: currentUser.name
    });
  }
  incomingDeliveries = incomingDeliveries.filter(x => x.id !== id);
  renderIncoming();
  renderInventory();
  renderMovements();
  // Update dashboard incoming if present
  updateDashboardIncoming();
  showToast(`${d.po} received — ${d.qty} units added to stock`, 'success');
}

function updateDashboardIncoming() {
  const el = document.getElementById('dashboard-incoming');
  if (!el) return;
  if (!incomingDeliveries.length) {
    el.innerHTML = '<p class="text-sm text-gray-500">No incoming deliveries</p>';
    return;
  }
  el.innerHTML = incomingDeliveries.slice(0, 3).map(d => `
    <div class="flex justify-between items-center text-sm">
      <div>
        <p class="font-medium text-gray-200">${d.po}</p>
        <p class="text-xs text-gray-500">${d.supplier}</p>
      </div>
      <span class="status-badge ${d.status === 'Arriving Today' ? 'bg-primary-600/20 text-primary-400' : 'bg-dark-700 text-gray-400'}">${d.status === 'Arriving Today' ? 'Today' : 'Soon'}</span>
    </div>
  `).join('');
}


// ==================== MODALS ====================
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Close modals / panels on outside click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[id^="modal-"]').forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal.id); });
  });

  document.addEventListener('click', e => {
    const dropdown = document.getElementById('notif-dropdown');
    const profilePanel = document.getElementById('profile-panel');
    const notifBtn = e.target.closest('[onclick="toggleNotifications()"]');
    const profileBtn = e.target.closest('[onclick="toggleProfilePanel()"]');
    if (dropdown && !dropdown.contains(e.target) && !notifBtn) dropdown.classList.add('hidden');
    if (profilePanel && !profilePanel.contains(e.target) && !profileBtn) profilePanel.classList.add('hidden');
  });
});
