import React, {useEffect, useState} from 'react';
import { 
  Table, 
  Row, 
  Button, 
  Tag,
  Tooltip,
  message,
  Badge
} from "antd";
import { withRouter } from 'react-router-dom';
import { 
  EditOutlined, 
  PlusCircleOutlined,
  BellOutlined
} from '@ant-design/icons';
import serviceServer from "../../../api/serviceServer";
import axios from "../../../axios";

import NewTeamModal from "../../../components/Modals/NewTravel";
import TravelDetail from '../../../components/Modals/TravelDetail';
import { getDateFiltered } from '../../../api/dateService';
import NotificationsModal from '../../../components/Modals/NotificationsModal';

const Statuses = {
  ON_PROGRESS:"on progress",
  FINISHED: "finished",
};

const StatusColor = {
  [Statuses.ON_PROGRESS]: "cyan",
  [Statuses.FINISHED]:"green",
};
  

const MINUTE_MS = 60000;

const CurrentTravels = ({user}) =>{

  const [Modal, setModal] = useState(null);
  const [travels, setTravels] = useState([]);
  const [travelSelected, setTravelSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lengthPendingNotifications, setLengthPendingNotifications] = useState(0);

  const Data = (() => travels?.map((d, key) => ({ ...d, key })))();

  const columns = [
    // {
    //   title: 'Nombre',
    //   dataIndex: 'name',
    //   key: 'name',
    // },
    {
      title: 'Estatus',
      dataIndex: 'Status',
      key: 'status',
      render: (record) => (
        <Tag color={StatusColor[record]}>
          {record}
        </Tag>
      )
    },
    {
      title: 'Tipo de viaje',
      dataIndex: 'TravelExecution',
      key: 'travelType',
    },
    {
      title: 'Fecha de inicio',
      dataIndex: 'StartTime',
      key: 'startTime',
      render: (record) => (
        <span >
          {getDateFiltered(record)}
        </span>
      )
    },
    {
      title: 'Fecha de llegada',
      dataIndex: 'EndTime',
      key: 'endTime',
      render: (record) => (
        <span >
          {record ? getDateFiltered(record) : "En progreso"}
        </span>
      )
    },
    {
      title: 'Información',
      dataIndex: 'IdTravel',
      key: 'detail',
      render: (text, record) => (
        <Button   
          style={{marginRight:10}}
          shape="circle" 
          icon={<EditOutlined style={{color:"#3498db"}}/>}
          onClick={()=> handleOpenTravelDetail(record)} />
      ),
    },
  ];

  const handleOpenTravelDetail = (travel) =>{
    setModal("travelDetail");
    setTravelSelected(travel);
  };

  const handleOpenTravelDetailFromNotification = (travel) =>{
    setModal("travelDetail");
    setTravelSelected(travel);
    deleteNotification(travel.IdNotification);
  };

  const Modals = {
    "newTravelModal": <NewTeamModal 
                        onClose={()=>setModal(null)}
                        userId={user.IdUser}  
                        setTravels={setTravels}
                      />,
    "travelDetail": <TravelDetail 
                        onClose={()=>setModal(null)}
                        userId={user.IdUser}  
                        travel={travelSelected}
                        setTravels={setTravels}
                    />,
    "notificationsModal": <NotificationsModal
                            onClose={()=> setModal(null)}  
                            userId={user.IdUser}
                            onOpenDetailTravel={(value) => handleOpenTravelDetailFromNotification(value)}
                          />
  };

  useEffect(()=> {
    getTravels();
    getNotificationsLength();
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      getTravels();
      getNotificationsLength();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const deleteNotification = (IdNotification) =>{
    serviceServer("Team-dun", user.IdUser, { IdNotification }).then((response) =>{
      if(response.Request_Error){
        message.error(response.Request_Error);
      }
      else{
        if(response?.Echo){
          message.error(response.Echo);
          return;
        }
      }
    });
  }

  const getNotificationsLength = () =>{
    serviceServer("Team-gunn", user.IdUser).then((response) =>{
      if(response.Request_Error){
        message.error(response.Request_Error);
      }
      else{
        if(response?.Echo){
          message.error(response.Echo);
          return;
        }
        setLengthPendingNotifications(response);
      }
    });
  }

  const getTravels = () =>{
    setLoading(true);
    const params = new URLSearchParams();
    params.append("func", "Travel-gut");
    params.append("IdUserIS", user.IdUser);
    axios.post("", params)
    .then((response) => {
        const messageFromDB = response.data.Echo !== null ? response.data.Echo : "";
        if(messageFromDB){
            const messageToShow =  response.data.Echo.split(":");
            message.error(messageToShow[1]);
        }
        else{
          setTravels(response.data);
        }
    })
    .catch((error) => {
      console.log("Error", error);
    })
    .finally(()=> setLoading(false))
  };

  return  (
    <>
      { Modals[Modal] }
      <Row 
            align="middle" 
            justify="end" 
            style={{marginTop:10, marginBottom:10}}>
            <Badge count={lengthPendingNotifications} style={{marginRight:20}}>
              <Button 
                shape="circle" 
                icon={<BellOutlined style={{color:"orange", fontSize:25}}/>}
                onClick={()=> setModal("notificationsModal")} 
                style={{marginRight:20}}/>
            </Badge>
            <Tooltip title="Comenzar un nuevo viaje">
              <Button 
                shape="circle" 
                icon={<PlusCircleOutlined style={{color:"#3498db", fontSize:25}}/>}
                onClick={()=> setModal("newTravelModal")} />
            </Tooltip>
      </Row>
      <Table 
        loading={loading}
        dataSource={Data} 
        columns={columns} 
        scroll={{ x: 800, y: 400 }}
        loading={loading}
      />
    </>
);
}
export default withRouter(CurrentTravels);