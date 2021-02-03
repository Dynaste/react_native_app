import React, {useState} from "react";

import {Button} from "react-native";

import HomeScreen from "./src/views/HomeScreen";
import NewList from "./src/views/NewListScreen";
import TodoList from "./src/views/TodoListScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import TodosReducer from "./src/reducers/TodosReducer";

export default function App() {

  const Stack = createStackNavigator();
  const ModalStack = createStackNavigator();
  const [editIsActive, setEditIsActive]= useState(false);

  const reducer = combineReducers({
    todosList: TodosReducer
  });

  const ModalScreen = () => {
    return (
      <ModalStack.Navigator
        headerMode="none"
        initialRouteName="Add todo">
        <ModalStack.Screen name="NewList" component={NewList} />
      </ModalStack.Navigator>
    );
  };

  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  };

  const store = createStore(reducer);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Add list"
            component={ModalScreen}
            options={horizontalAnimation}
          />
          <Stack.Screen name="Todo list" component={TodoList} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
