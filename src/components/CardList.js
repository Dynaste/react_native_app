import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CardList = ({ showDetailsList }) => {
  const todos = useSelector((state) => state.todosList);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        marginTop: 25,
        marginBottom: 115,
      }}
    >
      {todos.map((todo, i) => (
        <TouchableOpacity
          style={{
            backgroundColor: todo.color,
            height: height / 6,
            width: width / 2.4,
            borderRadius: 5,
            margin: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            padding: 5,
          }}
          key={i}
          onPress={() => showDetailsList(todo)}
        >
          <View style={{width: "100%", height:"50%", display: "flex",justifyContent: "center", alignItems: "center"}}>
            <Ionicons name={todo.icon} size={38} color="#5C5C5C" />
          </View>
          <View style={{width: "100%", display: "flex",justifyContent: "center", alignItems: "center"}}>
            <Text style={{ color: "#5C5C5C", fontSize: 18, fontWeight: "600" }}>
              {todo.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CardList;
