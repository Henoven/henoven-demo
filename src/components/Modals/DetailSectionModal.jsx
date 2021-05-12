import React, { useState } from 'react';
import { Button, Col, Input, message, Row, List, Slider,  Typography, Popconfirm, Tooltip } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import axios from "../../axios";

import Modal from "../../components/Modals/Modal";
import ItemProduct from '../ItemProduct';

const { Title } = Typography;

const minTemperature = -40;
const maxTemperature = 100;
const defaultMinimumTemperature = 0;
const defaultMaximumTemperature = 25;

const marks = {
    [minTemperature]: `${minTemperature}°C`,
    [defaultMinimumTemperature]: `${defaultMinimumTemperature}°C`,
    [defaultMaximumTemperature]:`${defaultMaximumTemperature}°C`,
    100: {
      style: {
        color: '#f50',
      },
      label: <strong>{maxTemperature}°C</strong>,
    },
};

const DetailSectionModal = ({ 
    onClose,
    section,
    userId,
}) =>{
    const [nameProduct, setNameProduct] = useState(null);
    const [minTemperature, setMinTemperature] = useState(defaultMinimumTemperature);
    const [maxTemperature, setMaxTemperature] = useState(defaultMaximumTemperature);
    const [sectionDetail, setSectionDetail] = useState(section ? section : null);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function formatter(value) {
        return `${value}°C`;
    }

    const handleRangeTemperature = (value) =>{
        setMinTemperature(value[0]);
        setMaxTemperature(value[1]);
    };

    const handleDeleteProduct = ( IdProduct )=>{
        const params = new URLSearchParams();
        params.append("func", "WH-dp");
        params.append("args", JSON.stringify({ 
            IdProduct
        }));
        params.append("IdUserIS", userId);
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            const messageToShow = response.data.Echo.split(":")[1];
            if (validate.includes("User|Error")) {
                message.error(messageToShow);
                return
            }
            else{
                setSectionDetail(response.data);
                message.success(messageToShow);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    };

    const handleAddProduct = () => {
        if(!nameProduct) {
            message.error("Falta el nombre del producto");
            return
        };
        const params = new URLSearchParams();
        params.append("func", "WH-ap");
        params.append("args", JSON.stringify({ 
            IdSection: section.IdSection,
            ProductName: nameProduct,
            MaxTemperature:maxTemperature,
            MinTemperature:minTemperature
        }));
        params.append("IdUserIS", userId);
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            const messageToShow = response.data.Echo.split(":")[1];
            if (validate.includes("User|Error")) {
                message.error(messageToShow);
                return
            }
            else{
                setSectionDetail(response.data);
                message.success(messageToShow);
            }
            setNameProduct(null);
            setMinTemperature(defaultMinimumTemperature);
            setMaxTemperature(defaultMaximumTemperature);
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleUpdateProduct = (IdSection, IdProduct, ProductName, MaxTemperature, MinTemperature) =>{
        const params = new URLSearchParams();
        params.append("func", "WH-up");
        params.append("args", JSON.stringify({ 
            // IdSection,
            IdProduct,
            ProductName,
            MaxTemperature,
            MinTemperature
        }));
        params.append("IdUserIS", userId);
        axios.post("", params)
        .then((response) => {
            let validate = JSON.stringify(response);
            const messageToShow = response.data.Echo.split(":")[1];
            if (validate.includes("User|Error")) {
                message.error(messageToShow);
                return
            }
            else{
                console.log(response.data);
                setSectionDetail(response.data);
                message.success(messageToShow);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    return(
        <Modal
            width="60%"
            title={section ? section.Name : ""}
            visible
            onCancel={onClose}
            footer={[
                <Popconfirm 
                    key={2}
                    placement="topLeft"
                    title="¿Seguro que quieres eliminar esta sección?"
                    okText="Sí"
                    onConfirm={()=> console.log("eliminar sección de almacén")}
                    cancelText="No"
                    >
                    <Button type="primary" danger>
                        Eliminar sección de almacén
                    </Button>
                </Popconfirm>,
            ]}
        >
            {sectionDetail &&   
                <>
                    <Title 
                        level={5}
                        style={{marginTop:20}}
                    >
                        Agregar producto a sección {sectionDetail.Name}:
                    </Title>
                    <Row
                        justify="space-between"
                    >
                       <Input 
                            placeholder="Nombre"
                            style={{ width: 300 }}
                            onChange={(e) => setNameProduct(e.target.value)}
                        />
                        <Col md={9}>
                            <h4>Rango de temperatura</h4>
                            <Slider 
                                range 
                                min={-40} 
                                max={100} 
                                marks={marks}
                                defaultValue={[defaultMinimumTemperature, defaultMaximumTemperature]} 
                                style={{widht:200}}
                                onChange={handleRangeTemperature}
                                tipFormatter={formatter}
                            />
                        </Col>
                        <Tooltip title="Agregar producto">
                            <Button   
                                style={{marginRight:10}}
                                shape="circle" 
                                icon={<PlusCircleOutlined style={{color:"#3498db", fontSize:25}}/>}
                                onClick={handleAddProduct} 
                            />
                        </Tooltip>
                    </Row>
                    <List
                        itemLayout="horizontal"
                        style={{
                            overflowY: "scroll",
                            overflowX:"hidden",
                            height:300
                        }}
                        dataSource={sectionDetail.products}
                        key={(product) => product.IdProduct}
                        renderItem={item => (
                            <List.Item style={{paddingBottom:1}}>
                                <ItemProduct
                                    idSection= {sectionDetail.IdSection}
                                    data={item}
                                    onSave={handleUpdateProduct}
                                    onDelete={handleDeleteProduct}
                                />
                            </List.Item>
                        )}
                    />
                </>
            }
        </Modal>
    );
};

export default DetailSectionModal;