import React, { useState } from 'react';
import { Card, Col, Input, Popconfirm, Row } from 'antd';
import { SettingOutlined, DeleteOutlined, SaveOutlined} from '@ant-design/icons';
import { Avatar, Collapse, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { AcUnitOutlined, StorefrontOutlined, WhatshotOutlined } from '@material-ui/icons';

const ProductItem = ({
    product,
}) =>{
    return(
        <ListItem button >
            <Row align="middle" gutter={20}>
                <Col
                    span={8}
                >
                    <ListItemText primary={product.ProductName} style={{columnSpan:8}}/>
                </Col>
                <Col
                    span={8}
                >
                    <ListItemText primary="Temperatura máxima" style={{columnSpan:8}}/>
                    <ListItemText secondary={`${product.MaxTemperature}°C`} style={{columnSpan:8}}/>
                </Col>
                <Col
                    span={8}
                >
                    <ListItemText primary="Temperatura mínima" style={{columnSpan:8}}/>
                    <ListItemText secondary={`${product.MinTemperature}°C`} style={{columnSpan:8}}/>
                </Col>
            </Row>
        </ListItem>
    );
};

const CardSection = ({
    nameSection,
    maxTemperature = "10",
    minTemperature = "-20",
    numberOfProducts,
    products,
    onSave,
    onDelete,
    IdSection,
    onConfigSection
}) =>{
    
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(nameSection);
    const [save, setSave] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const handleOnChange = (e) =>{
        setName(e.target.value);
        setSave(true);
    };

    const handleOnSave = () =>{
        onSave(IdSection, name);
        setSave(false);
    }

    return(
        <Card 
            title={
                <Input 
                    placeholder="Escriba nombre de equipo" 
                    bordered={false} 
                    value={name} 
                    onChange={handleOnChange}
                    size="large"
                />
            }
            bordered={false}
            actions={[
                    <SettingOutlined key="setting" onClick={onConfigSection}/>,
                save &&<SaveOutlined key="edit" style={{color:"blue"}} onClick={handleOnSave}/>,
                <Popconfirm
                    placement="top"
                    title="¿Quieres eliminar esta sección de almacén?"
                    okText="Sí"
                    onConfirm={() => onDelete(IdSection)}
                    cancelText="No"
                >
                    <DeleteOutlined key="ellipsis" style={{color:"red"}}/>
                </Popconfirm>,
            ]}
            style={{
                marginTop:20,
                boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)"
            }}
        >
            <div >
                <Row justify="space-between">
                    <List style={{width:"100%"}}>
                        <ListItem>
                            <ListItemAvatar >
                                    <Avatar style={{backgroundColor:"red"}}>
                                        <WhatshotOutlined />
                                    </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Temperatura máxima promedio" secondary={`${maxTemperature}°C`} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar >
                                    <Avatar style={{backgroundColor:"blue"}}>
                                        <AcUnitOutlined />
                                    </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Temperatura mínima promedio" secondary={`${minTemperature}°C`}  />
                        </ListItem>
                        <ListItem button onClick={handleClick} >
                            <ListItemAvatar >
                                <Avatar style={{backgroundColor:"orange"}}>
                                    <StorefrontOutlined />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Productos" secondary={numberOfProducts} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List style={{overflowY: products.length >=5 ? "scroll" : "hidden", maxHeight:400}}>
                                {products &&
                                    products.map((product, index) => (
                                        <ProductItem
                                            product={product}
                                            key={index}
                                        />
                                    ))
                                }
                            </List>
                        </Collapse>
                    </List>
                </Row>
            </div>
        </Card>
    );
}

export default CardSection;