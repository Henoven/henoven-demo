import React, { useState } from 'react';
import { Button, Row, Col, Input, Select, Typography, Popconfirm } from "antd";
import { DeleteOutlined, DingtalkOutlined, SaveFilled } from '@ant-design/icons';

const { Title } = Typography;

const PositionOptions = [
    {Label:"Atras", Value:"back"},
    {Label:"Centro", Value:"middle"},
    {Label:"Adelante", Value:"front"}
];

const ItemSensor = ({
    data,
    onSave,
    onUnlink
}) =>{

    const [edited, setEdited] = useState(false);
    const [nameSensor, setNameSensor] = useState(data.Name);
    const [positionSelected, setPositionSelected] = useState(data.Position);

    const handleSelect = (value) =>{
        setEdited(true);
        setPositionSelected(value);
    };

    const handleChangeText = (value) =>{
        setEdited(true);
        setNameSensor(value);
    };

    const handleOnSave = () =>{
        onSave(data.IdSensor, nameSensor, positionSelected);
        setEdited(false);
    }
    return(
        <Row    
            style={{ height:40, borderRadius:10, borderColor:"#bcd6e8", borderWidth:1 ,borderStyle:"solid", marginTop:5,flex:1}}
            align="middle"
            gutter={5}>    
            <Col xs={6}>
                <Input
                    prefix={<DingtalkOutlined style={{color:"gray", fontSize:30}}/>}
                    bordered={false}
                    style={{color:"yellow"}}
                    placeholder={data.Name}
                    onChange={(e) => handleChangeText(e.target.value)}
                />
            </Col>
            <Col xs={6}>
                <Title 
                    style={{marginTop:5}}
                    level={5}>
                    {data.SerialNumber}
                </Title>
            </Col>
            <Col xs={6}>
                <Title 
                    style={{marginTop:5}}
                    level={5}>
                    {data.SensorModel}
                </Title>
            </Col>
            <Col span={4}>
                <Select 
                    defaultValue={data.Position}
                    placeholder="Posición"
                    onChange={(value) => handleSelect(value)}
                >
                    {
                        PositionOptions.map((option, index) =>
                        <Select.Option 
                            key={index} 
                            value={option.Value}
                        >
                            {option.Label}
                        </Select.Option>
                        )
                    }
                </Select>
            </Col>
            <Col xs={1}>
                <Popconfirm 
                    placement="topLeft"
                    title="¿Seguro que quieres desvincular el sensor?"
                    okText="Sí"
                    onConfirm={()=> onUnlink(data.IdSensor)}
                    cancelText="No"
                    >
                    <Button shape="circle" icon={<DeleteOutlined style={{color:"#e74d3d"}}/>}/>
                </Popconfirm>
            </Col>
            {
                edited &&
                <Col xs={1}>
                    <Popconfirm 
                        placement="topLeft"
                        title="¿Guardar cambios?"
                        okText="Sí"
                        onConfirm={()=> handleOnSave()}
                        cancelText="No"
                        >
                        <Button shape="circle" icon={<SaveFilled style={{color:"#808080"}}/>}/>
                    </Popconfirm>
                </Col>
            }
        </Row>
    );
}

export default ItemSensor;