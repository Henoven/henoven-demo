import React, {useState, useEffect} from 'react';
import { Modal, Input, Button, message, Select, Typography } from "antd";
import axios from "../../axios";

const { Option } = Select;
const { Title } = Typography;
 
const TravelDetail = ({ 
    onClose, 
    userId, 
    refreshTeams
}) =>{

    return(
        <Modal
            title="Detalle de viaje"
            visible
            onCancel={onClose}
            footer={[
                <Button 
                    key={0} 
                    onClick={onClose}>
                    Cancelar
                </Button>,
                <Button 
                    key={1}
                    // loading={Loading}
                    type="primary" 
                    // onClick={handleRegisterNewDevice}
                    >
                    Registrar
                </Button>,
            ]}
        >
            <div>Hola</div>
        </Modal>
        );
}

export default TravelDetail;