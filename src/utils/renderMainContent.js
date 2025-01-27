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
            <label for="task-title-${task.id}">Task Title:</label>
            <input type="text" id="task-title-${task.id}" class="task-title-input" value="${task.taskTitle}" placeholder="Task Title" disabled />
        
            <label for="task-description-${task.id}">Task Description:</label>
            <textarea id="task-description-${task.id}" class="task-description-input" placeholder="Task Description" disabled>${task.taskDescription}</textarea>
        
            <label for="task-due-date-${task.id}">Due Date:</label>
            <input type="date" id="task-due-date-${task.id}" class="task-due-date-input" value="${task.dueDate}" disabled/>
        
            <label for="task-priority-${task.id}">Priority:</label>
            <select id="task-priority-${task.id}" class="task-priority-input" disabled>
                <option value="Low" ${task.priority === "Low" ? "selected" : ""}>Low</option>
                <option value="Medium" ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
                <option value="High" ${task.priority === "High" ? "selected" : ""}>High</option>
            </select>
        
            <button class="edit-task-btn">Edit</button>
            <button class="delete-task-btn">Delete</button>

            <button class="add-subtask">Add Subtask</button>
        `;
            mainContent.appendChild(taskSection);
        });
    }

    const editTaskBtns = document.querySelectorAll(".edit-task-btn");

if (editTaskBtns) {
    editTaskBtns.forEach((editTaskBtn) => {
        const taskId = editTaskBtn.parentElement.id;

        editTaskBtn.addEventListener("click", () => {
            const parentContainer = editTaskBtn.parentElement;

            // Select all inputs, textareas, and selects within the parent container
            const inputs = parentContainer.querySelectorAll("input, textarea, select");

            if (editTaskBtn.textContent === "Edit") {
                console.log("Edit button clicked");

                // Enable the inputs for editing
                inputs.forEach((input) => {
                    input.disabled = false;
                });

                // Change button text to "Save"
                editTaskBtn.textContent = "Save";
            } else if (editTaskBtn.textContent === "Save") {
                console.log("Save button clicked");

                // Gather updated values from the inputs
                const updatedFields = {
                    taskTitle: document.getElementById(`task-title-${taskId}`).value,
                    taskDescription: document.getElementById(`task-description-${taskId}`).value,
                    dueDate: document.getElementById(`task-due-date-${taskId}`).value,
                    priority: document.getElementById(`task-priority-${taskId}`).value,
                };

                // Disable the inputs after saving
                inputs.forEach((input) => {
                    input.disabled = true;
                });

                // Update the task in TaskManager
                const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
                const currentTask = allTasks.find((task) => task.id === taskId);

                if (currentTask) {
                    TaskManager.updateTask({ ...currentTask, ...updatedFields });
                    console.log(`Task with ID "${taskId}" updated successfully.`);
                } else {
                    console.error(`Task with ID "${taskId}" not found.`);
                }

                // Change button text back to "Edit"
                editTaskBtn.textContent = "Edit";
            }
        });
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