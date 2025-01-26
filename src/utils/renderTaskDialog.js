const renderTaskDialog = (task) => {
    const taskDialog = document.createElement('dialog');
    taskDialog.id = 'task-dialog';
    taskDialog.innerHTML = `
        <h4>Add New Task</h4>
        <form class="form-container">
            <div>
                <label for="task-title">Task Title:</label>
                <input type="text" id="task-title" name="task-title" autofocus>
            </div>
            <div>
                <label for="description">Task Description:</label>
                <input type="text" id="description" name="description" autofocus>
            </div>
            <div>
                <label for="duedate">Due Date:</label>
                <input type="text" id="duedate" name="duedate" autofocus>
            </div>
            <div>
                <label for="priority">Task Description:</label>
                <select name="priority" id="priority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <button id="cancel-task-btn">Cancel</button>
                <button id="save-task-btn">Save</button>
            </div>
        </form>
    `

    // Append the dialog to the document body

    document.body.appendChild(taskDialog);

}

export { renderTaskDialog };