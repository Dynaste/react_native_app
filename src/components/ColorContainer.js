import React from "react";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "./../config/colors";

const { width } = Dimensions.get("window");

const ColorContainer = ({ userChoice, setUserChoice }) => {
  const setPref = (choice) => {
    setUserChoice({
        ...userChoice,
        color: choice,
      });
  };

  return (
    <View style={styles.colorContainer}>
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
  );
};

const styles = StyleSheet.create({
    colorContainer: {
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

export default ColorContainer;
