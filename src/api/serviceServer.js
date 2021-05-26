import axios from "axios";
import config from '../config.json';

const transformRequest = (data) =>{
    let type = typeof data;
    if(type === "object"){
        let params = new FormData();
        for(let key in data){
            if(data[key]){
                if(["args"].includes(key)){
                    params.append(key, JSON.stringify(data[key]));
                }
                else params.append(key, data[key]);
            }
        }
        return params;
    }
    return data;
};

export const ServerInstance = axios.create({
    baseURL: config.apiEndpoint,
    transformRequest,
});

ServerInstance.interceptors.response.use(
    (response) =>{
        if(JSON.stringify(response).includes("Error|")){
            return {Request_Error: response.data.slice(6)};
        }
        else{
            return response.data;
        }
    },
    (error) => {
        return {Request_Error: `Error de servidor (${error.request.status})`};
    }
);

export default (func, IdUserIS, args = {}) => {
    return ServerInstance.post("", {func, IdUserIS, args});
}
