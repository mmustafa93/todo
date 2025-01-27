const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  
const Project = (title, existingId = null) => {
const id = existingId || generateId(); // Use existing ID if provided, otherwise generate a new one

const updateTitle = (newTitle) => {
    title = newTitle;
};

const getProject = () => ({ id, title });

return { id, title, updateTitle, getProject };
};

export default Project;