import { renderMainContent } from "./renderMainContent.js";
import TaskManager from "../../managers/TaskManager.js";
import { taskListener } from "../index.js";

const viewProjects = () => {
    const viewProjectsBtn = document.querySelectorAll('.project-item-btn');
    viewProjectsBtn.forEach((button) => {
    button.addEventListener('click', (event) => {
    
       renderMainContent(event.target.textContent);
        
        const addTaskBtn = document.querySelector('.add-task-btn');
        console.log(addTaskBtn);
        taskListener(addTaskBtn);
        
    });
});
}

export { viewProjects };