import axios from 'axios';
import {geocodeURL} from './baseURL';

const instance = axios.create({
  baseURL:  "https://maps.googleapis.com/maps/api/geocode/json",
})

export default instance;