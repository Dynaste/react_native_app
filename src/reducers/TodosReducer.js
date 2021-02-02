const initialState = {
    Example: [
      {
        id: 1,
        title: "Learn React",
        description: "React is too easy :)",
      },
    ],
    Example2: [
      {
        id: 1,
        title: "Learn React",
        description: "React is too easy :)",
      },
    ],
  };
  
  function todos(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case "add_todo": // Expected payload = obj
        console.log(payload);
        return { ...state, todos: [...state.todos, payload] };
  
      case "update_todo": // Expected payload  = obj
        const index = state.todos.findIndex((todo) => todo.id === payload.id);
        const newArray = [...state.todos];
        newArray[index] = payload;
        return { ...state, todos: newArray };
  
      case "delete_todo": // Expected payload = item.id
        return {
          ...state,
          todos: state.todos.filter((todo) => todo.id !== payload),
        };
  
      case "reset_todo":
        return initialState;
  
      default:
        return state;
    }
  }
  
  export default todos;
  