import React, { useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from "react-native";

export default function LoginScreen({navigation}) {
  let [token, setToken] = useState("no token yet");
  let [email, setEmail] = useState("Email");
  let [password, setPassword] = useState("Password");
  let [user, setUsername] = useState("");

  _handleLogin = () => {
    fetch("http://08547ccb.ngrok.io/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        _storeToken(data);
      })
      .catch(err => console.error(err));
  };

  _storeToken = async data => {
    try {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("username", data.username);
    } catch (err) {
      console.error(err);
    }
  };

  _fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const username = await AsyncStorage.getItem("username");
      if (token && username) {
        setToken(token);
        setUsername(username);
      } else {
        console.log("nothing in storage");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput value={email} onChangeText={text => setEmail(text)} />
      <TextInput value={password} onChangeText={text => setPassword(text)} />
      <Button title="Login" onPress={() => _handleLogin()} />
      <Button title="Fetch Info" onPress={() => _fetchToken()} />

      <Button
        title="Create an account"
        onPress={() => navigation.navigate("SignUp")}
      />
      <Text>{token}</Text>
      <Text>{user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
