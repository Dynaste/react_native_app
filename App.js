import React from "react";

import HomeScreen from "./src/views/HomeScreen";
import NewList from "./src/views/NewListScreen";
import TodoList from "./src/views/TodoListScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import TodosReducer from "./src/reducers/TodosReducer";

import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const Stack = createStackNavigator();
  const ModalStack = createStackNavigator();


  

  const ModalScreen = () => {
    return (
      <ModalStack.Navigator headerMode="none" initialRouteName="Add todo">
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
  

  const todoPersistConfig = {
    key: "root",
    storage: AsyncStorage
  };
  const persistedTodo = persistReducer(todoPersistConfig, TodosReducer);

  const rootReducer = combineReducers({
    todosList: persistedTodo,
  });

  const store = createStore(rootReducer);
  const persistor = persistStore(store);
  // const store = createStore(reducer);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="Add list"
              component={ModalScreen}
              options={horizontalAnimation}
            />
            <Stack.Screen name="Todo list" component={TodoList} />
          </Stack.Navigator>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
