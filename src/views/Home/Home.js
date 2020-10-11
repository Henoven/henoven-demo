import React, { useState, useEffect } from 'react';
import styles from "./home.module.css"
import { Form, Input, Button, Checkbox, Image, message } from 'antd';
import axios from '../../axios';

const Home = () => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const onFinish = (values) => {
        setEmail(values.email);
        setPassword(values.password);
      };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        const params = new URLSearchParams();
        params.append("func", "User-li");
        params.append("args", JSON.stringify({ Email: Email, Password: Password}));
        axios.post("", params)
        .then((response) => {
            let validar = JSON.stringify(response);
            if(validar.includes("Error|")){
                message.error(response.data);
            }
            else{
                message.success("Inicio de sesión");
            }
        })
        .catch(console.log("Error"))
    }, [Email, Password])
    
    return (
        <div className={styles.Home}>
            <div className ={styles.BgImage}/>
            <div className={styles.HomeCard}>
                <div className ={styles.HomeCardContent}>
                    <Image src = "http://henovenalfa.000webhostapp.com/resources/logo_henoven.png"/>
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
                        <Checkbox>Remember me</Checkbox>
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

export default Home;