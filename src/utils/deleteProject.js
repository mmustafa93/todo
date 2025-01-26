import ProjectManager from "../../managers/ProjectManager.js";
import TaskManager from "../../managers/TaskManager.js";
import { renderProjectsList } from "./renderProjectsList.js";
import { renderMainContent } from "./renderMainContent.js";
import { viewProjects } from "./viewProjects.js";

const deleteProject = (deleteProjectBtn) => {
    deleteProjectBtn.addEventListener('click', (event) => {
        console.log('Delete project button clicked');
        const projectTitle = document.querySelector('.project-title').textContent;
        const projectId = document.querySelector('.project-title').id;
        ProjectManager.deleteProject(projectId);
        const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
        console.log(allTasks);
        const deleteTasks = allTasks.filter((task) => task.projectTitle === projectTitle);
        console.log(deleteTasks);
        deleteTasks.forEach((task) => {
            const deleteTaskId = task.id;
            console.log(deleteTaskId);
            TaskManager.deleteTask(deleteTaskId);
        });
        const projectListContainer = document.querySelector(".project-list");
        renderProjectsList(projectListContainer);
        renderMainContent();
        viewProjects();
    });
}

export { deleteProject };