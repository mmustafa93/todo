import { deleteProject } from './deleteProject.js';
import ProjectManager from '../../managers/ProjectManager.js';
import TaskManager from '../../managers/TaskManager.js';
import { renderProjectsList } from './renderProjectsList.js';
import { viewProjects } from './viewProjects.js';
import { taskListener } from '../index.js';

const renderMainContent = (projectTitle = "") => {
    const mainContent = document.getElementById('content');
    const renderWelcomeMessage = () => {
        const welcomeHeading = document.createElement('h1');
        welcomeHeading.textContent = 'Welcome to your To Do App!';
        mainContent.appendChild(welcomeHeading);
    }

    if (!projectTitle) {
        mainContent.textContent = "";
        renderWelcomeMessage();
    } else {
        mainContent.textContent = "";
        const projectId = ProjectManager.loadProjects().find(project => project.title === projectTitle).id;
        
        mainContent.innerHTML = `
            <h2 class="project-title" id=${projectId}>${projectTitle}</h2>
            ${projectTitle !== "Default" ? `<button class="edit-project-title">Edit Project Title</button>` : ""}
            <button class="add-task-btn">Add Task</button>
            ${projectTitle !== "Default" ? `<button class="delete-project-btn">Delete Project</button>` : ""}
            <ul id="task-list"></ul>
        `;

        const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
        const currentProjectTasks = allTasks.filter((task) => task.projectId === projectId);
        currentProjectTasks.forEach((task) => {
            const taskSection = document.createElement('section');
            taskSection.id = task.id;
            taskSection.innerHTML += `
                <h3>${task.taskTitle}</h3>
                <p>${task.taskDescription}</p>
                <p>${task.dueDate}</p>
                <p>${task.priority}</p>
                <button>Edit</button>
                <button>Delete</button>
            `;
            mainContent.appendChild(taskSection);
        });
    }
    const editProjectTitleBtn = document.querySelector('.edit-project-title');
    if (editProjectTitleBtn) {
        editProjectTitleBtn.addEventListener('click', () => {
            const projectTitleElement = document.querySelector('.project-title');
            console.log(projectTitleElement.textContent)
            const projectId = projectTitleElement.id;
            console.log(projectId)
            const allTasks = TaskManager.loadTasks().map((task) => task.getTask())
            console.log(allTasks)
            const currentProjectTasks = allTasks.filter(task => task.projectId === projectTitleElement.id)
            console.log(currentProjectTasks)
            
            const newProjectTitle = prompt('Enter new project title'); // Replace prompt with custom input if needed
            if (newProjectTitle) {
                ProjectManager.updateProject(projectId, newProjectTitle); // Update the project title in ProjectManager
                const updatedTasks = currentProjectTasks.map((task) => {
                    TaskManager.updateTask(task.id, newProjectTitle)
                })
                renderMainContent(newProjectTitle, updatedTasks); // Re-render the main content with the new title
                renderProjectsList(document.querySelector('.project-list')); // Re-render the project list
                viewProjects(); // Re-attach event listeners
                taskListener(document.querySelector('.add-task-btn'));
            }
            
            //const newProjectTitle = prompt('Enter new project title');
            //if (newProjectTitle) {
             //   ProjectManager.updateProject(projectId, newProjectTitle); // Update the project title in ProjectManager
             //   renderMainContent(newProjectTitle, currentProjectTasks); // Re-render the main content with the new title
              //  renderProjectsList(document.querySelector('.project-list')); // Re-render the project list
             //   viewProjects()
             //   taskListener(document.querySelector('.add-task-btn')); // Re-add the event listener to the add task button
           // }
        });
    }
    const deleteProjectBtn = document.querySelector('.delete-project-btn');
    if (deleteProjectBtn) {
        deleteProject(deleteProjectBtn);
    }

}

export { renderMainContent };