import React, {useEffect, useState} from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

import { useSelector, useDispatch } from "react-redux";

const HomeScreen = ({navigation}) => {
  const todos = useSelector((state) => state.todosList);
  const dispatch = useDispatch();


  // useEffect(() =>{
  //   console.log(todos)
  // }, [])
  return (
    <View>
      <Text>HOMESCREEN</Text>
      <Button
          title={"Add list"}
          onPress={() => navigation.navigate("Add list")}
        />

        <Button
          title={"Todo list"}
          onPress={() => navigation.navigate("Todo list")}
        />
        {
          Object.keys(todos).map((todo, i) => (
            <TouchableOpacity onPress={()=> console.log(todos[todo])}> 
              <View key={i}>
                <Text>{todo}</Text>
              </View>
            </TouchableOpacity>
          ))
        }

        <View>

        </View>
    </View>
  );
};

export default HomeScreen;
