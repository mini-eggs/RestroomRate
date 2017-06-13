import React from "react";
import Styled from "styled-components/native";

const Button = Styled.TouchableHighlight`
  border-style: solid;
  border-color: white;
  border-width: 2;
  border-radius: 3;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 25;
  padding-right: 25;
`;

const PrimaryButton = Styled(Button)`
  background-color: red;
`;

export default function(props) {
  if (props.primary) {
    return <PrimaryButton {...props} />;
  }

  return <Button {...props} />;
}
