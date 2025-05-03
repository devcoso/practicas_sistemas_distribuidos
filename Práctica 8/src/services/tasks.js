// taskService.js

import { API_TASKS } from './constants';

const headers = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const getTasks = () =>
    fetch(`${API_TASKS}/tasks`, {
        method: 'GET',
        headers: headers()
    })
    .then(async response => {
        if (response.ok) {
            try {
                return await response.json();
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return false;
            }
        } else {
            throw new Error('Failed to fetch tasks => ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });

const createTask = (title) =>
    fetch(`${API_TASKS}/tasks`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ title })
    })
    .then(async response => {
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to create task => ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });

const updateTask = (id, { title, done }) =>
    fetch(`${API_TASKS}/tasks/${id}`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ title, done })
    })
    .then(async response => {
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to update task => ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });

const deleteTask = (id) =>
    fetch(`${API_TASKS}/tasks/${id}`, {
        method: 'DELETE',
        headers: headers()
    })
    .then(async response => {
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to delete task => ' + response.statusText);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        return false;
    });

export default {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};