import React, { useState } from "react";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  Content,
  Item,
  Input,
  Button
} from "native-base";

export default function LoginScreen({navigation}) {
  let [token, setToken] = useState("no token yet");
  let [email, setEmail] = useState("Email");
  let [password, setPassword] = useState("Password");
  let [username, setUsername] = useState("");

  _handleLogin = () => {
    console.log("========handle login =====> ", email, password);
    fetch("http://82657283.ngrok.io/auth/login", {
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
      .then(
        navigation.navigate('App')
      )
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

  _handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("username");
      setToken('');
      setUsername('');
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Content style={{ marginTop: 100, width: "100%" }}>
        <Item rounded>
          <Input placeholder="Email" onChangeText={text => setEmail(text)} />
        </Item>
        <Item rounded>
          <Input
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </Item>
        <Button onPress={() => _handleLogin()} block light>
          <Text>Login</Text>
        </Button>
        <Button onPress={() => _fetchToken()} block light>
          <Text>Fetch Info</Text>
        </Button>
        <Button onPress={() => _handleLogout()} block light>
          <Text>Logout</Text>
        </Button>
        <Button onPress={() => navigation.navigate("SignUp")} light>
          <Text>Create Account</Text>
        </Button>
        <Text>{token}</Text>
        <Text>{username}</Text>
      </Content>
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
