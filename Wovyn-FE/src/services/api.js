import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = async (credentials) => {
    const response = await api.post('/user/login', credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post('/user/signup', userData);
    return response.data;
};

export const fetchProducts = async () => {
    const response = await api.get('/product/all');
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post('/product/create', productData);
    return response.data;
};

export const updateProduct = async (id, productData) => {
    const response = await api.put(`/product/${id}`, productData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
};

export const fetchCategories = async () => {
    const response = await api.get('/category/all');
    return response.data;
};

export const createCategory = async (categoryData) => {
    const response = await api.post('/category/create', categoryData);
    return response.data;
};

export const updateCategory = async (id, categoryData) => {
    const response = await api.put(`/category/${id}`, categoryData);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await api.delete(`/category/${id}`);
    return response.data;
};

export default api;
