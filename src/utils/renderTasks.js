import { taskListener  } from "../index.js";
import ProjectManager from "../../managers/ProjectManager.js";
import TaskManager from "../../managers/TaskManager.js";

const renderTasks = (currentProjectTasks) => {
    
    const tasksContainer = document.getElementById("task-list")
    tasksContainer.innerHTML = '';
    const reversedTasks = [...currentProjectTasks].reverse();
    console.log(currentProjectTasks)
    reversedTasks.forEach((task) => {
    

    const taskSection = document.createElement('section');
    taskSection.id = task.id;
    taskSection.innerHTML += `
    <label for="task-title-${task.id}">Task Title:</label>
    <input type="text" id="task-title-${task.id}" class="task-title-input" value="${task.taskTitle}" placeholder="Task Title" disabled />

    <label for="task-description-${task.id}">Task Description:</label>
    <textarea id="task-description-${task.id}" class="task-description-input" placeholder="Task Description" disabled>${task.taskDescription}</textarea>

    <label for="task-due-date-${task.id}">Due Date:</label>
    <input type="date" id="task-due-date-${task.id}" class="task-due-date-input" value="${task.dueDate}" disabled/>

    <label for="task-priority-${task.id}">Priority:</label>
    <select id="task-priority-${task.id}" class="task-priority-input" disabled>
        <option value="Low" ${task.priority === "Low" ? "selected" : ""}>Low</option>
        <option value="Medium" ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
        <option value="High" ${task.priority === "High" ? "selected" : ""}>High</option>
    </select>
    <div class="is-task-complete">
        <input id="task-complete-${task.id}" type="checkbox" class="checkbox-task" unchecked/>
        <label for"task-complete-${task.id}">Complete</label>
    </div>
    <div class="task-btns">
        <button class="edit-task-btn">Edit Task</button>
        <button class="delete-task-btn">Delete Task</button>
    </div>
`
    tasksContainer.appendChild(taskSection);
    
    const addTaskBtn = document.querySelector(".add-task-btn");
    taskListener(addTaskBtn);
    const deleteTaskBtn = document.querySelector(".delete-task-btn");
    const taskId = deleteTaskBtn.parentElement.parentElement.id;
    const projectId = document.querySelector(".project-title").id;

    
    deleteTaskBtn.addEventListener('click', () => {
        TaskManager.deleteTask(taskId);
        const allTasks = TaskManager.loadTasks().map((task) => task.getTask());
        console.log(allTasks)
        const currentProjectTasks = allTasks.filter((task) => task.projectId === projectId);
        console.log(currentProjectTasks)
        renderTasks(currentProjectTasks);
    })
})};

export { renderTasks }