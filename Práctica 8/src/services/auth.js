import { API_AUTH } from './constants';

export const verify = () => fetch(`${API_AUTH}/verify`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})
.then(async response => {
    if (response.status === 200) {
        try {
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return false;
        }
    } else {
        throw new Error('Token is not valid');
    }
})
.catch(error => {
    console.error('Error:', error);
    return false;
});