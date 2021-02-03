import React, {useEffect, useState} from "react";
import {
  View,
  ScrollView,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
const { height } = Dimensions.get("screen");

import CardList from "./../components/CardList";

const HomeScreen = ({ navigation }) => {
  const [goToList, setGoToList] = useState(false);
  
  const showDetailsList = (list) => {
    navigation.navigate('Todo list', {
      itemId: list,
    });
  }


  return (
    <View style={{minHeight: height, padding: 5}}>
      <ScrollView>
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
