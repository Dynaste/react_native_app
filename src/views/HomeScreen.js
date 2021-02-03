import React, {useEffect, useState} from "react";
import {
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

import CardList from "./../components/CardList";

const HomeScreen = ({ navigation }) => {
  // const todos = useSelector((state) => state.todosList);
  const dispatch = useDispatch();
  const [goToList, setGoToList] = useState(false);


  const showDetailsList = (list) => {
    navigation.navigate('Todo list', {
      itemId: list,
    });
  }

  function modifyStore(type, payload) {
    dispatch({ type: type, payload: payload });
  }

  const addTodo = async () => {
    const newId = Math.floor(Math.random() * (50000000 - 1 + 1) + 1);

    const todoObj = {
      id: newId,
      title: "Test",
      description: "description sagfgajgjg",
    };
    await modifyStore("add_todo", todoObj);
  };

  return (
    <View style={{minHeight: height, padding: 5}}>
      <ScrollView>
      {/* <View>
        <Button
          title={"Add list"}
          onPress={() => navigation.navigate("Add list")}
        />
        <Button
          title={"Todo list"}
          onPress={() => navigation.navigate("Todo list")}
        />
      </View> */}
      <CardList showDetailsList={showDetailsList}/>

      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 125,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => navigation.navigate("Add list")}
      >
         <Ionicons name="add-circle-outline" size={45} color="#6E6E6E" onPress={() => navigation.navigate("Add list")} />
      </View>
    </View>
  );
};

export default HomeScreen;
