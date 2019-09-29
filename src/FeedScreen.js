import React from "react";
import { View, Button, Text } from "react-native";

export default function OtherScreen({ navigation }) {
  return (
    <View>
      <Text>Feed Screen or whatever</Text>
      <Button
        title="Go to the other page"
        onPress={() => navigation.navigate("Other")}
      />
    </View>
  );
}
