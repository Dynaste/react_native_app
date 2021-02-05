import React from "react";
import * as Animatable from "react-native-animatable";
import { View, Text, Dimensions, Pressable, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

import { editableCard } from "./../config/animations";

const CardList = ({ showDetailsList, isEditing, setIsEditing }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todosList.todosList);

  function modifyStore(type, payload) {
    dispatch({ type: type, payload: payload });
  }

  const deleteTodo = async (id) => {
    await modifyStore("delete_todo", id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {todos.map(
          (todo, i) =>
            todo &&
            todo.id && (
              <Animatable.View
                iterationCount="infinite"
                animation={isEditing ? editableCard : ""}
                easing="ease-in"
                duration={1000}
                key={i}
              >
                <Pressable
                  style={[
                    {backgroundColor: todo.color,
                    height: height / 6.5,
                    width: width / 2.2,
                    borderRadius: 5,
                    margin: 5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    padding: 5},
                     i === (todos.length -1) && i%2 == 0 && {position: "relative", right: width/4.2}
                  ]}
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
                      style={{
                        color: "#5C5C5C",
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      {todo.title}
                    </Text>
                  </View>
                </Pressable>
              </Animatable.View>
            )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1,
    alignItems: "center",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 25,
    marginBottom: 115,
  },
});

export default CardList;
