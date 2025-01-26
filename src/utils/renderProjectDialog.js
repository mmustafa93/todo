const renderProjectDialog = () => {
    const projectDialog = document.createElement('dialog');
    projectDialog.id = 'project-dialog';
    projectDialog.innerHTML = `
        <h4>Add New Project</h4>
        <form class="form-container">
            <div>
                <label for="project-title">Project Title:</label>
                <input type="text" id="project-title" name="project-title" autofocus>
            </div>
            <div>
                <button id="cancel-project-btn">Cancel</button>
                <button id="save-project-btn">Save</button>
            </div>
        </form>
    `

    document.body.appendChild(projectDialog);
}

export { renderProjectDialog };
