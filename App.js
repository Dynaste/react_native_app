import React from "react";

import HomeScreen from "./src/views/HomeScreen";
import NewList from "./src/views/NewListScreen";
import TodoList from "./src/views/TodoListScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";




export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add list" component={NewList} />
        <Stack.Screen name="Todo list" component={TodoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
