import React, { useState } from 'react';
import {Row, Button, Tooltip, Popconfirm, Checkbox} from "antd";
import { PlusOutlined, DeleteOutlined} from '@ant-design/icons';

const CardUser = ({title, onDeleteTeammate, user}) =>{
    
    const [collapse, setCollapse] = useState();
    const optionsWithDisabled = [
        { label: 'Permisos para editar equipo', value: 'Apple' },
        { label: 'Permisos para ver viajes', value: 'Pear' },
        { label: 'Permisos para editar', value: 'Orange', disabled: false },
    ];
    function handleOnChangeChecked(checkedValues){
        console.log('checked = ', checkedValues);
    }

    return(
        <div style={{flexDirection:"column", flex:1, justifyContent:"space-around"}}>
             <Row 
                style={{
                    backgroundColor: "white", 
                    width:"100%", 
                    height:"40px", 
                    fontSize:15, 
                    color:"#606060"
                }} 
                align="middle">
                <Button  
                    icon={<PlusOutlined 
                    style={{
                        color:"gray", 
                        fontSize:20
                    }}
                    onClick={()=> setCollapse(!collapse)}/>} />
                <span style={{marginLeft:25, textAlign:"start", flex:"auto"}}>{title}</span>
                <Tooltip title="Eliminar">
                    <Popconfirm 
                        placement="top"
                        title="¿Seguro que quieres eliminarlo del equipo?"
                        okText="Sí"
                        onConfirm={() => onDeleteTeammate(user)}
                        cancelText="No"
                        >
                        <Button 
                            shape="circle" 
                            icon={<DeleteOutlined style={{color:"#e74d3d"}}/>} />
                    </Popconfirm>
                </Tooltip>           
            </Row>
            {collapse && 
            <Checkbox.Group 
                options={optionsWithDisabled}
                onChange={handleOnChangeChecked}/>
            }
        </div>
    );
}

export default CardUser;