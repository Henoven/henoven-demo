import React from 'react';
import { Badge, Button, Row } from 'antd';
import styled from "styled-components";
import Title from 'antd/lib/typography/Title';
import { 
    CloseOutlined
  } from '@ant-design/icons';

const Content = styled.div`
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    padding: 0.5rem;
    margin-top: 10px;
`;

const CardNotification = ({
    title,
    body,
    date,
    onClick,
    onDelete,
    seen
}) =>{
    return(
        <Content>
            <Row align="middle">
                <Title level={5} style={{flex:1}}>{title}</Title>
                <div style={{marginRight:10}}>{date}</div>
                <Badge status={!seen ? "default" : "processing"}/>
                <CloseOutlined onClick={onDelete}/>
            </Row>
            <div>{body}</div>
            <Row justify="end">
                <Button type="primary" ghost
                    onClick={onClick}
                >
                    Ver
                </Button>
            </Row>
        </Content>
    );
};

export default CardNotification;