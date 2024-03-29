import React, { useState } from 'react';
import styles from "./home.module.css"
import { Form, Input, Button, Image, message, Row, } from 'antd';
import { sha256 } from "js-sha256";
import axios from "../../axios";
import { useHistory } from 'react-router-dom';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const Login = ({onChange, doLogIn}) => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
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
                doLogIn({User: response.data});
                history.push("/travels");
            }
        })
        .catch(console.log("Error"))
        .finally(()=> setLoading(false));
      };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Falta correo electrónico',
                            },
                        ]}
                        >
                            <Input placeholder="Email"
                                 prefix={<MailOutlined className="site-form-item-icon" />}/>
                        </Form.Item>
                        <Form.Item
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Falta contraseña',
                            },
                        ]}
                        >
                            <Input.Password placeholder="Contraseña"
                                            prefix={<LockOutlined className="site-form-item-icon" />}/>
                        </Form.Item>
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                style={{width:"100%"}}
                                loading={loading}
                            >
                                Iniciar sesión
                            </Button>
                        </Form.Item>
                        <Row justify="center" align="middle">
                            <div>¿No tienes cuenta?</div>
                            <Button type="link" htmlType="button" onClick={()=> onChange("register")}>
                                    Registrarse
                            </Button>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;