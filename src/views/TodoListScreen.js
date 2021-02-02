import React from "react";
import { View, Text, Button} from "react-native";

const TodoList = ({navigation}) => {
  return <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  <Text style={{ fontSize: 30 }}>This is a Todo list!</Text>
  <Button onPress={() => navigation.goBack()} title="Back" />
</View>;
};

export default TodoList;
