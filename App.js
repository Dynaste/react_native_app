import React from "react";

import HomeScreen from "./src/views/HomeScreen";
import NewList from "./src/views/NewListScreen";
import TodoList from "./src/views/TodoListScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import TodosReducer from "./src/reducers/TodosReducer";


export default function App() {

  const Stack = createStackNavigator();

  const reducer = combineReducers({
    todosList: TodosReducer
  });

  const store = createStore(reducer);

  return (
    <NavigationContainer>
      <Provider store={store}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Add list" component={NewList} />
            <Stack.Screen name="Todo list" component={TodoList} />
          </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
