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

createSideBar();
renderProjectDialog();
renderTaskDialog()

const projectDialog = document.getElementById('project-dialog');
const taskDialog = document.getElementById('task-dialog');
const mainContent = document.getElementById('content');

renderMainContent();

const taskListener = (addTaskBtn) => addTaskBtn.addEventListener('click', () => {
    document.getElementById('task-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('duedate').value = '';
    document.getElementById('priority').value = 'low';
    taskDialog.showModal();
    console.log('Add task button clicked');
})

const addProjectBtn = document.getElementsByClassName("add-project-btn");

addProjectBtn[0].addEventListener('click', () => {
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
    console.log('Save project button clicked');
    console.log(ProjectManager.loadProjects()[0].title);
});

const viewProjects = () => {
    const viewProjectsBtn = document.querySelectorAll('.project-item-btn');
    viewProjectsBtn.forEach((button) => {
    button.addEventListener('click', (event) => {
        const allTasks = TaskManager.loadTasks();
        let currentSavedTasks = []
        allTasks.forEach((task) => {
            currentSavedTasks.push(task.getTask());
            //console.log(tData);
        }); 
    
        // Filter tasks for the current project
        const currentProjectTasks = currentSavedTasks.filter((task) => task.projectTitle === event.target.textContent);
        console.log(currentProjectTasks);
        renderMainContent(event.target.textContent, currentProjectTasks);
        
        const addTaskBtn = document.querySelector('.add-task-btn');
        console.log(addTaskBtn);
        taskListener(addTaskBtn);
    });
});
}

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
    const projectTitle = document.querySelector('.project-title').textContent;

    // Create a new task using the Task factory
    const newTask = Task(null, projectTitle, taskTitle, taskDescription, dueDate, priority);

    // Add the task to TaskManager
    TaskManager.addTask(newTask);

    // Load all tasks from TaskManager
    const allTasks = TaskManager.loadTasks();

    let currentSavedTask = [];

    if (allTasks.length > 0) {
    
    const lastTask = allTasks[allTasks.length - 1]; // Get the last task
    currentSavedTask.push(lastTask.getTask()); // Push its details into currentSavedTask
    console.log(currentSavedTask);
}
    //allTasks.forEach((task) => {
    //    currentSavedTasks.push(task.getTask());
        //console.log(tData);
    //}); 

    // Filter tasks for the current project
    const currentProjectTask = currentSavedTask[0].projectTitle === projectTitle ? currentSavedTask : [];
    console.log(currentProjectTask);
    console.log(projectTitle);
    console.log(currentProjectTask.length)
    // Render each task for the current project

    if (currentProjectTask.length) {
        mainContent.innerHTML += `
            <h3>${currentProjectTask[0].taskTitle}</h3>
            <p>${currentProjectTask[0].taskDescription}</p>
            <p>${currentProjectTask[0].dueDate}</p>
            <p>${currentProjectTask[0].priority}</p>
            <button>Edit</button>
            <button>Delete</button>
        `;
        const addTaskBtn = document.querySelector('.add-task-btn');
        taskListener(addTaskBtn);
    } else {
        console.log('No tasks found for this project');
        return;
    }

    // Close the task dialog
    taskDialog.close();
});
