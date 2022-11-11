import React from "react";
import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import FooterNewsLetter from "./FooterNewsLetter";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
//#E97451
const Footer = () => {
  return (
    <div style={{ background: "black", color: "white" }}>
      <Container>
        <Left>
          <Logo>ANGIE</Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </Desc>

          <SocialContainer>
            <a
              href="https://github.com/Ida-Naliaka"
              style={{ textDecoration: "none" }}
            >
              <SocialIcon color="3B5999">
                <Facebook />
              </SocialIcon>
            </a>
            <a href="https://github.com/Ida-Naliaka">
              <SocialIcon color="E4405F">
                <Instagram />
              </SocialIcon>
            </a>
            <a href="https://github.com/Ida-Naliaka">
              <SocialIcon color="55ACEE">
                <Twitter />
              </SocialIcon>
            </a>
            <a href="https://github.com/Ida-Naliaka">
              <SocialIcon color="E60023">
                <Pinterest />
              </SocialIcon>
            </a>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <div style={{ flex: "50%" }}>
              <List>
                <Link to={"/"}>
                  <ListItem>Our Website</ListItem>
                </Link>
                <Link to={"/shop"}>
                  <ListItem>Shop</ListItem>
                </Link>
                <Link to={"/cart"}>
                  <ListItem>Cart</ListItem>
                </Link>
                <Link to={"/products"}>
                  <ListItem>All Products</ListItem>
                </Link>
                <Link to={"/aboutus"}>
                  <ListItem>About Us</ListItem>
                </Link>
                <Link to={"/branchmap"}>
                  <ListItem>Find A Branch</ListItem>
                </Link>
              </List>
            </div>
            <div style={{ flex: "50%" }}>
              <List>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
              </List>
            </div>
          </div>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: "10px" }} /> 622 Dixie Path , South
            Tobinchester 98336
          </ContactItem>
          <ContactItem>
            <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <MailOutline style={{ marginRight: "10px" }} /> contact@angie.com
          </ContactItem>
          <FooterNewsLetter />
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
      Powered by React Designed by IdaDev| All Rights Reserved
    </div>
  );
};

export default Footer;
