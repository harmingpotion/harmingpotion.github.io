console.log('Dashboard script geladen.');

// State Management
let currentPeriod = 'day';
let currentCategory = 'all';

function loadItems() {
  const items = localStorage.getItem('healthItems');
  return items ? JSON.parse(items) : [];
}


function isInPeriod(itemDate, period) {
  const today = new Date();
  const itemDateObj = new Date(itemDate);
  
  // Vergelijk alleen de datum, niet de tijd
  const itemDateOnly = new Date(itemDateObj.getFullYear(), itemDateObj.getMonth(), itemDateObj.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  switch (period) {
    case 'day':
      return itemDateOnly.getTime() === todayOnly.getTime();
    
    case 'week': {
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      
      return itemDateOnly >= firstDayOfWeek && itemDateOnly <= lastDayOfWeek;
    }
    
    case 'month':
      return itemDateObj.getFullYear() === today.getFullYear() &&
             itemDateObj.getMonth() === today.getMonth();
    
    default:
      return true;
  }
}

function filterItems(items, period, category) {
  return items.filter(item => {
    const matchPeriod = isInPeriod(item.date, period);
    const matchCategory = category === 'all' || item.category === category;
    return matchPeriod && matchCategory;
  });
}


function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function renderItems(items) {
  const itemsList = document.getElementById('items-list');
  const emptyState = document.getElementById('empty-state');

  if (items.length === 0) {
    itemsList.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  itemsList.style.display = 'block';

  itemsList.innerHTML = items.map((item, index) => `
    <li>
      <article class="item-card">
        <header>
          <h3>${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</h3>
          <time datetime="${item.date}">${formatDate(item.date)}</time>
        </header>
        <p>${item.description}</p>
        <data value="${item.value}">${item.value} ${item.unit || ''}</data>
      </article>
      <button class="delete-btn" data-index="${index}" aria-label="Verwijder item">Verwijder</button>
    </li>
  `).join('');

  // Voeg event listeners toe aan delete knoppen
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      deleteItem(index);
    });
  });
}

function deleteItem(index) {
  if (confirm('Weet je zeker dat je dit item wilt verwijderen?')) {
    const items = loadItems();
    items.splice(index, 1);
    localStorage.setItem('healthItems', JSON.stringify(items));
    updateDashboard();
  }
}

function updateDashboard() {
  const allItems = loadItems();
  const filteredItems = filterItems(allItems, currentPeriod, currentCategory);
  
  renderItems(filteredItems);
}


// Event Listeners & Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Period filter buttons
  const periodButtons = document.querySelectorAll('[data-period]');
  periodButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      periodButtons.forEach(btn => btn.classList.remove('is-active'));
      e.target.classList.add('is-active');
      currentPeriod = e.target.dataset.period;
      updateDashboard();
    });
  });

  // Category filter buttons
  const categoryButtons = document.querySelectorAll('[data-category]');
  categoryButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      categoryButtons.forEach(btn => btn.classList.remove('is-active'));
      e.target.classList.add('is-active');
      currentCategory = e.target.dataset.category;
      updateDashboard();
    });
  });

  // Initial render
  updateDashboard();
});

