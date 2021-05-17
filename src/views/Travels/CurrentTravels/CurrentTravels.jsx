import React, {useEffect, useState} from 'react';
import { 
  Table, 
  Row, 
  Button, 
  Tag,
  Tooltip,
  message
} from "antd";
import { withRouter } from 'react-router-dom';
import { 
  EditOutlined, 
  PlusCircleOutlined
} from '@ant-design/icons';

import axios from "../../../axios";

import NewTeamModal from "../../../components/Modals/NewTravel";
import TravelDetail from '../../../components/Modals/TravelDetail';
import { getDateFiltered } from '../../../api/dateService';

const Statuses = {
  STARTED: "started",
  STUCK: "stuck",
  COMPLETED: "completed",
  CANCELED: "canceled",
  NEW: "new",
  WAITING: "waiting",
  ON_PROGRESS:"on progress"
};

const StatusColor = {
  [Statuses.STARTED]: "cyan",
  [Statuses.STUCK]: "red",
  [Statuses.COMPLETED]: "green",
  [Statuses.CANCELED]: "orange",
  [Statuses.NEW]: "gray",
  [Statuses.WAITING]: "warning",
};
  


const CurrentTravels = ({user}) =>{

  const [Modal, setModal] = useState(null);
  const [travels, setTravels] = useState([]);
  const [travelSelected, setTravelSelected] = useState(null);
  const [loading, setLoading] = useState(false);

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
                    />
  };

  useEffect(() => {
    getTravels();
  }, []);

  const handleOpenTravelDetail = (travel) =>{
    setModal("travelDetail");
    setTravelSelected(travel)
  };

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
          const { Travels } = response.data;
          setTravels(Travels)
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