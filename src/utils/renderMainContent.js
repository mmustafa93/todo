import { deleteProject } from './deleteProject.js';
import ProjectManager from '../../managers/ProjectManager.js';
import Task from "../../factories/Task.js"
import TaskManager from '../../managers/TaskManager.js';
import { renderProjectsList } from './renderProjectsList.js';
import { viewProjects } from './viewProjects.js';
import { taskListener } from '../index.js';
import { renderTasks } from "./renderTasks.js"

const renderMainContent = (projectTitle = "") => {
    const mainContent = document.getElementById('content');
    const tasksContainer = document.querySelector(".task-list")
    
    const allTasks = TaskManager.loadTasks().map((task) => task.getTask());

     // Helper function to check if two dates are the same day
     const isSameDay = (date1, date2) => {
        return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    };

    // Get today's date and the date seven days from now
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    // Filter tasks due today
    const tasksDueToday = allTasks.filter((task) => {
        const taskDueDate = new Date(task.dueDate); // Convert due date to a Date object
        return isSameDay(taskDueDate, today);
    });

    // Filter tasks due in the next seven days
    const tasksDueWeek = allTasks.filter((task) => {
        const taskDueDate = new Date(task.dueDate); // Convert due date to a Date object
        return taskDueDate > today && taskDueDate <= sevenDaysFromNow;
    });

    const tasksHeader = (heading) => {
        return `
        <div class="title-container">
            <h2 class="project-title">${heading}</h2>
        </div>
        <div class="task-list"></div>
    `
    }

    const renderWelcomeMessage = () => {
        const welcomeHeading = document.createElement('h1');
        welcomeHeading.textContent = 'Welcome to your To Do App!';
        mainContent.appendChild(welcomeHeading);
    }

    if (!projectTitle) {
        mainContent.textContent = "";
        renderWelcomeMessage();
    } else if (projectTitle === 'Due Today') {
        tasksHeader(projectTitle);
        renderTasks(tasksDueToday);
    } else if (projectTitle === 'Next 7 Days') {
        tasksHeader(projectTitle);
        renderTasks(tasksDueWeek);
    } else if (projectTitle === 'All Tasks') {
        tasksHeader(projectTitle);
        renderTasks(allTasks)
    } else {
        mainContent.textContent = "";
        const projectId = ProjectManager.loadProjects().find(project => project.title === projectTitle).id;
        
        mainContent.innerHTML = `
            <div class="title-container">
                <h2 class="project-title" id=${projectId}>${projectTitle}</h2>
                ${projectTitle !== "Default" ? `<button class="edit-project-title">Edit Project Title</button>` : ""}
            </div>
            <div class="project-btns">
            <button class="add-task-btn">Add Task</button>
            ${projectTitle !== "Default" ? `<button class="delete-project-btn">Delete Project</button>` : ""}
            </div>
            <div class="task-list"></div>
        `;

        const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
        const currentProjectTasks = allTasks.filter((task) => task.projectId === projectId);
        renderTasks(currentProjectTasks)
    }

    
    const deleteTasksBtns = document.querySelectorAll(".delete-task-btn");

    if (deleteTasksBtns){
        deleteTasksBtns.forEach((deleteTaskBtn) => {
            const taskSection = deleteTaskBtn.parentElement;
            const taskId = taskSection.id;

            const project = ProjectManager.loadProjects().find(project => project.title === projectTitle);
            let projectId;
            if (project){
                projectId = project.id;
            }
        
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
            const taskId = editTaskBtn.parentElement.parentElement.id;
            console.log(taskId)

            editTaskBtn.addEventListener("click", () => {
                const parentContainer = editTaskBtn.parentElement.parentElement;
                console.log(parentContainer)
                // Select all inputs, textareas, and selects within the parent container
                const inputs = parentContainer.querySelectorAll("input, textarea, select");

                if (editTaskBtn.textContent === "Edit Task") {
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
                        isCompleted: document.getElementById(`task-complete-${taskId}`).checked,
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
                    editTaskBtn.textContent = "Edit Task";
                }
            });
        });
    }

    const taskCheckBoxes = document.querySelectorAll('.checkbox-task');
    if (taskCheckBoxes) {
        taskCheckBoxes.forEach((taskCheckBox) => {
            const taskId = taskCheckBox.parentElement.parentElement.id;
            
            taskCheckBox.addEventListener('change', () => {
                
                taskCheckBox.parentElement.parentElement.style.backgroundColor = taskCheckBox.checked ? "gray" : "";
                const updatedFields = {
                    taskTitle: document.getElementById(`task-title-${taskId}`).value,
                    taskDescription: document.getElementById(`task-description-${taskId}`).value,
                    dueDate: document.getElementById(`task-due-date-${taskId}`).value,
                    priority: document.getElementById(`task-priority-${taskId}`).value,
                    isCompleted: document.getElementById(`task-complete-${taskId}`).checked,
                };
                const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
                const currentTask = allTasks.find((task) => task.id === taskId);
                TaskManager.updateTask({ ...currentTask, ...updatedFields })
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