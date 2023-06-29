// Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')
let storedTasks = JSON.parse(localStorage.getItem('tasks'));


// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    if (storedTasks == null) {
        storedTasks = [];
    }

    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
    storedTasks.forEach(task => {
        taskList.appendChild(buildTaskItem(task));
    });
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add a task.');
        return;
    }
    taskList.appendChild(buildTaskItem(taskInput.value));
    saveToLocalStorage(taskInput.value);

    // clear input
    taskInput.value = '';
    taskInput.focus();

    e.preventDefault();
}

function buildTaskItem(value) {
    const taskItem = document.createElement('li');
    taskItem.className = 'collection-item';
    taskItem.appendChild(document.createTextNode(value))
    taskItem.appendChild(buildLink());
    return taskItem;
}

function buildLink() {
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    return link;
}

function saveToLocalStorage(value) {
    storedTasks.push(value);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')
            && confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
         
        // remove from local storage
        const content = e.target.parentElement.parentElement.textContent;
        const index = storedTasks.indexOf(content);
        storedTasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    storedTasks = [];
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

function filterTasks(e) {
    const text =  e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item')
    .forEach(task => {
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}