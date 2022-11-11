import { Smartphone } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import { mobile } from "../../responsive";

const Choice = styled.option`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  margin: 10px;
`;
const Selector = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: fit-content ${mobile({ width: "80%", flexDirection: "column" })};
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #e97451;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
`;
const MpesaButton = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px;
  background-color: green;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PaymentCard = () => {
  const [payment, setPayment] = useState("card");
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const [phone, setPhone] = useState(user.phone);
  const navigate = useNavigate();
  const KEY =
    "pk_test_51LwigmHrQFfXoYu84CCBlCE3mtcuVgKzjmhCIpZpa9AILk2lMQROB6ShCU406iNd2zBoUItr2JgGKWBBpxXqH3E400xGdBuIDe";

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        await axios
          .post(
            "/checkout/payment",
            {
              tokenId: stripeToken.id,
              amount: 500,
            },
            config
          )
          .then((res) => {
            navigate("/success", {
              stripeData: res.data,
              products: cart,
            });
          });
      } catch {}
    };
    stripeToken && makeRequest();
    // eslint-disable-next-line
  }, [stripeToken, cart.total]);
  const Lipanampesa = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        "api/mpesa/lipa-na-mpesa",
        {
          phone: phone,
          total: cart.total,
        },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ColumnDiv>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4>Choose payment method below</h4>
        <Selector>
          <select
            name="payment"
            id="payment"
            label="Select a Payment Method"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setPayment(e.target.value)}
          >
            <Choice value="card">Pay with Card</Choice>
            <Choice value="mpesa">Pay with Mpesa </Choice>
          </select>
        </Selector>
      </div>
      {payment === "mpesa" && (
        <ColumnDiv>
          <ColumnDiv>
            <label for="phone" style={{ marginBottom: "10px" }}>
              Please Enter Your Mpesa Number
            </label>
            <input
              id="phone"
              type="text"
              placeholder="+25471234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </ColumnDiv>
          <Selector>
            <MpesaButton onClick={Lipanampesa}>
              Proceed to Payment
              <Smartphone />
            </MpesaButton>
          </Selector>
        </ColumnDiv>
      )}
      {payment === "card" && (
        <StripeCheckout
          name="IdaWafula Shop"
          image="https://avatars.githubusercontent.com/u/1486366?v=4"
          billingAddress
          shippingAddress
          description={`Your total is $${cart.total}`}
          amount={cart.total * 100}
          token={onToken}
          stripeKey={KEY}
        >
          <Button>CHECKOUT NOW</Button>
        </StripeCheckout>
      )}
    </ColumnDiv>
  );
};

export default PaymentCard;
