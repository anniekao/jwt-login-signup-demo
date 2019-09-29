import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/LoginScreen";
import SignUpScreen from "./src/SignUpScreen";

const AppNavigator = createStackNavigator(
  {
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
  },
  {
    initialRoute: "Login"
  }
);

export default createAppContainer(AppNavigator);
