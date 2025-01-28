import './styles.css';
import ProjectManager from '../managers/ProjectManager.js';
import Project from '../factories/Project.js';
import { renderProjectsList } from './utils/renderProjectsList.js';
import TaskManager from '../managers/TaskManager.js';
import { renderMainContent } from './utils/renderMainContent.js';

const sidebar = document.getElementById('nav');

// Create Header content
const createSideBar = () => {
    // Main Heading
    const heading = document.createElement('h1');
    heading.textContent = 'To Do App';
    sidebar.appendChild(heading);

    // Tasks Section
    const tasksSection = document.createElement('section');
    tasksSection.classList.add('tasks-section');

    const tasksHeading = document.createElement('h2');
    tasksHeading.textContent = 'Tasks';

    const taskButtons = ['Due Today', 'Next 7 Days', 'All Tasks'].map(label => {
        const button = document.createElement('button');
        button.classList.add('tasks-section-btn');
        button.textContent = label;
        return button;
    });

    //const tasksBtns = document.querySelectorAll('.tasks-section-btn');
    taskButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            if (btn.textContent === 'Due Today'){
                renderMainContent('Due Today')
            } else if (btn.textContent === 'Next 7 Days'){
                renderMainContent('Next 7 Days')
            } else {
                renderMainContent('All Tasks')
            }
        })
    })

    tasksSection.appendChild(tasksHeading);
    taskButtons.forEach(button => tasksSection.appendChild(button));

    // Projects Section
    const projectsSection = document.createElement('section');
    projectsSection.classList.add('projects-section');

    const projectsHeadingContainer = document.createElement('div');
    projectsHeadingContainer.classList.add('projects-heading-container');
    const projectsHeading = document.createElement('h2');
    projectsHeading.textContent = 'Projects';

    projectsHeadingContainer.appendChild(projectsHeading);

    const addProjectButton = document.createElement('button');
    addProjectButton.classList.add('add-project-btn');
    addProjectButton.textContent = '+';

    projectsHeadingContainer.appendChild(addProjectButton);

    const projectListContainer = document.createElement('ul');
    projectListContainer.classList.add('project-list');

    if (!ProjectManager.loadProjects().length) {
        const zeroProject = Project('Default');
        ProjectManager.addProject(zeroProject);
    }
    
    const updatedProjectListContainer = renderProjectsList(projectListContainer);

    projectsSection.appendChild(projectsHeadingContainer);
    projectsSection.appendChild(updatedProjectListContainer);

    // Append sections to the header
    sidebar.appendChild(tasksSection);
    sidebar.appendChild(projectsSection);
};

export default createSideBar;