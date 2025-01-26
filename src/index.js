import './styles.css';
import createSideBar from './sidebar.js';
import Project from '../factories/Project.js';
import ProjectManager from '../managers/ProjectManager.js';
import Task from "../factories/Task.js";
import TaskManager from "../managers/TaskManager.js";

createSideBar();

const projectDialog = document.createElement('dialog');
projectDialog.id = 'project-dialog';
projectDialog.innerHTML = `
    <h4>Add New Project</h4>
    <form class="form-container">
        <div>
            <label for="project-title">Project Title:</label>
            <input type="text" id="project-title" name="project-title" autofocus>
        </div>
        <div>
            <button id="cancel-project-btn">Cancel</button>
            <button id="save-project-btn">Save</button>
        </div>
    </form>
`

const taskDialog = document.createElement('dialog');
taskDialog.id = 'task-dialog';
taskDialog.innerHTML = `
    <h4>Add New Task</h4>
    <form class="form-container">
        <div>
            <label for="task-title">Task Title:</label>
            <input type="text" id="task-title" name="task-title" autofocus>
        </div>
        <div>
            <label for="description">Task Description:</label>
            <input type="text" id="description" name="description" autofocus>
        </div>
        <div>
            <label for="duedate">Due Date:</label>
            <input type="text" id="duedate" name="duedate" autofocus>
        </div>
        <div>
            <label for="priority">Task Description:</label>
            <select name="priority" id="priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </div>
        <div>
            <button id="cancel-task-btn">Cancel</button>
            <button id="save-task-btn">Save</button>
        </div>
    </form>
`

// Append the dialog to the document body
document.body.appendChild(projectDialog);
document.body.appendChild(taskDialog);


const mainContent = document.getElementById('content');
const welcomeHeading = document.createElement('h1');
welcomeHeading.textContent = 'Welcome to your To Do App!';
mainContent.appendChild(welcomeHeading);

const addProjectBtn = document.getElementsByClassName("add-project-btn");

addProjectBtn[0].addEventListener('click', () => {
    projectDialog.showModal();
    
    console.log('Add project button clicked');
});

const cancelProjectBtn = document.getElementById('cancel-project-btn');
cancelProjectBtn.addEventListener('click', (event) => {
    event.preventDefault();
    projectDialog.close();
    console.log('Cancel project button clicked');
});

const saveProjectBtn = document.getElementById('save-project-btn');
saveProjectBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const projectTitle = document.getElementById('project-title').value;
    const newProject = Project(projectTitle);
    ProjectManager.addProject(newProject);
    projectDialog.close();
    console.log('Save project button clicked');
    console.log(ProjectManager.loadProjects()[0].title);
});

const viewProjectsBtn = document.querySelectorAll('.project-item-btn');
viewProjectsBtn.forEach((button) => {
    button.addEventListener('click', (event) => {
        mainContent.textContent = "";
        mainContent.innerHTML = `
            <h2 class="project-title">${event.target.textContent}</h2>
            <button class="add-task-btn">Add Task</button>
            <ul id="task-list"></ul>
        `;
        const addTaskBtn = document.getElementsByClassName('add-task-btn');
        console.log(addTaskBtn[0]);
        addTaskBtn[0].addEventListener('click', () => {
            taskDialog.showModal();
            console.log('Add task button clicked');
        })
    });
});

const cancelTaskBtn = document.getElementById('cancel-task-btn');
cancelTaskBtn.addEventListener('click', (event) => {
    event.preventDefault();
    taskDialog.close();
    console.log('Cancel task button clicked');
});

const tasksContainer = document.getElementById('tasks-container');
const saveTaskBtn = document.getElementById('save-task-btn');
saveTaskBtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Save task button clicked');

    // Get task details from the form
    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('description').value;
    const dueDate = document.getElementById('duedate').value;
    const priority = document.getElementById('priority').value;
    const projectTitle = document.querySelector('.project-title').textContent;

    // Create a new task using the Task factory
    const newTask = Task(null, projectTitle, taskTitle, taskDescription, dueDate, priority);

    // Add the task to TaskManager
    TaskManager.addTask(newTask);

    // Load all tasks from TaskManager
    const allTasks = TaskManager.loadTasks();
    let currentSavedTasks = []
    allTasks.forEach((task) => {
        currentSavedTasks.push(task.getTask());
        //console.log(tData);
    }); 

    // Filter tasks for the current project
    const currentProjectTasks = currentSavedTasks.filter((task) => task.projectTitle === projectTitle);
    //console.log(currentProjectTasks)
    // Render each task for the current project
    currentProjectTasks.forEach((task) => {
        console.log(task.taskTitle);
        //const taskSection = document.createElement('section');
        mainContent.innerHTML += `
            <h3>${task.taskTitle}</h3>
            <p>${task.taskDescription}</p>
            <p>${task.dueDate}</p>
            <p>${task.priority}</p>
            <button>Edit</button>
            <button>Delete</button>
        `;
        //tasksContainer.appendChild(taskSection);
    });

    // Close the task dialog
    taskDialog.close();
});
