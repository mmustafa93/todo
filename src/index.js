import './styles.css';
import createSideBar from './sidebar.js';
import Project from '../factories/Project.js';
import ProjectManager from '../managers/ProjectManager.js';
import Task from "../factories/Task.js";
import TaskManager from "../managers/TaskManager.js";
import { renderProjectsList } from './utils/renderProjectsList.js';
import { renderProjectDialog } from './utils/renderProjectDialog.js';
import { renderTaskDialog } from './utils/renderTaskDialog.js';
import { renderMainContent } from './utils/renderMainContent.js';
import { viewProjects } from './utils/viewProjects.js';

createSideBar();
renderProjectDialog();
renderTaskDialog()

const projectDialog = document.getElementById('project-dialog');
const taskDialog = document.getElementById('task-dialog');
const mainContent = document.getElementById('content');

renderMainContent();

export const taskListener = (addTaskBtn) => addTaskBtn ? addTaskBtn.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains("add-task-btn")){
        document.getElementById('task-title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('duedate').value = '';
        document.getElementById('priority').value = 'low';
        const taskDialog = document.getElementById('task-dialog');
        taskDialog.showModal();
        console.log('Add task button clicked');
    }
}) : ''

const addProjectBtn = document.getElementsByClassName("add-project-btn");

addProjectBtn[0].addEventListener('click', () => {
    document.getElementById("project-title").value = ""
    projectDialog.showModal();
});

const cancelProjectBtn = document.getElementById('cancel-project-btn');
cancelProjectBtn.addEventListener('click', (event) => {
    event.preventDefault();
    projectDialog.close();
});

const saveProjectBtn = document.getElementById('save-project-btn');
saveProjectBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const projectTitle = document.getElementById('project-title').value;
    if (!projectTitle){
        alert('The project title cannot be empty!')
    }
    const savedProjects = ProjectManager.loadProjects();
    const isTitleTaken = savedProjects.some((project) => project.title === projectTitle);
    if (isTitleTaken){
        alert('Project title already exists. Choose another title.');
        return;
    }
    console.log(savedProjects);
    const newProject = Project(projectTitle);
    ProjectManager.addProject(newProject);
    const projectListContainer = document.querySelector(".project-list");
    renderProjectsList(projectListContainer);
    projectDialog.close();
    renderMainContent(projectTitle);
    viewProjects()
    taskListener(document.querySelector('.add-task-btn'));
    console.log('Save project button clicked');
    console.log(ProjectManager.loadProjects()[0].title);
});

viewProjects();

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
    const projectId = document.querySelector('.project-title').id;

    // Create a new task using the Task factory
    const newTask = Task(null, projectId, taskTitle, taskDescription, dueDate, priority);

    // Add the task to TaskManager
    TaskManager.addTask(newTask);
    
    const projectTitle = document.querySelector(".project-title").textContent;
    
    renderMainContent(projectTitle)
    
    // Close the task dialog
    taskDialog.close();
});

