// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('#task-list');
const clearBtn = document.querySelector('#clear-tasks');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'todo-list__list-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'todo-list__delete-item';
    // Add icon html
    link.innerHTML = '<span class="todo-list__close-btn"></span>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  // Add a regular expression to make sure that there is at least one letter and at least 2 characters in the string
  let regex = /^(?=.*[a-zA-Z]).{2,}$/;

  // test regex condition
  if(regex.test(taskInput.value)) {
    console.log(typeof taskInput.value);
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'todo-list__list-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'todo-list__delete-item';
    // Add icon html
    link.innerHTML = '<span class="todo-list__close-btn"></span>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

  // Handling errors
  } else if(taskInput.value.length < 2){
    alert('You must insert at least 2 characters');
  } else {
    alert('Please add a valid task');
  }

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('todo-list__delete-item')) {
    console.log(e.target.parentElement.parentElement.textContent);
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';
  if(confirm('Are You Sure?')) {
    // Faster
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStorage();
  }
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}