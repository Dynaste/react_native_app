import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  View,
  Text,
  Dimensions,
  Pressable,
  Button,
  StyleSheet,
} from "react-native";
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

  const zoomOut = {
    0: {
      rotateZ: "0deg",
      scale: 1,
    },
    0.1: {
      rotateZ: "2deg",
      scale: 1,
    },
    0.2: {
      rotateZ: "0deg",
      scale: 1,
    },
    0.3: {
      rotateZ: "1deg",
      scale: 1,
    },
    0.4: {
      rotateZ: "-1deg",
      scale: 1,
    },
    0.5: {
      rotateZ: "1deg",
      scale: 1,
    },
    0.6: {
      rotateZ: "2deg",
      scale: 1,
    },
    0.7: {
      rotateZ: "-2deg",
      scale: 1,
    },
    0.8: {
      rotateZ: "2deg",
      scale: 1,
    },
    1: {
      rotateZ: "-2deg",
      scale: 1,
    },
  };

  return (
    <View style={styles.cardContainer}>
      {todos.map((todo, i) => (
        <Animatable.View
          iterationCount="infinite"
          animation={isEditing && zoomOut}
          easing="ease-in"
          duration={1000}
        >
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
                  alignItems: "center",
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
              <Text
                style={{ color: "#5C5C5C", fontSize: 18, fontWeight: "600" }}
              >
                {todo.title}
              </Text>
            </View>
          </Pressable>
        </Animatable.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginTop: 35,
    marginBottom: 115,
    padding: 15,
  },
});

export default CardList;

// <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style={{ textAlign: 'center' }}>❤️</Animatable.Text>
