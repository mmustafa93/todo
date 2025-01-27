const taskListener = (addTaskBtn) => addTaskBtn.addEventListener('click', () => {
    document.getElementById('task-title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('duedate').value = '';
    document.getElementById('priority').value = 'low';
    const taskDialog = document.getElementById('task-dialog');
    taskDialog.showModal();
    console.log('Add task button clicked');
});

export { taskListener };