const initialState = [
  {
    id: 1,
    title: "Learn React",
    list: [],
  },
  {
    id: 2,
    title: "Learn Vue",
    list: [{ id: 1, content: "Faire mes courses", done: false },{ id: 2, content: "Faire du sport", done: false }],
  },
  {
    id: 3,
    title: "Learn Docker",
    list: [{ id: 1, content: "Faire mes courses", done: false },{ id: 2, content: "Faire du sport", done: false }],
  },
  {
    id: 4,
    title: "Learn Angular",
    list: [{ id: 1, content: "Faire mes courses", done: false },{ id: 2, content: "Faire du sport", done: false }],
  },
  
];

function todos(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "add_todo": // Expected payload = obj
      console.log(payload);

      return [...state, payload];

    case "update_todo": // Expected payload  = obj
      const index = state.findIndex((todo) => todo.id === payload.id);
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
