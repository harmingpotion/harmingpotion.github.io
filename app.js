let entries = JSON.parse(localStorage.getItem("entries")) || [];
let currentLang = localStorage.getItem("lang") || "en";

const texts = {
  en: {
    title: "Step Counter",
    today: "Today",
    history: "History",
    settings: "Settings",
    add: "+1000 steps",
    reset: "Reset data"
  },
  nl: {
    title: "Stappenteller",
    today: "Vandaag",
    history: "Geschiedenis",
    settings: "Instellingen",
    add: "+1000 stappen",
    reset: "Reset data"
  }
};

function init() {
  applyLanguage();
  renderToday();
  renderList();
}

init();

function addSteps(value) {
  const entry = {
    id: Date.now().toString(),
    date: new Date().toISOString().split("T")[0],
    category: "steps",
    description: "Walking",
    value: value,
    unit: "steps"
  };

  entries.push(entry);
  save();
  renderToday();
  renderList();
}

function save() {
  localStorage.setItem("entries", JSON.stringify(entries));
}

function renderToday() {
  const today = new Date().toISOString().split("T")[0];

  const total = entries
    .filter(e => e.date === today)
    .reduce((sum, e) => sum + e.value, 0);

  document.getElementById("steps").textContent = total;
}

function renderList(filter = "all") {
  const list = document.getElementById("list");
  if (!list) return;

  let filtered = [...entries];

  const now = new Date();

  if (filter === "day") {
    const today = now.toISOString().split("T")[0];
    filtered = entries.filter(e => e.date === today);
  }

  if (filter === "week") {
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);
    filtered = entries.filter(e => new Date(e.date) >= weekAgo);
  }

  if (filter === "month") {
    const monthAgo = new Date();
    monthAgo.setMonth(now.getMonth() - 1);
    filtered = entries.filter(e => new Date(e.date) >= monthAgo);
  }

  list.innerHTML = filtered.map(e => `
    <div class="card">
      <b>${e.date}</b><br>
      ${e.description} - ${e.value} ${e.unit}
      <br>
      <button onclick="deleteEntry('${e.id}')">Delete</button>
    </div>
  `).join("");
}

function deleteEntry(id) {
  entries = entries.filter(e => e.id !== id);
  save();
  renderToday();
  renderList();
}

function resetAll() {
  entries = [];
  save();
  renderToday();
  renderList();
}

function switchLang() {
  currentLang = currentLang === "en" ? "nl" : "en";
  localStorage.setItem("lang", currentLang);
  applyLanguage();
}

function applyLanguage() {
  document.getElementById("title").textContent = texts[currentLang].title;

  const buttons = document.querySelectorAll("button.action");
  if (buttons[0]) buttons[0].textContent = texts[currentLang].add;
}

function showPage(page) {
  document.querySelectorAll("main section").forEach(s => {
    s.style.display = "none";
  });

  document.getElementById(page).style.display = "block";
}