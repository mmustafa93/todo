// factories/Project.js
const Project = (title) => {
    const tasks = [];
  
    const addTask = (task) => {
      tasks.push(task);
    };
  
    const getTasks = () => tasks;
  
    const updateTitle = (newTitle) => {
      title = newTitle;
    };
  
    return { title, addTask, getTasks, updateTitle };
  };
  
  export default Project;