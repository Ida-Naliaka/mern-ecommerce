import React, { useState } from "react";
import { ActiveTabState } from "../../Context/ActiveTabProvider";
import "./firstandsecond.css";
import { VisibilityOutlined } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRequest } from "../../requestMethods";

const SecondTab = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [show, setShow] = useState(false);

  const { setActiveTab } = ActiveTabState();
  const handleSubmit = async () => {
    const paswd = new RegExp("(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !title ||
      !phone ||
      !location
    ) {
      toast.warning("Please Fill all the Fields.");
    }
    if (password.match(paswd)) {
      if (password !== confirmPassword) {
        toast.warning("Passwords Do Not Match!");
      }
      try {
        await publicRequest
          .post(`/auth/registeradmin`, {
            name,
            email,
            password,
            title,
            phone,
            location,
          })
          .then(() => {
            toast.success("Successfully Signed Up.Please Verify your Email");
          });
      } catch (error) {
        toast.error(`${error.message}`);
      }
    } else {
      toast.warning("Please Set a Stronger Password!");
    }
  };
  return (
    <div
      className="newUser tab content2"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 3,
        justifyContent: "center",
      }}
    >
      <h1 className="newUserTitle">New User Registration</h1>
      <form
        className="newUserForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            value={name}
            placeholder="Enter your Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>

          <input
            type="email"
            placeholder="john@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <div style={{ display: "flex" }}>
            <input
              type={show ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{ height: "fit-content", marginLeft: "5px" }}
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              <VisibilityOutlined />
            </div>
          </div>
        </div>
        <div className="newUserItem">
          <label> Confirm Password</label>
          <div style={{ display: "flex" }}>
            <input
              type={show ? "text" : "password"}
              placeholder=" Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              style={{ height: "fit-content", marginLeft: "5px" }}
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              <VisibilityOutlined />
            </div>
          </div>
        </div>
        <div className="newUserItem">
          <label> Title</label>
          <input
            type="text"
            placeholder=" Enter your title. eg. developer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label> Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <label> Location</label>
          <input
            type="text"
            placeholder=" Your Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button className="newUserButton" type="submit">
          Create
        </button>
        <div style={{ display: "flex" }}>
          Already have an account?
          <button
            className="register-btn"
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>{" "}
        </div>
      </form>
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
    </div>
  );
};
export default SecondTab;
