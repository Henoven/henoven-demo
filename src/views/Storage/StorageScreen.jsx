import React, { useEffect, useState } from 'react';
import { Row, Col, Button, message, Typography, Spin } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import axios from "../../axios";

import CardSection from '../../components/Cards/CardSection';
import NewSectionModal from '../../components/Modals/NewSectionModal';
import DetailSectionModal from '../../components/Modals/DetailSectionModal';

const { Title } = Typography;

const StorageScreen = ({
    user
}) =>{
    const [loading, setLoading] = useState(false);
    const [warehouses, setWarehouses] = useState([]);
    const [idWarehouse, setIdWarehouse] = useState(null);
    const [sectionSelected, setSectionSelected] = useState(null);

    const [Modal, setModal] = useState(null);

    const handleClose = () =>{
        setModal(null);
        getWarehouseSections();
    };

    const Modals = {
        "newSectionModal": (
            <NewSectionModal  
                onOk={() => console.log("Ok")}
                onClose={()=> setModal(null)}
                userId={user.IdUser}
                IdWarehouse={idWarehouse}
                loadSections={()=> getWarehouseSections()}
            />
        ),
        "detailSectionModal": (
            <DetailSectionModal  
                onOk={() => console.log("Ok")}
                onClose={()=> handleClose()}
                userId={user.IdUser}
                section={sectionSelected}
                // IdWarehouse={idWarehouse}
                // loadSections={()=> getWarehouseSections()}
            />
        ),
    };
    
    useEffect(()=>{
        getWarehouseSections();
    }, []);

    const getWarehouseSections = () =>{
        setLoading(true);
        const params = new URLSearchParams();
        params.append("func", "WH-guw");
        params.append("IdUserIS", user.IdUser);
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                if(response.data) {
                    setWarehouses(response.data);
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
        .finally(()=> setLoading(false));
    };

    const handleOnSaveName = (IdSection, Name) =>{
        const params = new URLSearchParams();
        params.append("func", "WH-us");
        params.append("IdUserIS", user.IdUser);
        params.append("args", JSON.stringify({IdSection, Name}));
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            let validate = JSON.stringify(response)
            if (validate.includes("User|Error")) {
                const messageToShow = response.data.Echo.split(":")[1];
                message.error(messageToShow);
                setLoading(false);
                return;
            }
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.success(messageToShow[1]);
                getWarehouseSections();
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleOnDelete = (IdSection) =>{
        const params = new URLSearchParams();
        params.append("func", "WH-ds");
        params.append("IdUserIS", user.IdUser);
        params.append("args", JSON.stringify({IdSection}));
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.success(messageToShow[1]);
                if(response.data){
                    // console.log(response.data);
                    getWarehouseSections();
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
    };

    const handleOpenNewSectionModal = (IdWarehouse) => {
        setIdWarehouse(IdWarehouse);
        setModal("newSectionModal");
    };
    
    const handleOnConfigSection = (section) => {
        setSectionSelected(section);
        setModal("detailSectionModal");
    };

    return (
        <Spin spinning={loading}>
            {Modals[Modal]}
            <Col>
                {warehouses &&
                    warehouses.map((warehouse, index) =>(
                        <Col key={index} style={{margin:20}}>
                            <Row align="middle">
                                <Title level={5} style={{flex:1}}>{warehouse.TeamName}</Title>
                                <Button   
                                    style={{marginRight:10}}
                                    shape="circle" 
                                    icon={<PlusCircleOutlined style={{color:"#3498db", fontSize:25}}/>}
                                    onClick={()=> handleOpenNewSectionModal(warehouse.IdWarehouse)} 
                                />
                            </Row>
                            <Row gutter={16}>
                            {warehouse &&
                                warehouse.sections.map((section, indx) => (
                                    <Col 
                                        span={8}
                                        key={indx}
                                    >
                                        <CardSection
                                            nameSection={section.Name}
                                            numberOfProducts={section.NumberOfProducts}
                                            products={section.products}
                                            IdSection={section.IdSection}
                                            onSave={handleOnSaveName}
                                            onDelete={handleOnDelete}
                                            onConfigSection={() => handleOnConfigSection(section)}
                                            maxTemperature={parseFloat(section.MaxTemperatureAverage).toFixed(2)}
                                            minTemperature={parseFloat(section.MinTemperatureAverage).toFixed(2)}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    ))
                }
            </Col>
        </Spin>
    );
};

export default StorageScreen;
