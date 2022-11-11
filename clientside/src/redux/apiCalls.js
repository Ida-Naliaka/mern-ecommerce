import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import axios from "axios";
/*import { useDispatch, useSelector } from "react-redux";
import { cartDeleted, cartSuccess } from "./cartRedux";*/

export const UserLogin = async (dispatch, user) => {
  dispatch(loginStart());
  const navigate = useNavigate();

  try {
    const res = await axios.post("/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/shop");
  } catch (error) {
    dispatch(loginFailure());
  }
};
/*
export const FindCart = async () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  try {
    const res = await axios.get("/api/carts/findcart", { userId: user._id });
    dispatch(cartSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};
export const UpdateCart = async (dispatch, product, quantity) => {
  const user = useSelector((state) => state.user.currentUser);
  try {
    await axios
      .put(`/api/carts/${user._id}`, { product: product, quantity: quantity })
      .then((res) => {
        if (res.data) dispatch(cartSuccess(res.data));
      });
  } catch (error) {
    alert("error");
    console.log(error);
  }
};
export const CreateCart = async (dispatch, product, quantity) => {
  const user = useSelector((state) => state.user.currentUser);
  try {
    const newCart = {
      userId: user._id,
      products: [{ product: product, quantity: quantity }],
    };
    await axios.put(`/api/carts`, newCart).then((res) => {
      if (res.data) dispatch(cartSuccess(res.data));
    });
  } catch (error) {
    alert("error");
    console.log(error);
  }
};
export const DeleteCart = async (dispatch) => {
  const user = useSelector((state) => state.user.currentUser);
  try {
    await axios.delete(`/api/carts/${user._id}`).then(() => {
      dispatch(cartDeleted());
    });
  } catch (error) {
    alert("error");
    console.log(error);
  }
};
*/
