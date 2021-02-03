import React, { useState } from "react";
import { View, Text, Dimensions, Pressable, Button, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const CardList = ({ showDetailsList, isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosList);
  

  function modifyStore(type, payload) {
    dispatch({ type: type, payload: payload });
  }

  const deleteTodo = async (id) => {
    await modifyStore("delete_todo", id);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginTop: 35,
        marginBottom: 115,
        padding: 15
      }}
    >
      {todos.map((todo, i) => (
        <Pressable
          key={i}
          style={{
            backgroundColor: todo.color,
            height: height / 6.5,
            width: width / 2.3,
            borderRadius: 5,
            margin: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            padding: 5,
            position: "relative",
          }}
          onPress={() => showDetailsList(todo)}
          onLongPress={() => setIsEditing(true)}
        >
          {isEditing && (
            <Pressable
              style={{
                backgroundColor: "#ff686b",
                position: "absolute",
                top: 5,
                right: 5,
                height: 25,
                width: 25,
                borderRadius: "50%",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => deleteTodo(todo.id)}
            >
              <Ionicons name="close-outline" size={24} color="white" />
            </Pressable>
          )}
          <View
            style={{
              width: "100%",
              height: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name={todo.icon} size={38} color="#5C5C5C" />
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#5C5C5C", fontSize: 18, fontWeight: "600" }}>
              {todo.title}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default CardList;
