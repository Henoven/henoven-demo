import React from 'react';
import { Button, Row, Col, Input, Select, Typography } from "antd";
import { DeleteOutlined, DingtalkOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ItemSensor = () =>{
    return(
        <Row
            style={{ height:40, borderRadius:10, borderColor:"#bcd6e8", borderWidth:1 ,borderStyle:"solid", marginTop:5}}
            align="middle"
            gutter={16}>    
            <Col>
                <Title 
                    style={{marginTop:5}}
                    level={5}>
                    1
                </Title>
            </Col>
            <Col span={16}>
                <Input
                    prefix={<DingtalkOutlined style={{color:"gray", fontSize:30}}/>}
                    bordered={false}
                    style={{color:"yellow"}}
                    placeholder="Nombre sensor"
                />
            </Col>
            <Col flex={1}>
                <Select 
                    placeholder="Posición"
                    bordered={false}
                >

                </Select>
            </Col>
            <Col>
                <Button shape="circle" icon={<DeleteOutlined style={{color:"#e74d3d"}}/>}/>
            </Col>
        </Row>
    );
}

export default ItemSensor;