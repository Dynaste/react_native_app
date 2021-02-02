import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>HOMESCREEN</Text>
      <Button
          title={"Add list"}
          onPress={() => navigation.navigate("Add list")}
        />
        <Button
          title={"Todo list"}
          onPress={() => navigation.navigate("Todo list")}
        />
    </View>
  );
};

export default HomeScreen;
