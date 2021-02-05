import React, { useState } from "react";
import { View, ScrollView, Dimensions, Pressable, Text, Button } from "react-native";

import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

import CardList from "./../components/CardList";

import { useDispatch } from "react-redux";

const HomeScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  function modifyStore(type, payload) {
    dispatch({ type: type, payload: payload });
  }

  const showDetailsList = (list) => {
    setIsEditing(false);
    navigation.navigate("Todo list", {
      item: list,
    });
  };

  return (
    <View style={{ minHeight: height }}>
      {isEditing && (
        <Pressable
          style={{
            position: "fixed",
            width: width,
            height: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#c6def1",
          }}
          onPress={() => setIsEditing(false)}
        >
          <Text style={{ color: "#6E6E6E", fontSize: 20, fontWeight: "700" }}>
            Annuler
          </Text>
        </Pressable>
      )}
      {!isEditing && (
        <Pressable
          style={{
            position: "fixed",
            width: width,
            height: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#6E6E6E",
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            Pssst restes appuyé sur une liste pour la supprimer{" "}
          </Text>
        </Pressable>
      )}

      <ScrollView>
        <CardList
          showDetailsList={showDetailsList}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        {
          isEditing && <Button color="#ff686b" title="Tout supprimer" onPress={() => modifyStore("reset_todo", {}, setIsEditing(false))} />
        }
        
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
          alignItems: "center",
        }}
      >
        <Ionicons
          name="add-circle-outline"
          size={45}
          color="#6E6E6E"
          onPress={() => navigation.navigate("Add list")}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
