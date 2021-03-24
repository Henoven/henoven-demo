import React from 'react';
import { Row, Col, Button} from 'antd';
import { PlusCircleOutlined} from '@ant-design/icons';
import CardSection from '../../components/Cards/CardSection';

const StorageScreen = () =>{
    const length = 5;
    return (
        <>
            <Row justify="end" style={{margin:10}}>
                <Button   
                    style={{marginRight:10}}
                    shape="circle" 
                    icon={<PlusCircleOutlined style={{color:"#3498db", fontSize:25}}/>}
                    onClick={()=> console.log("Hola")} />
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <CardSection/>
                </Col>
                <Col span={8}>
                    <CardSection/>
                </Col>
                <Col span={8}>
                    <CardSection/>
                </Col>
                <Col span={8}>
                    <CardSection/>
                </Col>
            </Row>
        </>
    );
};

export default StorageScreen;
