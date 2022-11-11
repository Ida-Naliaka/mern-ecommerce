import React, { useState } from "react";
import { ActiveTabState } from "../../Context/ActiveTabProvider";
import "./firstandsecond.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginFailure, loginStart, loginSuccess } from "../../Redux/userRedux";
import { publicRequest } from "../../requestMethods";

const FirstTab = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setActiveTab } = ActiveTabState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all the fields!");
    }
    dispatch(loginStart());
    await publicRequest
      .post("/auth/loginadmin", { email: email, password: password })
      .then((data) => {
        dispatch(loginSuccess(data.data));
        toast.success("Successfully Logged In");
        navigate("/home");
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };

  return (
    <div
      contents-for="login"
      className="login-div"
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 3,
        justifyContent: "center",
      }}
    >
      <h1>Login to proceed</h1>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="email"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ display: "flex" }}>
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            style={{
              height: "fit-content",
              marginLeft: "5px",
              marginTop: "5px",
              fontSize: "15px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              setShow(!show);
              e.preventDefault();
            }}
          >
            {show ? "Hide" : "Show"}
          </div>
        </div>
        <button
          className="login-btn"
          type="submit"
          style={{ padding: 10, width: 100 }}
        >
          Login
        </button>
      </form>
      <div style={{ display: "flex" }}>
        Not a user?{" "}
        <button className="register-btn" onClick={() => setActiveTab("signup")}>
          Register here
        </button>
      </div>
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
export default FirstTab;
