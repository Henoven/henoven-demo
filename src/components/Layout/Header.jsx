import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, GeestLogo } from '../geestUI';
import routes from '../../routes';

const Container = styled(Row)`
    padding: 1.5rem;
    -webkit-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.5);
    -moz-box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.5);
    box-shadow: 0px 5px 15px 0px rgba(0,0,0,0.5);
    position: sticky;
`;

const Item = styled.span`
    margin: auto 1.5rem auto 0;
    font-size: 20px;
    color: ${({active}) => active ? "#2344E8" : "#131612"};
    font-weight: 600;
    font-family: 'Gotham-Book';
    cursor: pointer;
    :hover{
        color: #2344E8
    }
`;

const ButtonItem = styled(Button)`
    margin: auto 0;
`;

const Header = () => {
    
    const history = useHistory();
    const { pathname } = useLocation();

    const renderItems = () => routes.map(({ label, path, hidden }, key) => !hidden && (
        <Item 
            onClick={() => history.push(path)}
            active={pathname === path}
            key={key}
        >
            {label}
        </Item>
    ))

    return (
        <Container justify="space-between" >
            <GeestLogo onClick={() => history.push("/")} />
            <Row>
                {renderItems()}
                <ButtonItem size="s" onClick={() => window.location.href="https://app.geest.app"}>Iniciar sesión</ButtonItem>
            </Row>
        </Container>
    )
}

export default Header
