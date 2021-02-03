import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useSelector, useDispatch } from "react-redux";

import { colors } from "./../config/colors";
import { icons } from "./../config/icon";

const { width, height } = Dimensions.get("window");

const NewList = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userChoice, setUserChoice] = useState({
    color: "#d2d2cf",
    icon: "newspaper-outline",
  });
  const [title, setTitle] = React.useState("");

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
      todos: [],
    };
    await modifyStore("add_todo", todoObj);
    navigation.navigate("Home")
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
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
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              width: width - 80,
              textAlign: "center",
            }}
            onChangeText={(text) => setTitle(text)}
            placeholder="Enter a title"
            value={title}
          />
        </View>
        <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
            width: width - 80,
            marginTop: 45,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 5,
          }}
        >
          {colors.map((color, i) => (
            <TouchableOpacity
              key={i}
              style={{
                width: 60,
                height: 60,
                borderRadius: 5,
                backgroundColor: color,
                margin: 2,
              }}
              onPress={() => setPref(color)}
            />
          ))}
        </View>
        <View
          style={{
            borderRadius: 5,
            borderWidth: 1,
            width: width - 80,
            marginTop: 45,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: 5,
          }}
        >
          {icons.map((icon, i) => (
            <View style={{ margin: 5 }} key={i}>
              <Ionicons
                name={icon}
                size={38}
                color="#5C5C5C"
                onPress={() => setPref(icon)}
              />
            </View>
          ))}
        </View>
        <View style={{marginTop: 50}}>
          <Button title="Créer la liste" onPress={() => addTodo()} />
        </View>
      </ScrollView>
    </View>
  );
};

export default NewList;
