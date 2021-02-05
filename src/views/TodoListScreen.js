import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Modal,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const TodoList = ({ route }) => {
  const { item } = route.params;
  const listItem = useSelector((state) => state.todosList.todosList);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [isSwipe, setIsSwipe] = useState({
    myText: "swipe left or right",
    gestureName: "none",
    backgroundColor: "#fff",
  });

  function modifyStore(type, payload) {
    dispatch({ type: type, payload: payload });
  }

  const onSwipeLeft = async (id) => {
    await setIsSwipe({
      ...isSwipe,
      myText: "Suppression",
      backgroundColor: "#f9c6c9",
    });
    let sendableObj = {
      id: id,
      todo: listItem[listItem.findIndex((list) => list.id === item.id)],
    };
    await modifyStore("animation_delet_item", sendableObj);
    setTimeout(async function() {
      await modifyStore("delete_list_item", sendableObj);
    }, 1500);
  };

  const onSwipeRight = async(id) => {
    setIsSwipe({
      ...isSwipe,
      myText: "Validation",
      backgroundColor: "#c9e4de",
    });
    let sendableObj = {
      id: id,
      todo: listItem[listItem.findIndex((list) => list.id === item.id)],
    };
    await modifyStore("animation_delet_item", sendableObj);
    setTimeout(async function() {
      await modifyStore("delete_list_item", sendableObj);
    }, 1500);
  };

  const addItemTodo = async () => {
    const newId = Math.floor(Math.random() * (50000000 - 1 + 1) + 1);
    const todoToSend = {
      listId: item.id,
      newTodo: {
        id: newId,
        content: newTodo,
        done: false,
        isDelet: false,
      },
    };
    await modifyStore("add_item_todo", todoToSend);
    setNewTodo("");
    setModalVisible(false);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { backgroundColor: item.color }]}>
        <Text style={styles.titleFont}>{item.title}</Text>
      </View>
      {listItem[listItem.findIndex((list) => list.id === item.id)].list.length >
        0 && (
        <ScrollView style={styles.scrollView} directionalLockEnabled={true} >
          {listItem[listItem.findIndex((list) => list.id === item.id)].list
            .length > 0 &&
            listItem[
              listItem.findIndex((list) => list.id === item.id)
            ].list.map((data, i) => (
              <View
                key={i}
                style={{
                  width: width,
                  height: 65,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#e2e2df",
                  margin: 1,
                }}
              >
                <GestureRecognizer
                  onSwipeLeft={() => {
                    onSwipeLeft(data.id);
                  }}
                  onSwipeRight={() => {onSwipeRight(data.id)}}
                  config={config}
                  style={{
                    width: width,
                    height: 65,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: data.isDelet
                      ? isSwipe.backgroundColor
                      : "#e2e2df",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                      color: "#5C5C5C",
                    }}
                  >
                    {data.isDelet ? isSwipe.myText : data.content}
                  </Text>
                </GestureRecognizer>
              </View>
            ))}
        </ScrollView>
      )}

      {listItem[listItem.findIndex((list) => list.id === item.id)].list
        .length === 0 && (
        <Text style={{ fontSize: 20, color: "#5C5C5C", fontWeight: "600" }}>
          C'est vide ...{" "}
        </Text>
      )}
      <View style={[styles.newTodoButton, { borderRadius: "50%" }]}>
        <Ionicons
          name="add-circle-outline"
          size={45}
          color="#6E6E6E"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.inputNewTodo}
              autoFocus={true}
              onSubmitEditing={addItemTodo}
              onChangeText={(text) => setNewTodo(text)}
              value={newTodo}
            />
            <Button
              title="Annuler"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: height,
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    width: width,
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleFont: { fontSize: 26, color: "#5C5C5C", fontWeight: "600" },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: width,
    borderRadius: 5,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 6,
    elevation: 2,
  },
  inputNewTodo: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    textAlign: "center",
  },
  scrollView: {
    marginTop: 50,
    width: width
  },
  newTodoButton: {
    position: "absolute",
    bottom: 125,
    right: 20,
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TodoList;
