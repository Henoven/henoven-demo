import React, { useEffect, useState } from 'react';
import { message, List } from 'antd';
import serviceServer from '../../api/serviceServer';
import { getDateFiltered } from '../../api/dateService';

import Modal from "../../components/Modals/Modal";
import CardNotification from '../Cards/CardNotification';

const NotificationsModal = ({
    onClose,
    userId,
    onOpenDetailTravel,
}) =>{

    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect((()=>{
        getNotifications();
    }), []);

    const getNotifications = () =>{
        setLoading(true);
        serviceServer("Team-gun", userId).then((response)=>{
            if(response.Request_Error){
                message.error(response.Request_Error);
            }
            else{
                setNotifications(response);
            }
        })
        .catch((error) => message.error(error))
        .finally(()=> setLoading(false));
    };

    const handleOnDeleteNotification = (IdNotification) =>{
        setLoading(true);
        const args = { IdNotification };
        serviceServer("Team-dun", userId, args).then((response)=>{
            if(response.Request_Error){
                message.error(response.Request_Error);
            }
            else{
                setNotifications(response);
            }
        })
        .catch((error) => message.error(error))
        .finally(()=> setLoading(false));
    };

    return(
        <Modal
            title="Notificaciones"
            visible
            onCancel={onClose}
        >
            <List
                style={{padding:10}}
                itemLayout="horizontal"
                loading = {loading}
                dataSource={notifications}
                key={(notification) => notification.IdNotification}
                renderItem={item => (
                    <CardNotification
                        title={item.Title}
                        body={item.Message}
                        date={getDateFiltered(item.Time)}
                        seen={item.Seen}
                        onDelete={()=> handleOnDeleteNotification(item.IdNotification)}
                        onClick={()=> onOpenDetailTravel({
                            IdTravel: item.IdTravel, 
                            IdNotification: item.IdNotification
                        })}
                    />
                )}
            />
        </Modal>
    );
};

export default NotificationsModal;