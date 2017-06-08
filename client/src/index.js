import React from "react";
import { AppRegistry } from "react-native";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import { offline } from "redux-offline";
import offlineConfig from "redux-offline/lib/defaults";
import { StackNavigator } from "react-navigation";
import Reducers from "./reducers/";
import Routes from "./router";

const Router = StackNavigator(Routes);
const middlewares = compose(applyMiddleware(Thunk), offline(offlineConfig));
const store = createStore(combineReducers(Reducers), middlewares);

function RestroomRate() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

AppRegistry.registerComponent("RestroomRate", () => RestroomRate);
