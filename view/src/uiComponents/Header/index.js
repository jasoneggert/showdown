import React from 'react';
import styled from 'styled-components';
import deathSkull from '../../svgs/deathSkull'
import { Blob } from 'react-blob'

const HeaderContainer = styled.div`
    width: 100%;
    height: 100px;
    padding-top: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Logo = styled.div`
    width: 48px;
    height: 80px;
    margin-right: 36px;
    position: relative;
`;

const Title = styled.div`
    font-family: 'Creepster', cursive;
    font-size: 36px;
`;


const Header = ({ title }) => {
    return <HeaderContainer>

        <Logo><Blob size="90px"
            style={{
                position: 'absolute',
                top: '-10px',
                right: '-22px',
                zIndex: -1,
                backgroundColor: '#21D4FD',
                color: 'white',
                fontSize: '50vh',
            }}
        />{deathSkull()}</Logo><Title>{title}</Title></HeaderContainer >
};

export default Header;