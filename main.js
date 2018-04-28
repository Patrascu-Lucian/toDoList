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

    // Show success message
    showMessage('Task added to list', 'success');

  // Handling errors
  } else if(taskInput.value.length < 2){
    showMessage('You must insert at least 2 characters', 'warning');
  } else {
    showMessage('Please insert a valid task!', 'warning');
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
    confirmDeletion('Are you Sure?', function() {
      console.log('got here');
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    });
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

  confirmDeletion('Are you Sure?', function() {

    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStorage();
  });
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// SHOW ERROR FUNCTION
function showMessage(message, type) {

  const element = `<p style="opacity:1" class="todo-list__error--${type}">${message}</p>`;

  form.insertAdjacentHTML('beforeBegin', element);

  setTimeout(function(){
    form.previousElementSibling.style.opacity = "0";
    setTimeout(function(){
      form.previousElementSibling.remove();
    },200);
  },3000);
}

// CONFIRM DELETION FUNCTION
function confirmDeletion(message, callback) {
  const confirmElement = `
      <div id="confirm-del" class="confirm-del">
        <div class="confirm-del__container">
          <p>${message}</p>
          <button id="confirm-yes" class="btn">Yes</button>
          <button id="confirm-no" class="btn">No</button>
        </div>
      </div>`;

  document.body.insertAdjacentHTML('afterBegin', confirmElement);

  document.getElementById('confirm-del').addEventListener('click', function(e){
    console.log(e.target.textContent === 'Yes');
    if(e.target.textContent === 'Yes'){
      this.remove();
      callback();
    } else if(e.target.textContent === 'No'){
      this.remove();
    }
  });
}