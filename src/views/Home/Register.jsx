import React, { useState } from 'react';
import styles from "./home.module.css"
import { Form, Input, Button, Image, message, Row } from 'antd';
import { sha256 } from "js-sha256";
import axios from '../../axios';
import { useHistory } from 'react-router-dom';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';

const Register = ({onChange, doLogIn}) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        const arePasswordEquals = ArePasswordEquals(values.password1, values.password2);
        if(!arePasswordEquals){
            message.error("Contraseñas diferentes");
            return;
        }
        setLoading(true);
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
                history.push("/travels");
            }
        })
        .catch(console.log("Error 123"))
        .finally(()=> setLoading(false));
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
                    <Row justify="center">  
                        <Image 
                            src = "http://henovenalfa.000webhostapp.com/resources/logo_henoven.png" 
                            preview = {false} 
                            style={{marginBottom: "15px"}}
                            height={"50%"}
                            width={"80%"}
                        />
                    </Row>
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
                            <Input.Password 
                                placeholder="Confirmar contraseña"
                                prefix={<LockOutlined className="site-form-item-icon" />
                                }
                            />
                        </Form.Item>
                        <Form.Item  name="remember" valuePropName="checked">
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            style={{width:"100%"}}
                            loading={loading}
                        >
                                Registrarse
                            </Button>
                        </Form.Item>
                        <Row justify="center" align="middle">
                            <div>¿Ya tienes cuenta?</div>
                            <Button type="link" htmlType="button" onClick={()=> onChange("login")}>
                                    Iniciar sesión
                            </Button>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;