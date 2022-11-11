import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const NavContainer = styled.div`
  height: 80px;
  position: sticky;
  ${mobile({ height: "50px" })}
`;

const NavWrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ display: "none" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const AboutNav = () => {
  return (
    <NavContainer>
      <NavWrapper>
        <Left>
          <Logo>ANGIE</Logo>
        </Left>
        <Right>
          <MenuItem>Home</MenuItem>
          <Link to="#about">
            <MenuItem>About Us</MenuItem>
          </Link>
          <Link to="#tutorials">
            <MenuItem>Our Blogs</MenuItem>
          </Link>

          <MenuItem>Clearance Sale</MenuItem>
          <MenuItem>Shop Pre-Owned equipment</MenuItem>
          <Link to="/shop">
            <MenuItem>Our Shop</MenuItem>
          </Link>
        </Right>
      </NavWrapper>
    </NavContainer>
  );
};

export default AboutNav;
