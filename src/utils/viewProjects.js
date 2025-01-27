import { renderMainContent } from "./renderMainContent.js";
import TaskManager from "../../managers/TaskManager.js";
import { taskListener } from "../index.js";

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

export { viewProjects };