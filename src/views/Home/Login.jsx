import React from 'react';
import styles from "./home.module.css"
import { Form, Input, Button, Image, message } from 'antd';
import { sha256 } from "js-sha256";
import axios from "../../axios";
import { useHistory } from 'react-router-dom';

const Login = ({onChange, doLogIn}) => {
    const history = useHistory();

    const onFinish = (values) => {
        const params = new URLSearchParams();
        params.append("func", "User-li");
        params.append("args", JSON.stringify(
            {
                 Email: values.email, 
                 Password: sha256(values.password)
            }));
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                message.success("Inicio de sesión");
                doLogIn(response.data);
                history.push("/teams");
            }
        })
        .catch(console.log("Error"))
      };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    return (
        <div className={styles.Home}>
            <div className ={styles.BgImage}/>
            <div className={styles.HomeCard}>
                <div className ={styles.HomeCardContent}>
                    <Image src = "http://henovenalfa.000webhostapp.com/resources/logo_henoven.png" preview = {false}/>
                    <Form
                        name="basic"
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingresa tu email',
                            },
                        ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingresa tu contraseña',
                            },
                        ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item  name="remember" valuePropName="checked">
                            <Button type="default" htmlType="button" onClick={()=> onChange("register")}>
                                Registrarse
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Iniciar sesión
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;