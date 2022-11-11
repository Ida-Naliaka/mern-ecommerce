import React from "react";
import styled from "styled-components";
import {
  PersonOutlined,
  CalendarTodayOutlined,
  MonetizationOn,
  CreditCardTwoTone,
  VerifiedUser,
  ShoppingCart,
  Motorcycle,
} from "@material-ui/icons";
import Slider from "../Components/Slider";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const NavContainer = styled.nav`
  height: 80px;
  top: 0;
  background: white;
  width: 100%;
  padding-bottom: 20px;
  z-index: 4;
  position: fixed;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  ${mobile({ height: "50px" })}
`;
const NavWrapper = styled.div`
  margin-right: 10%;
  margin-left: 5%;
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
  font-family: "Satisfy", cursive;
  font-size: 40px;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const AboutSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 20px auto;
  font-family: "Bitter", serif;
  font-size: 20px;
  width: 80%;
  line-height: 52px;
  ${mobile({ fontSize: "12px", marginLeft: "10px", lineHeight: "32px" })}
`;
const InfoWidget = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  ${mobile({ display: "flex", flexDirection: "column", margin: "10px auto" })}
`;
const Section = styled.div`
  display: flex;
  text-align: center;
  padding: 10px;
  width: 40%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Bitter", serif;
  font-weight: 300;
`;
const AboutTitle = styled.h4`
  font-family: "Dancing Script", cursive;
  font-size: 24px;
  ${mobile({ fontSize: "18px" })}
`;
const BlogContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-tems: center;
  height: fit-content;
  ${mobile({ flexDirection: "column", marginBottom: "20px" })}
`;
const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  z-index: 1;
  font-family: "Dancing Script", cursive;
  font-weight: 300;
  font-size: 20px;
  ${mobile({ width: "200px", height: "280px", fontSize: "15px" })}
`;
const BlogImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: 250px;
  width: 100%;
  padding: 10px;
  z-index: 2;
  &:hover {
    transform: scale(1.05);
  }
  ${mobile({ height: "180px", width: "280px" })}
`;
const InfoContainer = styled.span`
  position: absolute;
  top: 68%;
  left: 12%;
  z-index: 3;
  background-color: #e97451;
  width: 280px;
  height: fit-content;
  padding: 10px 15px;
  display: flex;
  border-radius: 20px;
  justify-content: space-around;
  line-height: 1px;
  font-family: "Bitter", serif;
  font-size: 18px;
  ${mobile({ display: "none" })}
`;
const Description = styled.div`
  position: absolute;
  top: 82%;
  z-index: 2;
  font-size: 20px;
  padding: 5px;
  text-align: center ${mobile({ fontSize: "15px", top: "70%" })};
`;

const LandingPage = () => {
  return (
    <>
      <NavContainer>
        <NavWrapper>
          <Left>
            <Logo>IdaWafula</Logo>
          </Left>
          <Right>
            <MenuItem>Home</MenuItem>
            <a href="#about" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>About Us</MenuItem>
            </a>
            <a
              href="#tutorials"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>Our Blogs</MenuItem>
            </a>
            <Link to="/shop" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>Clearance Sale</MenuItem>
            </Link>
            <Link to="/shop" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>Our Shop</MenuItem>
            </Link>
          </Right>
        </NavWrapper>
      </NavContainer>
      <Slider />
      <AboutSection id="about">
        <h1 style={{ fontFamily: "'Satisfy', cursive" }}>About Us</h1>
        There are many variations of passages of Lorem Ipsum available,but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet.
      </AboutSection>
      <InfoWidget>
        <Section>
          <Motorcycle style={{ fontSize: "70px", color: "#E97451" }} />
          <AboutTitle>Shipping and Return</AboutTitle>
          If your Equipment isn't perfect, return it within 30days for a full
          refund
        </Section>
        <Section>
          <CreditCardTwoTone style={{ fontSize: "60px", color: "#E97451" }} />
          <AboutTitle>Safe Payment</AboutTitle>
          Pay with the world's most popular and secure Payment methods
        </Section>
        <Section>
          <ShoppingCart style={{ fontSize: "60px", color: "#E97451" }} />
          <AboutTitle>Shop with Confidence</AboutTitle>
          Our Buyer Protection covers your purchase from click to delivery
        </Section>
        <Section>
          <MonetizationOn style={{ fontSize: "60px", color: "#E97451" }} />
          <AboutTitle>Pocket Friendly</AboutTitle>
          You dont have to break the bank to achieve quality. Our products are
          pocket friendly.
        </Section>
        <Section>
          <VerifiedUser style={{ fontSize: "60px", color: "#E97451" }} />
          <AboutTitle>Quality Assurance</AboutTitle>
          We Deliver Fresh Ingredients and Quality Equipment and Bakeware and
        </Section>
      </InfoWidget>
      <div
        id="tutorials"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontFamily: "'Satisfy', cursive" }}>Our Blogs</h1>
        <BlogContainer>
          <Container>
            <a href="https://github.com/Ida-Naliaka">
              <BlogImage src="https://static.wixstatic.com/media/9fba69_718b1df0bf064779afd15c4d8aa5cdc9~mv2.jpg/v1/crop/x_0,y_281,w_2187,h_1619/fill/w_558,h_412,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/IMG_7225_edited_edited.jpg" />
            </a>
            <InfoContainer>
              <div style={{ display: "flex" }}>
                {" "}
                <PersonOutlined />
                <div style={{ marginTop: "10px" }}>Admin</div>
              </div>
              <div style={{ display: "flex" }}>
                <CalendarTodayOutlined />
                <div style={{ marginTop: "10px" }}>11 January, 2022</div>
              </div>
            </InfoContainer>
            <Description>Cake And Pastries Design Ideas</Description>
          </Container>
          <Container>
            <a href="https://github.com/Ida-Naliaka">
              <BlogImage src="https://www.livewellbakeoften.com/wp-content/uploads/2017/02/Homemade-Whipped-Cream-7.jpg" />
            </a>
            <InfoContainer>
              <div style={{ display: "flex" }}>
                {" "}
                <PersonOutlined />
                <div style={{ marginTop: "10px" }}>Admin</div>
              </div>
              <div style={{ display: "flex" }}>
                <CalendarTodayOutlined />
                <div style={{ marginTop: "10px" }}>11 January, 2022</div>
              </div>
            </InfoContainer>
            <Description>
              How to use Powder Whipping Cream. Dos and Donts
            </Description>
          </Container>
          <Container>
            <a href="https://github.com/Ida-Naliaka">
              <BlogImage src="https://sc02.alicdn.com/kf/Hcb05898249124e5994cdcd3b7d36aceaE/239655347/Hcb05898249124e5994cdcd3b7d36aceaE.jpg" />
            </a>
            <InfoContainer>
              <div style={{ display: "flex" }}>
                {" "}
                <PersonOutlined />
                <div style={{ marginTop: "10px" }}>Admin</div>
              </div>
              <div style={{ display: "flex" }}>
                <CalendarTodayOutlined />
                <div style={{ marginTop: "10px" }}>11 January, 2022</div>
              </div>
            </InfoContainer>
            <Description>DIY Cake Boxes for Custom Heights</Description>
          </Container>
        </BlogContainer>
        <AboutSection>
          {" "}
          For more Tutorials, Visit our{" "}
          <a href="www.google.com">youtube channel</a>
        </AboutSection>
      </div>
      <Footer />
    </>
  );
};
export default LandingPage;
