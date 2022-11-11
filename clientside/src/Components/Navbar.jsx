import React from "react";
import { Badge } from "@material-ui/core";
import {
  Person,
  Search,
  PersonAddOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../redux/userRedux";
import ReactTooltip from "react-tooltip";

const Container = styled.div`
  height: 80px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
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
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-family: "Satisfy", cursive;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  display: flex;
  align-items: center;

  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const RightItems = styled.div`
  display: flex;
  justify-content: space-around;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 18px;
  cursor: pointer;
  color: black;
  margin-left: 25px;
  ${mobile({ fontSize: "16px", marginLeft: "10px" })}
`;
const SpanContainer = styled.span`
  background-color: white;
  color: black;
  font-size: 18px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  padding: 10px 15px;
  margin: 10px;
  display: flex;
  border-radius: 20px;
  justify-content: space-around;
  line-height: 1px;
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const user = useSelector((state) => state.user.currentUser);
  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handleDelete = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .delete(`/api/users/${user._id}`, config)
      .then((res) => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Search item" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>IdaWafula</Logo>
        </Center>
        <Right>
          <RightItems>
            <Link to="/" style={{ textDecoration: "none" }}>
              <MenuItem>Our Website</MenuItem>
            </Link>
            <Link to="/branchmap" style={{ textDecoration: "none" }}>
              <MenuItem>Find a Branch</MenuItem>
            </Link>
            <Link to="/cart">
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </RightItems>
          {user ? (
            <>
              <Person
                data-tip
                data-for="logoutTip"
                data-event="click"
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  marginLeft: "25px",
                }}
              />
              <ReactTooltip
                id="logoutTip"
                place="bottom"
                effect="solid"
                clickable={true}
              >
                <SpanContainer onClick={() => handleLogOut()}>
                  Logout
                </SpanContainer>
                <SpanContainer onClick={() => handleDelete()}>
                  Delete{" "}
                </SpanContainer>
              </ReactTooltip>
            </>
          ) : (
            <>
              <PersonAddOutlined
                data-tip
                data-for="registerTip"
                data-event="click"
              />
              <ReactTooltip
                id="registerTip"
                place="bottom"
                effect="solid"
                clickable={true}
              >
                <SpanContainer>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    {" "}
                    <MenuItem>REGISTER</MenuItem>{" "}
                  </Link>
                </SpanContainer>
                <SpanContainer>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <MenuItem>SIGN IN</MenuItem>
                  </Link>
                </SpanContainer>
              </ReactTooltip>
            </>
          )}
        </Right>
      </Wrapper>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default Navbar;
