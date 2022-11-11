import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  uploadBytesResumable,
  ref,
  getStorage,
  getDownloadURL,
} from "firebase/storage";
import { VisibilityOutlined } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  width: 100vw;
  height: 100vh;/
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handlePic = async (file) => {
    const fileName = new Date().getTime() + "newuser";
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setPic(downloadURL);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };
  const handleSubmit = async () => {
    const paswd = new RegExp("(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
    if (!name || !email || !password || !confirmPassword) {
      alert("Please Fill all the Fields.");
      return;
    }
    if (password.match(paswd)) {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      try {
        await axios
          .post(`/api/auth/register`, {
            name: name,
            email: email,
            password: password,
            phone: phone,
            city: city,
            pic: pic,
          })
          .then(() => {
            toast.success("Registration Successful! Please check your email");
            navigate("/login");
          });
      } catch (error) {
        toast.error(`Error Occured ${error}`);
      }
    } else {
      toast.warning("Please set a strong password");
      return;
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="Full name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            isRequired
          />
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            isRequired
          />
          <div style={{ display: "flex" }}>
            <Input
              placeholder="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              isRequired
            />
            <div
              style={{ height: "fit-content", marginTop: "25px" }}
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              <VisibilityOutlined />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <Input
              placeholder="Confirm Password"
              type={show ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              isRequired
            />
            <div
              style={{ height: "fit-content", marginTop: "25px" }}
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              <VisibilityOutlined />
            </div>
          </div>
          <Input
            placeholder="Phone Number"
            type="text"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            isRequired
          />
          <Input
            placeholder="City"
            type="city"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            isRequired
          />
          <Input
            type="file"
            onChange={(e) => {
              handlePic(e.target.files[0]);
            }}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the{" "}
            <b>
              <a href="https://github.com/Ida-Naliaka">PRIVACY POLICY</a>
            </b>
          </Agreement>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            CREATE
          </Button>
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

export default Signup;
