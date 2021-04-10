import React, { useState } from 'react';
import { Button, Row, Col, Input, Select, Typography, Popconfirm } from "antd";
import { DeleteOutlined, DingtalkOutlined, SaveFilled } from '@ant-design/icons';

const { Title } = Typography;

const TemperatureOptions = () => {
    const minTemperature = -40;
    const maxTemperature = 100;
    let temperatureOptions = [];
    for(var i= minTemperature; i <= maxTemperature; i++){
        temperatureOptions.push({
            Label: `${i} °C`,
            Value:i
        });
    }
    return temperatureOptions;
};

const ItemProduct = ({
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
            gutter={5}
            justify="space-between"
        >    
            <Col md={8}>
                <Input
                    bordered={false}
                    placeholder={data.ProductName}
                    onChange={(e) => handleChangeText(e.target.value)}
                />
            </Col>
            <Select 
                allowClear
                showSearch
                style={{ width: 200 }}
                placeholder="Temperatura máxima"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => handleSelect(value)}
            >
                {
                    TemperatureOptions().map((option, index) =>
                    <Select.Option 
                        key={index} 
                        value={option.Value}
                    >
                        {option.Label}
                    </Select.Option>
                    )
                }
            </Select>
            <Select 
                allowClear
                showSearch
                style={{ width: 200, marginLeft:10 }}
                placeholder="Temperatura mínima"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => handleSelect(value)}
            >
                {
                    TemperatureOptions().map((option, index) =>
                    <Select.Option 
                        key={index} 
                        value={option.Value}
                    >
                        {option.Label}
                    </Select.Option>
                    )
                }
            </Select>
            <Row justify="end" style={{flex:1, marginRight:5}}>
                <Popconfirm 
                    placement="topLeft"
                    title="¿Seguro que quieres desvincular el sensor?"
                    okText="Sí"
                    onConfirm={()=> onUnlink(data.IdSensor)}
                    cancelText="No"
                    >
                    <Button shape="circle" icon={<DeleteOutlined style={{color:"#e74d3d"}}/>}/>
                </Popconfirm>
                {
                    edited &&
                    <Popconfirm 
                        placement="topLeft"
                        title="¿Guardar cambios?"
                        okText="Sí"
                        onConfirm={()=> handleOnSave()}
                        cancelText="No"
                        >
                        <Button shape="circle" icon={<SaveFilled style={{color:"#808080"}}/>}/>
                    </Popconfirm>
                }
            </Row>
        </Row>
    );
}

export default ItemProduct;