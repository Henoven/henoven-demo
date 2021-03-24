import React, { useState } from 'react';
import { Card, Input, Popconfirm, Row } from 'antd';
import { SettingOutlined, DeleteOutlined, SaveOutlined} from '@ant-design/icons';
import { Avatar, Collapse, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { AcUnitOutlined, StorefrontOutlined, WhatshotOutlined } from '@material-ui/icons';

const CardSection = ({
    nameSection = "Carnes frías",
    maxTemperature = "10",
    minTemperature = "-20",
    numberOfProducts = "48",
    products,
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
                    <SettingOutlined key="setting" />,
                save &&<SaveOutlined key="edit" style={{color:"blue"}}/>,
                <Popconfirm
                placement="top"
                title="¿Quieres eliminar esta sección de almacén?"
                okText="Sí"
                onConfirm={()=> console.log("hola")}
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
            <div style={{ maxHeight:"400px"}}>
                <Row justify="space-between">
                    <List style={{width:"100%"}}>
                        <ListItem>
                            <ListItemAvatar >
                                    <Avatar style={{backgroundColor:"red"}}>
                                        <WhatshotOutlined />
                                    </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Temperatura máxima" secondary={`${maxTemperature}°C`} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar >
                                    <Avatar style={{backgroundColor:"blue"}}>
                                        <AcUnitOutlined />
                                    </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Temperatura mínima" secondary={`${minTemperature}°C`}  />
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
                            <List component="div" disablePadding>
                            <ListItem button >
                                            <ListItemText primary="Ribeye" />
                                        </ListItem>
                            <ListItem button >
                                            <ListItemText primary="Diesmillo" />
                                        </ListItem>
                                {/* {products &&
                                    products.map((product, index) => (
                                        <ListItem button key={index}>
                                            <ListItemText primary={product.ProductName} />
                                        </ListItem>
                                    ))
                                } */}
                            </List>
                        </Collapse>
                    </List>
                </Row>
            </div>
        </Card>
    );
}

export default CardSection;