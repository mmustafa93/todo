import { deleteProject } from './deleteProject.js';
import ProjectManager from '../../managers/ProjectManager.js';
import TaskManager from '../../managers/TaskManager.js';
import { renderProjectsList } from './renderProjectsList.js';
import { viewProjects } from './viewProjects.js';
import { taskListener } from '../index.js';
import { renderTasks } from "./renderTasks.js"

const renderMainContent = (projectTitle = "") => {
    const mainContent = document.getElementById('content');
    const tasksContainer = document.getElementById("task-list")
    console.log(tasksContainer)
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
            <div id="task-list"></div>
        `;

        const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
        const currentProjectTasks = allTasks.filter((task) => task.projectId === projectId);
        renderTasks(currentProjectTasks)
    }

    const addSubTaskBtns = document.querySelectorAll('.add-subtask');
    if (addSubTaskBtns){
        addSubTaskBtns.forEach((addSubTaskBtn) => {
            addSubTaskBtn.addEventListener("click", () => {
                console.log("subtask btn clicked")
                const parentContainer = addSubTaskBtn.parentElement;
                parentContainer.innerHTML += `
                <label for="sub-task-description">Sub-Task Description:</label>
                <textarea id="sub-task-description" class="task-description-input" placeholder="Sub-Task Description"></textarea>
                <button class="save-subtask">Save</button>
                `
            })
            
        });
    }

    const deleteTasksBtns = document.querySelectorAll(".delete-task-btn");

    if (deleteTasksBtns){
        deleteTasksBtns.forEach((deleteTaskBtn) => {
            const taskSection = deleteTaskBtn.parentElement;
            const taskId = taskSection.id;

            const projectId = ProjectManager.loadProjects().find(project => project.title === projectTitle).id;
        
            deleteTaskBtn.addEventListener('click', () => {
                TaskManager.deleteTask(taskId);
                const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
                console.log(allTasks)
                const currentProjectTasks = allTasks.filter((task) => task.projectId === projectId);
                console.log(currentProjectTasks)
                renderTasks(currentProjectTasks);
            })
            
        })
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

    const taskCheckBoxes = document.querySelectorAll('.checkbox-task');
    if (taskCheckBoxes) {
        taskCheckBoxes.forEach((taskCheckBox) => {
            taskCheckBox.addEventListener('change', () => {
                taskCheckBox.parentElement.style.backgroundColor = taskCheckBox.checked ? "gray" : "";
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