import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('获取文章列表失败:', error);
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('获取文章详情失败:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('创建文章失败:', error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('更新文章失败:', error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('删除文章失败:', error);
    throw error;
  }
};

export const getAbout = async () => {
  try {
    const response = await axios.get(`${API_URL}/about`);
    return response.data;
  } catch (error) {
    console.error('获取关于我信息失败:', error);
    throw error;
  }
};

export const updateAbout = async (aboutData) => {
  try {
    const response = await axios.put(`${API_URL}/about`, aboutData);
    return response.data;
  } catch (error) {
    console.error('更新关于我信息失败:', error);
    throw error;
  }
};