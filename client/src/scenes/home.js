import React from "react";
import {
  Image,
  Animated,
  PanResponder,
  View,
  Dimensions,
  Easing
} from "react-native";
import Styled from "styled-components/native";
import Space from "../components/space";
import LoginForm from "../components/form.login";
import { Grid, Col, Row } from "native-base";

const Container = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

const Form = Styled.View`
  padding: 25px;
  padding-bottom: 150px;
  justify-content: center;
  align-items: stretch;
`;

const size = 350;

const ImageStyles = {
  position: "absolute",
  bottom: size / -2 + 50,
  right: size / -2 + 50,
  width: size,
  height: size
};

const { width, height } = Dimensions.get("window");

const Test = Styled.View`
  height: ${height};
  width: ${width};
  background-color: #f1f1f1;
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

const gridStyle = Styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: ${height * 2};
  width: ${width * 2};
`;

export default class extends React.Component {
  position = new Animated.Value(0);

  state = { position: 0 };

  panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      // gestureState.d{x,y} will be set to zero now
    },
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}
      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
      const { width } = Dimensions.get("window");
      const { dx } = gestureState;
      const position = dx / width;

      Animated.timing(this.position, {
        toValue: this.state.position + position,
        duration: 0,
        useNativeDriver: true
      }).start();
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      const { width } = Dimensions.get("window");
      const { dx } = gestureState;
      const newPosition = dx / width;

      this.setState(({ position }) => {
        const nextPosition = Math.round(position + newPosition * 1.5);

        Animated.timing(this.position, {
          toValue: nextPosition,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.bezier(0, 0, 0.58, 1)
        }).start();

        return { position: nextPosition };
      });
    },
    onPanResponderTerminate: (evt, gestureState) => {},
    onShouldBlockNativeResponder: (evt, gestureState) => {
      return true;
    }
  });

  render() {
    const interpolatedRotateAnimation = this.position.interpolate({
      inputRange: [-4, 4],
      outputRange: ["-360deg", "360deg"]
    });

    return (
      <Container {...this.panResponder.panHandlers}>
        <Animated.View
          style={{
            height: height * 2,
            width: width * 2,
            position: "absolute",
            top: 0,
            left: 0,
            transform: [{ rotate: interpolatedRotateAnimation }]
          }}
        >
          <Grid>
            <Row>
              <Test style={{ backgroundColor: "purple" }}>
                <LoginForm />
              </Test>
              <Test
                style={{
                  backgroundColor: "blue",
                  transform: [
                    { rotate: "90deg" },
                    { translateX: width / 2.58 },
                    { translateY: height * -0.218 }
                  ]
                }}
              >
                <LoginForm />
              </Test>
            </Row>
            <Row>
              <Test
                style={{
                  backgroundColor: "yellow",
                  transform: [
                    { rotate: "-90deg" },
                    { translateX: width / 2.58 },
                    { translateY: height * -0.218 }
                  ]
                }}
              >
                <LoginForm />
              </Test>
              <Test
                style={{
                  backgroundColor: "red",
                  transform: [{ rotate: "180deg" }]
                }}
              >
                <LoginForm />
              </Test>
            </Row>
          </Grid>
        </Animated.View>
        <Animated.Image
          style={{
            ...ImageStyles,
            transform: [{ rotate: interpolatedRotateAnimation }]
          }}
          source={{ uri: "https://i.imgur.com/ncYeJco.png" }}
        />
      </Container>
    );
  }
}
