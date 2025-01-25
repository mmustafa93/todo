import Project from "../factories/Project.js";

const ProjectManager = (() => {
  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    return savedProjects.map((projectData) =>
      Project(projectData.title, projectData.id) // Pass the existing ID when recreating projects
    );
  };

  const saveProjects = (projects) => {
    const projectData = projects.map((project) => project.getProject());
    localStorage.setItem("projects", JSON.stringify(projectData));
  };

  const addProject = (project) => {
    const projects = loadProjects();
    if (projects.some((savedProject) => savedProject.title === project.title)) {
      console.log(`Project "${project.title}" already exists!`);
      return false; // Indicates failure due to duplicate title
    }
    projects.push(project);
    saveProjects(projects);
    console.log(`Project "${project.title}" added.`);
    return true; // Indicates successful addition
  };

  const updateProject = (projectId, newTitle) => {
    const projects = loadProjects();
  
    // Find the project by its unique ID
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      console.log(`Project with ID "${projectId}" not found!`);
      return false; // Indicates the project was not found
    }
  
    // Check if the new title is already in use by another project
    if (projects.some((p) => p.title === newTitle && p.id !== projectId)) {
      console.log(`A project with the title "${newTitle}" already exists!`);
      return false; // Prevents duplicate titles
    }
  
    // Update the title
    project.updateTitle(newTitle); // Update title using the factory method
    saveProjects(projects); // Save updated projects to localStorage
    console.log(`Project with ID "${projectId}" updated to title "${newTitle}".`);
    return true; // Indicates successful update
  };

  const deleteProject = (title) => {
    const projects = loadProjects();
    const updatedProjects = projects.filter((project) => project.title !== title);

    if (projects.length === updatedProjects.length) {
      console.log(`Project "${title}" not found!`);
      return false; // Indicates the project was not found
    }

    saveProjects(updatedProjects);
    console.log(`Project "${title}" deleted successfully.`);
    return true; // Indicates successful deletion
  };

  const getProjects = () => loadProjects();

  return { loadProjects, addProject, updateProject, deleteProject, getProjects };
})();

export default ProjectManager;