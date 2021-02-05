import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  TextInput,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";

import IconContainer from "./../components/IconContainer";
import ColorContainer from "../components/ColorContainer";

const { width, height } = Dimensions.get("window");

const NewList = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userChoice, setUserChoice] = useState({
    color: "#d2d2cf",
    icon: "newspaper-outline",
  });
  const [title, setTitle] = React.useState("");

  const todos = useSelector((state) => state.todosList.todosList);

  useEffect(()=>{
    console.log(todos);
  },[todos])


  const setPref = (choice) => {
    if (choice.includes("#")) {
      setUserChoice({
        ...userChoice,
        color: choice,
      });
    } else {
      setUserChoice({
        ...userChoice,
        icon: choice,
      });
    }
  };

  function modifyStore(type, payload) {
    dispatch({ type: type, payload: payload });
  }

  const addTodo = async () => {
    const newId = Math.floor(Math.random() * (50000000 - 1 + 1) + 1);

    const todoObj = {
      id: newId,
      title: title,
      color: userChoice.color,
      icon: userChoice.icon,
      list: [],
    };
    await modifyStore("add_todo", todoObj);
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 25}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Button title="reset" onPress={()=>modifyStore("reset_todo", {})}/>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: width - 80,
            marginTop: 50,
          }}
        >
          <View
            style={{
              backgroundColor: userChoice.color,
              height: 80,
              width: 80,
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 2,
            }}
          >
            <Ionicons
              name={userChoice.icon}
              size={40}
              color="#5C5C5C"
              iconStyle="{marginLeft: 2}"
            />
          </View>
        </View>
        <View style={{ marginTop: 45 }}>
          <TextInput
            style={styles.titleInput}
            onChangeText={(text) => setTitle(text)}
            placeholder="Enter a title"
            value={title}
          />
        </View>
        <ColorContainer userChoice={userChoice} setUserChoice={setUserChoice} />
        <IconContainer userChoice={userChoice} setUserChoice={setUserChoice} />

        <View style={{ marginTop: 50 }}>
          <Button title="Créer la liste" onPress={() => addTodo()} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: width - 80,
    textAlign: "center",
  },
});

export default NewList;
