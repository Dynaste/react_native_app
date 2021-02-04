const initialState = [
  {
    id: 1,
    title: "Learn React",
    color: "#f9c6c9",
    icon: "bulb-outline",
    list: [],
  },
  {
    id: 2,
    title: "Learn Vue",
    color: "#faedcb",
    icon: "bulb-outline",
    list: [
      { id: 1, content: "Faire mes courses", done: false, isDelet: false },
      { id: 2, content: "Faire du sport", done: false, isDelet: false },
    ],
  }
];

function todos(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "add_todo": // Expected payload = obj
      return [...state, payload];

    case "update_todo": // Expected payload  = obj
      const index = state.findIndex((todo) => todo.id === payload.id);
      const newArray = [...state.todos];
      newArray[index] = payload;
      return { ...state, todos: newArray };

    case "delete_todo": // Expected payload = item.id
      return [...state.filter((todo) => todo.id !== payload)];

    case "delete_list_item": // Expected payload = item.id
      const todoIndex = state.findIndex((todo) => todo.id === payload.todo.id);
      const newList = state[todoIndex];
      newList.list = newList.list.filter((item) => item.id !== payload.id);

      return [...state, [(state[todoIndex] = newList)]];

    case "animation_delet_item": // Expected payload = item.id
      const animationIndex = state.findIndex(
        (todo) => todo.id === payload.todo.id
      );
      const animationList = state[animationIndex];
      animationList.list[
        animationList.list.findIndex((todo) => todo.id === payload.id)
      ].isDelet = true;

      return [...state, [(state[animationIndex] = animationList)]];

    case "add_item_todo":
      const findId = state.findIndex((todo) => todo.id === payload.listId);
      return [...state, [state[findId].list = [...state[findId].list, payload.newTodo]]]

    case "reset_todo":
      return initialState;

    default:
      return state;
  }
}

export default todos;
