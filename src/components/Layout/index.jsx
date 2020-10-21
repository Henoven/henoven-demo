import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
    /* background: #dbdbdb; */
    min-height: 66vh;
`

const Layout = ({ children }) => {
    return (
        <div>
            <Body>
                {children}
            </Body>
        </div>
    )
}

export default Layout
