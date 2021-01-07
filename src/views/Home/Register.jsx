import React from 'react';
import styles from "./home.module.css"
import { Form, Input, Button, Image, message } from 'antd';
import { sha256 } from "js-sha256";
import axios from '../../axios';
import { useHistory } from 'react-router-dom';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const Register = ({onChange, doLogIn}) => {
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
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                message.error(response.data.Echo);
            }
            else{
                message.success("Registro exitoso");
                doLogIn({User: response.data});
                history.push("/teams");
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
                    <Image src = "http://henovenalfa.000webhostapp.com/resources/logo_henoven.png" style={{marginBottom: "15px"}} preview = {false}/>
                    <Form
                        name="basic"
                        initialValues={{
                        remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                        name="firstName"
                        rules={[
                            {
                            required: true,
                            message: 'Falta tu nombre',
                            },
                        ]}
                        >
                            <Input placeholder="Nombre/s"
                                prefix={<UserOutlined className="site-form-item-icon" />}/>
                        </Form.Item>
                        <Form.Item
                        name="lastName"
                        rules={[
                            {
                            required: true,
                            message: 'Falta tu apellido',
                            },
                        ]}
                        >
                            <Input placeholder="Apellido/s"
                            prefix={<UserOutlined className="site-form-item-icon" />}/>
                        </Form.Item>
                        <Form.Item
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingresa tu correo electrónico',
                            },
                        ]}
                        >
                            <Input placeholder="Email"
                            prefix={<MailOutlined className="site-form-item-icon" />}/>
                        </Form.Item>
                        <Form.Item
                        name="password1"
                        rules={[
                            {
                            required: true,
                            message: 'Falta tu contraseña',
                            },
                        ]}
                        >
                            <Input.Password placeholder="Contraseña"
                            prefix={<LockOutlined className="site-form-item-icon" />}/>
                        </Form.Item>
                        <Form.Item
                        name="password2"
                        rules={[
                            {
                            required: true,
                            message: 'Falta confirmar tu contraseña',
                            },
                        ]}
                        >
                            <Input.Password placeholder="Confirmar contraseña"
                            prefix={<LockOutlined className="site-form-item-icon" />}/>
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