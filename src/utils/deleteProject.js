import ProjectManager from "../../managers/ProjectManager.js";
import TaskManager from "../../managers/TaskManager.js";
import { renderProjectsList } from "./renderProjectsList.js";
import { renderMainContent } from "./renderMainContent.js";
import { viewProjects } from "./viewProjects.js";

const deleteProject = (deleteProjectBtn) => {
    deleteProjectBtn.addEventListener('click', (event) => {
        console.log('Delete project button clicked');
        const projectId = document.querySelector('.project-title').id;
        ProjectManager.deleteProject(projectId);
        const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
        const deleteTasks = allTasks.filter((task) => task.projectId === projectId);
        deleteTasks.forEach((task) => {
            const deleteTaskId = task.id;
            TaskManager.deleteTask(deleteTaskId);
        });
        const projectListContainer = document.querySelector(".project-list");
        renderProjectsList(projectListContainer);
        renderMainContent();
        viewProjects();
    });
}

export { deleteProject };