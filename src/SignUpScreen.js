import React, { useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from "react-native";

export default function SignupScreen({navigation}) {
  let [token, setToken] = useState("no token yet");
  let [email, setEmail] = useState("Email");
  let [password, setPassword] = useState("Password");
  let [password_confirm, setPasswordConfirm] = useState(
    "Password Confirmation"
  );
  let [user, setUsername] = useState("");
  let [name, setName] = useState("Name");
  let [errorMessage, setErrorMessage] = useState("");

  _handleSignup = () => {
    console.log("=======handle login", name, email, password, password_confirm);
    if (password === password_confirm) {
      fetch("http://08547ccb.ngrok.io/users/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirm
        })
      })
        .then(res => res.json())
        .then(data => {
          _storeToken(data);
        })
        .catch(err => console.error(err));
    } else {
      setErrorMessage("Passwords do not match");
    }
    
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
      <TextInput value={name} onChangeText={text => setName(text)} />
      <TextInput value={email} onChangeText={text => setEmail(text)} />
      <TextInput value={password} onChangeText={text => setPassword(text)} />
      <TextInput
        value={password_confirm}
        onChangeText={text => setPasswordConfirm(text)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : <Text />}
      <Button title="Create an account" onPress={() => _handleSignup()} />
      <Button title="Fetch Info" onPress={() => _fetchToken()} />

      <Button
        title="Login"
        onPress={() => navigation.navigate("Log")}
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
