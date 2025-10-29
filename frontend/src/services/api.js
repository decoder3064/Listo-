import axios from "axios";


const API_URL = 'https://listo-production-d30f.up.railway.app/api'

const api = axios.create({
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json',}
});

api.interceptors.request.use((config)=> {
    const token = localStorage.getItem('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    register: (userData) => api.post('/auth/register', userData),
    login: (credentials) => api.post('/auth/login', credentials)

};

export const taskAPI = {
    createTask:(taskData) => api.post('/tasks', taskData),
    getTasks:() => api.get('/tasks'), 
    updateTask:(id, taskData) => api.put(`/tasks/${id}`, taskData),
    deleteTask:(id) => api.delete(`/tasks/${id}`),
};

export default api;


