import React from 'react';
import styled from 'styled-components';
import DeathSkull from '../../svgs/DeathSkull'

const HeaderContainer = styled.div`
    width: 100%;
    background: red;
    height: 100px;
`
const Header =({title}) => {
    return <HeaderContainer>{title}</HeaderContainer>
};

export default Header;