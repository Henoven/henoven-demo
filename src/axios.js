import axios from 'axios';
import config from './config.json';

const instance = axios.create({
  baseURL: config.apiEndpoint,
})

export default instance;