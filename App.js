import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/LoginScreen";
import SignUpScreen from "./src/SignUpScreen";
import AuthLoadingScreen from "./src/AuthLoadingScreen";
import FeedScreen from "./src/FeedScreen";
import OtherScreen from "./src/OtherScreen";

const AppStack = createStackNavigator({
  Feed: FeedScreen,
  Other: OtherScreen,
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);