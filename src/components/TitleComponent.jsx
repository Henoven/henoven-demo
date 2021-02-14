import React from 'react';
import { Row } from 'antd';
import Title from 'antd/lib/typography/Title';

const TitleComponent = ({ required = false, children }) =>{

    return(
        <Row align="bottom">
            <Title level={5} style={{marginTop:20}} >
                {children}
            </Title>
            {required &&
                <Title level={5} style={{ marginTop:5, color:"red", textAlign:"center" }}>
                    *
                </Title>
            }
        </Row>
    );
};

export default TitleComponent;