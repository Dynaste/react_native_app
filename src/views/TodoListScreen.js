import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const TodoList = ({ route, navigation }) => {
  const { item } = route.params;
  useEffect(() => {
    console.log(item);
  }, []);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a Todo list! {item.id}</Text>

      {item.list.length > 0 &&
        item.list.map((data, i) => (
          <View
            key={i}
            style={{
              width: width,
              height: 65,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e2e2df",
              margin: 2,
            }}
          >
            <Text>{data.content}</Text>
          </View>
        ))}
        {
          item.list.length === 0 &&
          <Text>C'est vide ... </Text>
        }
    </View>
  );
};

export default TodoList;
