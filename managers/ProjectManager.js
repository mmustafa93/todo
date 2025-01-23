// managers/ProjectManager.js
import Project from "../factories/Project.js";

const ProjectManager = (() => {
  const projects = [];

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    savedProjects.forEach((projectData) => {
      const project = Project(projectData.title);
      projects.push(project);
      console.log(`Loaded project "${projectData.title}"`);
    });
  };

  const saveProjects = () => {
    const projectData = projects.map((project) => ({ title: project.title }));
    localStorage.setItem("projects", JSON.stringify(projectData));
  };

  const addProject = (project) => {
    projects.push(project);
    saveProjects();
  };

  const deleteProject = (title) => {
    console.log("Deleting project...");
    console.log(`Current projects: ${projects.map(p => p.title).join(", ")}`);
    
    const targetProject = projects.find((project) => project.title === title);
    const index = projects.findIndex((project) => project.title === title);
    
    if (targetProject && index !== -1) {
      console.log(`Found project: "${targetProject.title}" at index ${index}`);
      projects.splice(index, 1);
      saveProjects();
      console.log(`Project "${title}" deleted from list.`);
      return true; // Indicates successful deletion
    } else {
      console.log(`Project "${title}" not found!`);
      return false; // Indicates the project was not found
    }
  };

  const getProjects = () => projects;

  return { loadProjects, addProject, deleteProject, getProjects };
})();

export default ProjectManager;