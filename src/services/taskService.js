import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

export const fetchTasks = async (status) => {
  const params = status ? { status } : {};
  const { data } = await axios.get(API_URL, { params });
  return data;
};

export const createTask = async (task) => {
  const { data } = await axios.post(API_URL, task);
  return data;
};
export const updateTask = async (id, updates) => {
  const { data } = await axios.put(`${API_URL}/${id}`, updates);
  return data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
