import React, {useEffect, useState} from 'react';
import { 
  Table, 
  Input, 
  Typography, 
  Row, 
  Col, 
  Select, 
  DatePicker, 
  Button, 
  Tag,
  Tooltip,
  message
} from "antd";
import { withRouter } from 'react-router-dom';
import { 
  EditOutlined, 
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

import axios from "../../../axios";

import NewTeamModal from "../../../components/Modals/NewTravel";
import TravelDetail from '../../../components/Modals/TravelDetail';

const {Search} = Input;
const {Title}=Typography;

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

  const Data = (() => travels.map((d, key) => ({ ...d, key })))();

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
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
    },
    {
      title: 'Fecha de llegada',
      dataIndex: 'EndTime',
      key: 'endTime',
    },
    {
      title: 'Detalle',
      dataIndex: 'IdTravel',
      key: 'detail',
      render: (text, record) => (
        <Button   
          style={{marginRight:10}}
          shape="circle" 
          icon={<EditOutlined style={{color:"#3498db"}}/>}
          onClick={()=> setModal("travelDetail")} />
      ),
    },
  ];

  const Modals = {
    "newTravelModal": <NewTeamModal 
                        onClose={()=>setModal(null)}/>,
    "travelDetail": <TravelDetail 
                        onClose={()=>setModal(null)}/>
  };

  useEffect(() => {
    getTravels();
  }, []);

  const getTravels = () =>{
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
          const { Travels } = response.data[0];
          setTravels(Travels)
        }
    })
    .catch((error) => {
      console.log("Error", error);
    })
  };

  return  (
    <>
      { Modals[Modal] }
      <Row 
            align="middle" 
            justify="end" 
            style={{marginTop:10, marginBottom:10}}>
            <Tooltip title="Crear nuevo equipo">
                <Button 
                    shape="circle" 
                    icon={<PlusCircleOutlined style={{color:"#3498db", fontSize:25}}/>}
                    onClick={()=> setModal("newTravelModal")} />
            </Tooltip>
      </Row>
      <Search style={{marginBottom:20}}/>
      <Title level={5}>Filtrar por</Title>
      <Row 
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} 
        align="middle" 
        style={{marginBottom:10}}>
          <Col >
              <Select placeholder="Estatus"/>
          </Col>
          <Col>
              <Select placeholder="Tipo de viaje"/>
          </Col>
          <Col >
              <Select placeholder="Destino"/>
          </Col>
          <Col >
              <DatePicker placeholder="Fecha de inicio"/>
          </Col>
      </Row>
      <Table 
        dataSource={Data} 
        columns={columns} 
        scroll={{ x: 800, y: 280 }} />
    </>
);
}
export default withRouter(CurrentTravels);