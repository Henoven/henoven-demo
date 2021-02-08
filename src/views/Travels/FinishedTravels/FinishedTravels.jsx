import React from 'react';
import { Table, Input, Typography, Row, Col, Select, DatePicker} from "antd";
import { withRouter } from 'react-router-dom';

const {Search} = Input;
const {Title}=Typography;

const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

const FinishedTravels = ({...rest}) =>{
    
return  (
    <>
        <Search style={{marginBottom:20}}/>
        <Title level={5}>Filtrar por</Title>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align="middle" >
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
        <Table dataSource={dataSource} columns={columns} />
    </>
);
}
export default withRouter(FinishedTravels);