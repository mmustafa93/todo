import './styles.css';
import ProjectManager from '../managers/ProjectManager.js';
import Project from '../factories/Project.js';
import { renderProjectsList } from './utils/renderProjectsList.js';
import TaskManager from '../managers/TaskManager.js';
import { renderTasks } from './utils/renderTasks.js';

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
        
        const projectBtns = document.querySelector('.project-btns');
        const pageTitle = document.querySelector(".project-title");
        const editProjectTitleBtn = document.querySelector(".edit-project-title");
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
        
        btn.addEventListener('click', () => {
            console.log(projectBtns);
            console.log(editProjectTitleBtn);
            console.log(pageTitle);
            //projectBtns.style.display = "none";
            //editProjectTitleBtn.style.display = "none";
            if (btn.textContent === 'Due Today'){
                //pageTitle.textContent = 'Due Today'
                renderTasks(tasksDueToday)
            } else if (btn.textContent === 'Next 7 Days'){
                //pageTitle.textContent = 'Next 7 Days'
                renderTasks(tasksDueWeek)
            } else {
                //pageTitle.textContent = 'All Tasks'
                renderTasks(allTasks)
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