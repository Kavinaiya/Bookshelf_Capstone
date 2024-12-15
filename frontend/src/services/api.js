import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Your backend API URL

export const getBooks = () => axios.get(`${API_URL}/books`);
export const addBook = (bookData) => axios.post(`${API_URL}/books/add`, bookData);
export const login = (email, password) => axios.post(`${API_URL}/users/login`, { email, password });
export const getBookDetails = (id) => axios.get(`${API_URL}/books/${id}`);
export const submitReview = (id, review) => axios.post(`${API_URL}/books/${id}/reviews`, { review });
