import React from 'react';
import styles from "./home.module.css"
import { Form, Input, Button, Image, message } from 'antd';
import { sha256 } from "js-sha256";
import axios from '../../axios';
import { useHistory } from 'react-router-dom';

const Register = ({onChange}) => {
    const history = useHistory();

    const onFinish = (values) => {
        const arePasswordEquals = ArePasswordEquals(values.password1, values.password2);
        if(!arePasswordEquals){
            message.error("Contraseñas diferentes");
            return;
        }
        const params = new URLSearchParams();
        params.append("func", "User-rnu");
        params.append("args", JSON.stringify(
            {
                FirstName: values.firstName,
                LastName: values.lastName,
                Email: values.email, 
                Password: sha256(values.password1),
                Birthday : "1999-12-07"
            }));
        axios.post("", params)
        .then((response) => {
            let validar = JSON.stringify(response);
            if(validar.includes("User|Error")){
                const messageToShow =  response.data.split(':');
                message.error(messageToShow[1]);
            }
            else{
                message.success("Registro exitoso");
                history.push("/mainPage");
            }
        })
        .catch(console.log("Error 123"))
      };
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };
    const ArePasswordEquals = (password1, password2) =>{
        return password1.localeCompare(password2) === 0;
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
                        label="Nombre/s"
                        name="firstName"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingresa tu nombre',
                            },
                        ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Apellido/s"
                        name="lastName"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingresa tu apellido',
                            },
                        ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingresa tu correo electrónico',
                            },
                        ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                        label="Contraseña"
                        name="password1"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingresa tu contraseña',
                            },
                        ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                        label="Confirmar contraseña"
                        name="password2"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor confirma tu contraseña',
                            },
                        ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="default" htmlType="button" onClick={()=> onChange("login")}>
                                Iniciar sesión
                            </Button>
                        </Form.Item>
                        <Form.Item  name="remember" valuePropName="checked">
                        <Button type="primary" htmlType="submit">
                                Registrarse
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;