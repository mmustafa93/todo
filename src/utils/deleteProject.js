import ProjectManager from "../../managers/ProjectManager.js";
import { renderProjectsList } from "./renderProjectsList.js";
import { renderMainContent } from "./renderMainContent.js";
import { viewProjects } from "./viewProjects.js";

const deleteProject = (deleteProjectBtn) => {
    deleteProjectBtn.addEventListener('click', (event) => {
        const projectTitle = document.querySelector('.project-title').textContent;
        const projectId = document.querySelector('.project-title').id;
        ProjectManager.deleteProject(projectId);
        const projectListContainer = document.querySelector(".project-list");
        renderProjectsList(projectListContainer);
        renderMainContent();
        viewProjects();
    });
}

export { deleteProject };