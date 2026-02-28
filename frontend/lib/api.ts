import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface RegisterData { name: string; email: string; password: string; }
export interface LoginData { email: string; password: string; }

export const authAPI = {
    register: (data: RegisterData) => api.post('/api/auth/register', data),
    login: (data: LoginData) => api.post('/api/auth/login', data),
    me: () => api.get('/api/auth/me'),
};

export const roadmapAPI = {
    getAll: () => api.get('/api/roadmaps'),
    getById: (id: number) => api.get(`/api/roadmaps/${id}`),
    generate: (goal: string) => api.post('/api/roadmaps/generate', { goal }),
    getMy: () => api.get('/api/roadmaps/my'),
};

export const progressAPI = {
    get: (roadmapId: number) => api.get(`/api/progress/${roadmapId}`),
    update: (milestoneId: number, completed: boolean) =>
        api.put('/api/progress/update', { milestoneId, completed }),
    summary: () => api.get('/api/progress/summary'),
};

export default api;
