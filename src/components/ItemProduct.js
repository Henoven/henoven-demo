import React, { useState } from 'react';
import { Button, Row, Col, Input, Popconfirm, Slider } from "antd";
import { DeleteOutlined, SaveFilled } from '@ant-design/icons';

const MinTemperature = -40;
const MaxTemperature = 100;

const ItemProduct = ({
    data,
    onSave,
    onDelete,
    idSection
}) =>{

    const [edited, setEdited] = useState(false);
    const [productName, setProductName] = useState(data.ProductName);
    const [minTemperature, setMinTemperature] = useState(data.MinTemperature);
    const [maxTemperature, setMaxTemperature] = useState(data.MaxTemperature);

    const marks = {
        [-40]: `${MinTemperature} °C`,
        [data.MinTemperature]:{ 
            label:`${data.MinTemperature} °C`,
            style:{
                marginRight:20
            }
        },
        [data.MaxTemperature]: { 
            label:`${data.MaxTemperature} °C`,
            style:{
                marginLeft:20
            }
        },
        100: {
          style: {
            color: '#f50',
          },
          label: <strong>{MaxTemperature}°C</strong>,
        },
    };


    const handleChangeText = (value) =>{
        setEdited(true);
        setProductName(value);
    };

    const handleOnSave = () =>{
        onSave(idSection, data.IdProduct, productName, maxTemperature, minTemperature);
        setEdited(false);
    };
    
    function formatter(value) {
        return `${value}°C`;
    }

    const handleRangeTemperature = (value) =>{
        setEdited(true);
        setMinTemperature(value[0]);
        setMaxTemperature(value[1]);
    };

    return(
        <Row    
            style={{ 
                height:60, 
                borderRadius:10, 
                borderColor:"#bcd6e8", 
                borderWidth:1,
                borderStyle:"solid", 
                flex:1, 
                marginLeft:5,
                marginRight:5
            }}
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
            <Col md={9}>
                <Slider 
                    range 
                    min={-40} 
                    max={100} 
                    marks={marks}
                    defaultValue={[data.MinTemperature, data.MaxTemperature]} 
                    style={{widht:200}}
                    onChange={handleRangeTemperature}
                    tipFormatter={formatter}
                />
            </Col>
            <Row justify="end" style={{flex:1, marginRight:5}}>
                <Popconfirm 
                    placement="topLeft"
                    title="¿Seguro que quieres eliminar este producto?"
                    okText="Sí"
                    onConfirm={()=> onDelete(data.IdProduct)}
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