import axios from "axios";
import {Teacher} from '../Interfaces/Teacher.ts';

const API_URL = 'http://localhost:8000'

export const getTeachers = async () => {
    const response = await axios.get<Teacher[]>(`${API_URL}/teacher`);
    return response.data;
};

export const addTeacher = async (newStudent: Teacher) => {
    return await axios.post<Teacher>(`${API_URL}/teacher`, newStudent);
};

export const updateTeacher = async (id: string, updatedStudent: Teacher) => {
    return await axios.put<Teacher>(`${API_URL}/teacher/${id}`, updatedStudent);
};

export const deleteTeacher = async (id: string) => {
    return await axios.delete(`${API_URL}/teacher/${id}`);
};