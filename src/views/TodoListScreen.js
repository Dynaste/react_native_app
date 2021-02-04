import React, { useEffect,useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import GestureRecognizer from "react-native-swipe-gestures";

import { useSelector,useDispatch } from "react-redux";

const { width, height } = Dimensions.get("screen");

const TodoList = ({ route, navigation }) => {
  const { item } = route.params;

  const listItem = useSelector((state) => state.todosList);
  useEffect(() =>{
    console.log("item : ", listItem)
  },[])

  

  const dispatch = useDispatch();
  const [isSwipe, setIsSwipe] = useState({
    myText: "swipe left or right",
    gestureName: "none",
    backgroundColor: "#fff",
  });

  

  function modifyStore(type, payload) {
    dispatch({ type: type, payload: payload });
  }

  const onSwipeLeft = async (gestureState, id) => {
    console.log(gestureState)
    await setIsSwipe({
      ...isSwipe,
      myText: "Suppression",
      backgroundColor: "#f9c6c9",
    });
    let sendableObj = {
      id: id,
      todo: listItem[listItem.findIndex((list) => list.id === item.id)]
    }
    setTimeout(function() { modifyStore("delete_list_item", sendableObj) }, 2000);
  };

  const onSwipeRight = () => {
    setIsSwipe({
      ...isSwipe,
      myText: "Validation",
      backgroundColor: "#faedcb",
    });
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>{item.title}</Text>

      {listItem[listItem.findIndex((list) => list.id === item.id)].list.length > 0 &&
        listItem[listItem.findIndex((list) => list.id === item.id)].list.map((data, i) => (
          <View
            key={i}
            style={{
              width: width,
              height: 65,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e2e2df",
              margin: 2,
            }}
          >
            <GestureRecognizer
              onSwipeLeft={(state) => {onSwipeLeft(state, data.id)}}
              onSwipeRight={() => onSwipeRight()}
              config={config}
              style={{
                width: width,
                height: 65,
                backgroundColor: isSwipe.backgroundColor,
              }}
            >
              <Text>{isSwipe.myText}</Text>
              <Text>{data.content}</Text>
            </GestureRecognizer>
          </View>
        ))}
      {listItem[listItem.findIndex((list) => list.id === item.id)].list.length === 0 && <Text>C'est vide ... </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginTop: 35,
    marginBottom: 115,
    padding: 15,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default TodoList;
