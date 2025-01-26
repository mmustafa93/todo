import ProjectManager from "../../managers/ProjectManager.js";

const renderProjectsList = (projectListContainer) => {
    projectListContainer.innerHTML = '';
    const allProjects = ProjectManager.loadProjects();
    const projectList = projectListContainer;
    
    allProjects.forEach((project) => {
        const projectItem = document.createElement('button');
        projectItem.classList.add('project-item-btn');
        projectItem.textContent = project.title;
        projectList.appendChild(projectItem);
    })
    return projectList;
}

export { renderProjectsList };    