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
            <button id="cancel-project-btn">Cancel</button>
            <button id="save-project-btn">Save</button>
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
            <h2>${event.target.textContent}</h2>
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


