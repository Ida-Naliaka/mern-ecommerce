import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { VisibilityOutlined } from "@material-ui/icons";
import { useEffect } from "react";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../redux/userRedux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://firebasestorage.googleapis.com/v0/b/ecommerce-clientside-6ebf6.appspot.com/o/cover.png?alt=media&token=8335a579-3d32-4981-9562-b6362426e422?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout());
    // eslint-disable-next-line
  }, []);

  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async () => {
    dispatch(loginStart());
    try {
      await axios
        .post(`/api/auth/login`, { email, password })
        .then((res) => {
          dispatch(loginSuccess(res.data));
          toast.success("login successful");
          navigate("/shop");
        })
        .catch((err) => {
          toast.error(err);
        });
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <Input
              placeholder="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{
                height: "fit-content",
                marginTop: "15px",
                color: "inherit",
              }}
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              <VisibilityOutlined />
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
            disabled={isFetching}
          >
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>Don't remember your Password?</Link>
          <Link
            to="/signup"
            style={{
              margin: "5px 0px",
              fontSize: "12px",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            CREATE A NEW ACCOUNT
          </Link>
        </Form>
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

export default Login;
