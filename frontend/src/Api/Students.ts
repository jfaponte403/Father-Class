import axios from "axios";
import {Student} from '../Interfaces/Student';

const API_URL = 'http://localhost:8000'


export const getStudents = async () => {
    const response = await axios.get<Student[]>(`${API_URL}/student`);
    return response.data;
};

export const addStudent = async (newStudent: Student) => {
    return await axios.post<Student>(`${API_URL}/student`, newStudent);
};

export const updateStudent = async (id: string, updatedStudent: Student) => {
    return await axios.put<Student>(`${API_URL}/student/${id}`, updatedStudent);
};

export const deleteStudent = async (id: string) => {
    return await axios.delete(`${API_URL}/student/${id}`);
};