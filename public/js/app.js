document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('health-form');
  const dataContainer = document.getElementById('data-container');
  const itemCount = document.getElementById('item-count');
  const totalValue = document.getElementById('total-value');
  const totalValueLabel = document.getElementById('total-value-label');
  const filterControls = document.querySelector('.filter-controls');

  let currentFilter = 'all';

  const getHealthData = () => {
    return JSON.parse(localStorage.getItem('healthData')) || [];
  };

  const saveHealthData = (data) => {
    localStorage.setItem('healthData', JSON.stringify(data));
  };

  const renderHealthData = () => {
    if (!dataContainer) return;

    const data = getHealthData();
    let filteredData = data;
    const now = new Date();

    if (currentFilter === 'dag') {
      filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === now.toDateString();
      });
    } else if (currentFilter === 'week') {
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      filteredData = data.filter(item => new Date(item.date) >= startOfWeek);
    } else if (currentFilter === 'maand') {
      filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      });
    }

    dataContainer.innerHTML = '';

    if (filteredData.length === 0) {
      dataContainer.innerHTML = `<p>Geen gegevens voor de geselecteerde periode (${currentFilter}).</p>`;
    } else {
      const list = document.createElement('ul');
      list.className = 'data-list';
      filteredData.forEach((item) => {
        const originalIndex = data.findIndex(d => d.id === item.id);
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${item.description}</strong> (${item.category}) - ${item.value} 
          <span>${new Date(item.date).toLocaleDateString()}</span>
          <button class="delete-btn" data-index="${originalIndex}">Verwijder</button>
        `;
        list.appendChild(listItem);
      });
      dataContainer.appendChild(list);
    }
    if(itemCount) {
        itemCount.textContent = data.length;
    }
    if(totalValue) {
        const total = filteredData.reduce((sum, item) => sum + parseFloat(item.value || 0), 0);
        totalValue.textContent = total.toLocaleString();
        totalValueLabel.textContent = `Totaal (${currentFilter})`;
    }
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newEntry = {
        date: document.getElementById('date').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        value: document.getElementById('value').value,
        id: Date.now()
      };

      const data = getHealthData();
      data.push(newEntry);
      saveHealthData(data);

      form.reset();
      window.location.href = '/overzicht';
    });
  }

  if (dataContainer) {
    dataContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.dataset.index, 10);
        let data = getHealthData();
        data.splice(index, 1);
        saveHealthData(data);
        renderHealthData();
      }
    });
  }

  if (filterControls) {
    filterControls.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        currentFilter = e.target.dataset.period;
        document.querySelectorAll('.filter-controls button').forEach(btn => btn.classList.remove('is-active'));
        e.target.classList.add('is-active');
        renderHealthData();
      }
    });
  }

  renderHealthData();
});
