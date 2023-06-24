import axios from 'axios';
import {api} from "../utils/config";

const getGPSData = async () => {
    const response = await axios.get(`${api}/gps`);
    return response.data;
};


export default {
    getGPSData
};
