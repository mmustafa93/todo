import { deleteProject } from './deleteProject.js';
import ProjectManager from '../../managers/ProjectManager.js';

const renderMainContent = (projectTitle = "", currentProjectTasks = []) => {
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
        mainContent.innerHTML = `
            <h2 class="project-title">${projectTitle}</h2>
            <button class="add-task-btn">Add Task</button>
            ${projectTitle !== "Default" ? `<button class="delete-project-btn">Delete Project</button>` : ""}
            <ul id="task-list"></ul>
        `;
        const projectTitleElement = document.querySelector('.project-title');
        const projectId = ProjectManager.loadProjects().find(project => project.title === projectTitle).id;
        projectTitleElement.id = projectId;
    }
    const deleteProjectBtn = document.querySelector('.delete-project-btn');
    if (deleteProjectBtn) {
        deleteProject(deleteProjectBtn);
    }
    if (!currentProjectTasks.length) {
        return;
    } else {
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

}

export { renderMainContent };