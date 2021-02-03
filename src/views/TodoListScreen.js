import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";

const TodoList = ({ route, navigation }) => {

  const { itemId, otherParam } = route.params;
  useEffect(() => {
    console.log(itemId);
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a Todo list! {itemId.id}</Text>
      <Button onPress={() => navigation.goBack()} title="Back" />
    </View>
  );
};

export default TodoList;
