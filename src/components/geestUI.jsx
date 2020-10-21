import React from 'react';
import styled from 'styled-components';
//import GeestLogoSVG from './../resources/img/GeestLogo.svg'
//import GeestLogoWhiteSVG from './../resources/img/GeestLogoWhite.svg'

const NOOP = () => {};

const ButtonBase = styled.button`
    background: ${({color}) => color};
    font-size: ${({fontSize}) => fontSize};
    border-radius: ${({borderRadius}) => borderRadius};
    color: white;
    font-weight: ${({fontWeight = "600"}) => fontWeight};
    font-family: 'Gotham-Book';
    border: none;
    padding: ${({padding}) => padding};
    outline: none;
    height: fit-content;
    cursor: pointer;
    :hover {
        opacity: 0.9;
    }
`;

export const Button = ({ size = "m", color = "blue" , children, onClick = NOOP, className = {} }) => {
    const colors = {
        "blue": "#2344E8",
        "green": "#4AE203",
        "whatsApp": "#41a43f",
    }
    const sizeStyles = {
        "s": {
            fontSize: "1.1vw",
            padding: "0.4vw 2.5vw",
            borderRadius: "25px",
        },
        "m": {
            fontSize: "2.2vw",
            padding: "0.6vw 1.8vw",
            borderRadius: "25px",
        },
        "l": {
            fontSize: "2.5vw",
            padding: "1.5vw 3vw",
            borderRadius: "70px",
        },
        "whatsApp": {
            fontSize: "1.6vw",
            padding: "0 0.5vw",
            borderRadius: "70px",
            fontWeight: "500",
        }
    }
    return (
        <ButtonBase {...sizeStyles[size]} color={colors[color]} onClick={onClick} className={className}>
            {children}
        </ButtonBase>
    )
}


export const GeestLogo = styled.div`
    height: 4.1rem;
    width: 11rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
`

export const GeestLogoWhite = styled(GeestLogo)`
    height: 6rem;
    width: 15rem;
    margin-bottom: 1.5rem;
    cursor: default;
`