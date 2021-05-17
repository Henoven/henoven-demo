import React, { useState, useEffect} from 'react';
import { Input, Button, message, Select, Spin} from "antd";
import axios from "../../axios";
import TextArea from 'antd/lib/input/TextArea';
import TitleComponent from '../TitleComponent';

import Modal from "../../components/Modals/Modal";

const {Option} = Select;

const NewTravel = ({ 
    onClose, 
    userId, 
    setTravels
}) =>{
    
    const [Loading, setLoading] = useState(false);
    const [loadingSections, setLoadingSections] = useState(false);

    const [idTeamSelected, setIdTeamSelected] = useState(null);
    const [idSection, setIdSection] = useState(null);
    const [idDeviceSelected, setIdDeviceSelected] = useState(null);
    const [startPoint, setStartPoint] = useState(null);
    const [destiny, setDestiny] = useState(null);
    const [products, setProducts] = useState(null);
    const [teams, setTeams] = useState([]);
    const [devices, setDevices] = useState([]);
    const [sections, setSections] = useState([]);
    const [productsFromSection, setProductsFromSection] = useState([]);
    const [productsSelected, setProductsSelected] = useState([]);
    

    useEffect(() => {
        getTeams();
        getDevices();
    },[]);

    useEffect(() => {
        getSectionsOfTeam();
    },[idTeamSelected, setIdTeamSelected]);
    
    useEffect(() => {
        getProductsFromSection();
    },[idSection, setIdSection]);

    const getProductsFromSection = () =>{
        if(!idSection){
            setProductsFromSection([]);
            return;
        }
        const newProducts = sections.find((section) => section.IdSection === idSection).products;
        const nameProducts = newProducts.map((product) => product.ProductName);
        setProductsFromSection(newProducts);
        setProductsSelected(nameProducts);
    };

    const getSectionsOfTeam = () =>{
        if(!idTeamSelected) return;
        setLoadingSections(true);
        const args = JSON.stringify({
            IdTeam: idTeamSelected,
        });
        const params = new URLSearchParams();
        params.append("func", "Travel-gptl");
        params.append("IdUserIS", userId);
        params.append("args", args);
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                setSections(response.data);
                setProductsSelected([]);
                setProducts([]);
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
        .finally(()=> setLoadingSections(false));
    };

    const getTeams = () =>{
        setLoading(true);
        const params = new URLSearchParams();
        params.append("func", "Team-gutai");
        params.append("IdUserIS", userId);
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { Teams } = response.data;
                if(response.data) {
                    setTeams(Teams);
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
        .finally(() => setLoading(false));
    };

    const getDevices = () =>{
        setLoading(true);
        const params = new URLSearchParams();
        params.append("func", "MB-gumbs");
        params.append("IdUserIS", userId);
        axios.post("", params)
        .then((response) => {
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { UserMotherBoards } = response.data;
                if(response.data) {
                    setDevices(UserMotherBoards);
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
        .finally(() => setLoading(false));
    };

    const handleStartTravel = () =>{
        if(!areRequiredValuesFilled()){
            message.error("Faltan campos por llenar");
            return;
        }
        setLoading(true);
        const args = JSON.stringify({
            IdTeam: idTeamSelected,
            IdMotherBoard: idDeviceSelected,
            StartPoint: startPoint,
            Destiny: destiny,
            Products: products
        });
        const params = new URLSearchParams();
        params.append("func", "Travel-ct");
        params.append("IdUserIS", userId);
        params.append("args", args);
        axios.post("", params)
        .then((response) => {
            setLoading(false);
            const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
            if(messageFromDB?.includes("Error")){
                const messageToShow =  response.data.Echo.split(":");
                message.error(messageToShow[1]);
            }
            else{
                const { Travels, Echo } = response.data;
                if(response.data) {
                    setTravels(Travels);
                    message.success(Echo);
                    onClose();
                }
            }
        })
        .catch((error) => {
          console.log("Error", error);
        })
        .finally(()=> setLoading(false));
    };

    const handleIdTeam = (value) =>{
        setIdTeamSelected(value);
        setIdSection(null);
    };

    const areRequiredValuesFilled = () =>{
        return idTeamSelected !== null && idDeviceSelected !== null && startPoint !== null && destiny !== null;
    };

    const handleIdSectionSelected = (value) =>{
        setIdSection(value);
    };

    const handleProductsSelected = (value) =>{
        setProductsSelected(value);
        const newProducts = [];
        for(let productName of value){
            const newProduct = productsFromSection.find((product) => product.ProductName === productName);
            newProducts.push(newProduct);
        }
        setProducts(newProducts);
    }

    return(
        <Modal
            title="Nuevo viaje"
            visible
            onCancel={onClose}
            footer={[
                <Button 
                    onClick={onClose} 
                    loading={Loading}
                >
                    Cancelar
                </Button>,
                <Button 
                    loading={Loading}
                    type="primary" 
                    onClick={()=> handleStartTravel()}
                >
                    Iniciar
                </Button>,
            ]}
        >   
            <Spin spinning={loadingSections}>
                <TitleComponent required={true}>
                    Equipos
                </TitleComponent>
                <Select
                    // allowClear
                    showSearch
                    placeholder="Seleccionar un equipo"
                    optionFilterProp="children"
                    onChange={(value) => handleIdTeam(value)}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        teams.map((team) =>
                            <Option 
                                key={team.IdTeam}
                                value={team.IdTeam}>
                                    {team.TeamName}
                            </Option>
                        )
                    }
                </Select>
                <TitleComponent required={true}>
                    Dispositivos
                </TitleComponent>
                <Select
                    allowClear
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Seleccionar un dispositivo"
                    optionFilterProp="children"
                    onChange={(value) => setIdDeviceSelected(value)}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        devices.map((device) =>
                            <Option 
                                key={device.IdMotherBoard}
                                value={device.IdMotherBoard}>
                                    {device.Name}
                            </Option>
                        )
                    }
                </Select>
                <TitleComponent required={true}>
                    Punto de partida
                </TitleComponent>
                <Input
                    placeholder="Ingresar el domicilio del punto de partida"
                    onChange={(e) => setStartPoint(e.target.value)}
                />
                <TitleComponent required={true}>
                    Destino
                </TitleComponent>
                <Input
                    placeholder="Ingresar el domicilio del destino"
                    onChange={(e) => setDestiny(e.target.value)}
                />
                <TitleComponent >
                    Sección de almacén
                </TitleComponent>
                <Select
                    allowClear
                    showSearch
                    value={idSection}
                    style={{ width: 200 }}
                    placeholder="Seleccionar sección de almacén"
                    optionFilterProp="children"
                    onChange={handleIdSectionSelected}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        sections.map((section) =>
                            <Option 
                                key={section.IdSection}
                                value={section.IdSection}>
                                    {section.Name}
                            </Option>
                        )
                    }
                </Select>
                <TitleComponent>
                    Productos (primero elija una sección de almacén)
                </TitleComponent>
                <Select
                    allowClear
                    showSearch
                    disabled={!idSection ? true : false}
                    mode="multiple"
                    value={productsSelected}
                    style={{ width: 200 }}
                    placeholder="Seleccionar productos de sección"
                    optionFilterProp="children"
                    onChange={handleProductsSelected}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        productsFromSection.map((item) =>
                            <Option 
                                key={item.IdProduct}
                                value={item.ProductName}>
                                    {item.ProductName}
                            </Option>
                        )
                    }
                </Select>
            </Spin>
        </Modal>
        );
}

export default NewTravel;