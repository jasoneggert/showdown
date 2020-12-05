import React from "react";
import styled from "styled-components";
import deathSkull from "../../svgs/deathSkull";
import { Blob } from "react-blob";

const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo>
          <Blob
            size="90px"
            style={{
              position: "absolute",
              top: "-10px",
              right: "-22px",
              zIndex: -1,
              background: "#000",
              color: "white",
              fontSize: "50vh",
            }}
          />
          {deathSkull()}
        </Logo>
        <Title>The Recipe DeathMatch</Title>
      </LogoContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 24px;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 48px;
  height: 80px;
  margin-right: 36px;
  position: relative;
`;

const Title = styled.div`
  font-family: "Rakkas", cursive;
  font-size: 36px;
  color: #000;
  /* text-shadow: 2px 0px #01cdfe; */
`;

export default Header;
