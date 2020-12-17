import {message} from "antd";

class Server{
    constructor(){
    }
    getRequestResult (funcSelected, args, IdUser){
        const params = new URLSearchParams();
        params.append("func", funcSelected);
        params.append("args", JSON.stringify(args));
        params.append("IdUserIS", IdUser);
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            if (validate.includes("User|")) {
                const messageToShow = response.data.Echo.split(":")[1];
                if(validate.includes("Error"))
                    message.error(messageToShow);
                else
                    message.success(messageToShow);
                return;
            }
            else{
                return response.data;
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    }
}

export default Server;