import React from "react";
import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 100px;
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ height: "80px" })}
`;

const Desc = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 15px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const FooterNewsLetter = () => {
  return (
    <Container>
      <Desc>Subscribe to our NewsLetter</Desc>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default FooterNewsLetter;
