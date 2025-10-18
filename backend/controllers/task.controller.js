import prisma from "../utils/prisma.js"



//Create task
export const createTask  = async (req, res) =>{
    const {title, description} = req.body;
    const userId =  req.user.id;

    try {

        if (!title || title.trim() === '') {
            return res.status(400).json({ message: "missing title" });
        };

        const task = await prisma.task.create({ data: { title, description, userId }});

        return res.status(201).json(task)

    } catch(error){

        return res.status(500).json({ message: "Error creating task" });

    };
};

//Read tasks
export const getTasks = async (req, res) => {
    const userId = req.user.id;
    try {

        const tasks = await prisma.task.findMany( { where : { userId :userId } });
        return res.status(200).json(tasks);

    } catch (error){

        return res.status(500).json({ message: "Error getting tasks" });

    };
}

//Update task
export const updateTask = async (req, res) => {
    const { id } = req.params;  
    const taskId = parseInt(id); 
    const userId = req.user.id;
    const { title, description, completed } = req.body

    try{

        const task = await prisma.task.findUnique( { where : { id:taskId } })
          if (!task) {
            return res.status(404).json({ message: "Task does not exist" });
        };

        if (task.userId !== userId) {
            return res.status(403).json({ message: "Task does not belong to user" });
        };

        if (title !== undefined && title.trim() === '') {
            return res.status(400).json({ message: "Title cannot be empty" });
        };

        const updatedTask = await prisma.task.update(
            { where : { id: taskId }, data : { 
                title: title ,
                description: description,
                completed: completed}
        });
        return res.status(200).json(updatedTask)

    } catch (error){

        return res.status(500).json({ message: "Error updating task" });

    }
};

//Delete Task 
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const taskId = parseInt(id);
    const userId = req.user.id;
    
    try {

        const task = await prisma.task.findUnique({where: { id: taskId }});

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if(task.userId !== userId){
            
             return res.status(403).json({ message: "Not authorized to delete this task" });

        }

        const toDelete = await prisma.task.delete({where : {id : taskId} })
        return res.status(200).json(toDelete)

    } catch (error) {

        return res.status(500).json({ message: "Error deleting task" });

    }
};