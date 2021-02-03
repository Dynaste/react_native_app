import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

const CardList = ({showDetailsList}) => {
  const todos = useSelector((state) => state.todosList);

  useEffect(() => {
    console.log(height);
  }, []);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginTop: 25,
        marginBottom: 115
      }}
    >
      {todos.map((todo, i) => (
        <TouchableOpacity
          style={{ 
            backgroundColor: "#c9e4de",
            height: height / 6,
            width: width / 2.4,
            borderRadius: 5,
            margin: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: 5
          }}
          key={i}
          onPress={() => showDetailsList(todo)}
        >
          <Text style={{color: "#5C5C5C", fontSize: 18, fontWeight: "600"}}>{todo.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CardList;
