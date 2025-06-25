let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const quotes = [
  "One step at a time!",
  "Keep going 💪",
  "Productivity = Progress 🚀",
  "You're doing great!",
  "Finish strong! 🏁"
];

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const time = document.getElementById("taskTime").value;

  if (!text || !time) {
    alert("Enter both task and date/time!");
    return;
  }

  tasks.push({ text, time, done: false });
  document.getElementById("taskInput").value = "";
  document.getElementById("taskTime").value = "";

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  showQuote();
}

function showQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteBox").innerText = "💡 " + quote;
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let completed = 0;

  tasks.forEach((task, i) => {
    if (task.done) completed++;

    const li = document.createElement("li");
    const isToday = new Date(task.time).toDateString() === new Date().toDateString();
    li.className = `${task.done ? "done" : ""} ${isToday ? "today" : ""}`;
    li.innerHTML = `
      <strong>${task.text}</strong><br/>
      <small>${new Date(task.time).toLocaleString()}</small><br/>
      <button onclick="toggleDone(${i})">✔</button>
      <button onclick="deleteTask(${i})">🗑</button>
    `;

    list.appendChild(li);
  });

  updateProgress(completed, tasks.length);
}

function updateProgress(completed, total) {
  const progress = document.getElementById("progress");
  progress.innerHTML = `<div id="progressBar" style="width:${(completed / total) * 100 || 0}%"></div>`;
}

renderTasks();
const finishQuotes = [
  "✅ Great job finishing that!",
  "🚀 You're unstoppable!",
  "👏 One more step to success!",
  "🌟 Keep crushing it!",
  "🏆 Task down, victory closer!",
  "🔥 Boom! Another one bites the dust!"
];

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();

  if (tasks[index].done) {
    showCompletionQuote();
  }
}

function showCompletionQuote() {
  const quote = finishQuotes[Math.floor(Math.random() * finishQuotes.length)];
  const quoteDiv = document.getElementById("completedQuote");
  quoteDiv.innerText = `💡 ${quote}`;

  // Optional: Auto-hide after 4 seconds
  setTimeout(() => {
    quoteDiv.innerText = '';
  }, 4000);
}
