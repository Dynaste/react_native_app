import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { icons } from "./../config/icon";

const { width } = Dimensions.get("window");

const IconContainer = ({ userChoice, setUserChoice }) => {
  const setPref = (choice) => {
    setUserChoice({
      ...userChoice,
      icon: choice,
    });
  };

  return (
    <View style={styles.iconContainer}>
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
  );
};

const styles = StyleSheet.create({
  iconContainer: {
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
  },
});

export default IconContainer;
