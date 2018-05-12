import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://react-my-burger-dvll.firebaseio.com/'
});

export default instance;