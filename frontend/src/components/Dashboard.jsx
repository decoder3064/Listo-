import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newTask, setNewTask] = useState({
        title: '',
        desription: '',
    });

    const {user, logout } = useAuth();
    const navigate = useNavigate();

    const [editingTask, setEditingTask] = useState(null);
    const [editForm, setEditForm] = useState({
        title: '',
        description: '',
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async() => {
        try {
            const response = await taskAPI.getTasks();
            setTasks(response.data);
            setLoading(false);
        } catch(error){
            setError('Failed to fetch tasks');
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()){
            return
        }
        try{
            const response = await taskAPI.createTask(newTask);
            setTasks([...tasks, response.data]);
            setNewTask({title: '', description: ''});
        } catch (error) {
            setError('Failed to create task');
        }
    };

    const handleToggleComplete = async (task) => {
        try{
            const response = await taskAPI.updateTask(task.id, {completed : !task.completed});
            setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
        } catch (error) {
            setError('Failed to update task')
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await taskAPI.deleteTask(id);
            setTasks(tasks.filter((t)=> t.id !== id));
        } catch (error) {
            setError('Failed to delete task')
        }
    };

    const handleStartEdit = (task) => {
        setEditingTask(task.id);
        setEditForm({
            title: task.title,
            description: task.description || '',
        });
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setEditForm({ title: '', description: '' });
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSaveEdit = async (taskId) => {
        if (!editForm.title.trim()) {
            setError('Title cannot be empty');
            return;
        }

        try {
            const response = await taskAPI.updateTask(taskId, editForm);
            setTasks(tasks.map((t) => (t.id === taskId ? response.data : t)));
            setEditingTask(null);
            setEditForm({ title: '', description: '' });
            setError(''); 
        } catch (error) {
            setError('Failed to update task');
        }
    };

    if (loading) return <div>Loading...</div>;


  return (
             <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome, {user?.name}!</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </header>

            {error && <div className="error-message">{error}</div>}

            {/* Add New Task Form */}
            <div className="task-form">
                <h2>Add New Task</h2>
                <form onSubmit={handleAddTask}>
                    <input
                        type="text"
                        placeholder="Task title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description (optional)"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <button type="submit">Add Task</button>
                </form>
            </div>

            {/* Tasks List */}
            <div className="tasks-list">
                <h2>Your Tasks</h2>
                {tasks.length === 0 ? (
                    <p>No tasks yet. Add one above!</p>
                ) : (
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id} className={task.completed ? 'completed' : ''}>
                                {/* ✨ If editing this task, show edit form */}
                                {editingTask === task.id ? (
                                    <div className="edit-form">
                                        <input
                                            type="text"
                                            value={editForm.title}
                                            onChange={(e) => setEditForm({ 
                                                ...editForm, 
                                                title: e.target.value 
                                            })}
                                            placeholder="Task title"
                                        />
                                        <textarea
                                            value={editForm.description}
                                            onChange={(e) => setEditForm({ 
                                                ...editForm, 
                                                description: e.target.value 
                                            })}
                                            placeholder="Description"
                                        />
                                        <div className="edit-actions">
                                            <button 
                                                onClick={() => handleSaveEdit(task.id)}
                                                className="save-btn"
                                            >
                                                Save
                                            </button>
                                            <button 
                                                onClick={handleCancelEdit}
                                                className="cancel-btn"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                
                                    <>
                                        <div className="task-content">
                                            <h3>{task.title}</h3>
                                            {task.description && <p>{task.description}</p>}
                                        </div>
                                        <div className="task-actions">
                                            <button onClick={() => handleToggleComplete(task)}>
                                                {task.completed ? 'Undo' : 'Complete'}
                                            </button>
                                            <button 
                                                onClick={() => handleStartEdit(task)}
                                                className="edit-btn"
                                            >
                                                Edit
                                            </button>
                                            <button onClick={() => handleDeleteTask(task.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}




export default Dashboard;