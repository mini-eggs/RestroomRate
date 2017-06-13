import React from "react";
import { View } from "react-native";
import Styled from "styled-components/native";
import Button from "./button";
import Space from "./space";

const Container = Styled.View`
  padding-left: 25;
  padding-right: 25;
  padding-bottom: 100;
`;

const Input = Styled.View`
  border-style: solid;
  border-color: white;
  border-width: 2;
  border-radius: 3;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 25;
  padding-right: 25;
`;

const Text = Styled.Text`
  color: white;
  font-size: 18;
  text-align: center;
`;

export default () => (
  <Container>
    <Input>
      <Text white medium center>Email</Text>
    </Input>
    <Space />
    <Input>
      <Text white medium center>Password</Text>
    </Input>
    <Space />
    <Button primary>
      <Text white medium center>Login</Text>
    </Button>
  </Container>
);
