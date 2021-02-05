const initialState = {
  todosList: [],
};

function todos(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "add_todo":
      return { ...state, todosList: [{ ...payload }, ...state.todosList] };

    case "delete_todo":
      return {
        ...state,
        todosList: state.todosList.filter((todo) => todo.id !== payload),
      };

    case "delete_list_item":
      const todoIndex = state.todosList.findIndex((todo) => todo.id === payload.todo.id);
      const newList = state.todosList[todoIndex];
      newList.list = newList.list.filter((item) => item.isDelet !== true);
      state = {
        ...state,
        todosList: state.todosList.filter(
          (todo) => todo.id !== payload.todo.id
        ),
      };
      return { ...state, todosList: [{ ...newList }, ...state.todosList] };

    case "animation_delet_item":
      const animationIndex = state.todosList.findIndex((todo) => todo.id === payload.todo.id);
      const animationList = state.todosList[animationIndex];

      animationList.list[animationList.list.findIndex((todo) => todo.id === payload.id)].isDelet = true;
      state = {
        ...state,
        todosList: state.todosList.filter(
          (todo) => todo.id !== payload.todo.id
        ),
      };
      return {...state, todosList: [{ ...animationList }, ...state.todosList] };

    case "add_item_todo":
      const findId = state.todosList.findIndex((todo) => todo.id === payload.listId);
      const addList = state.todosList[findId];
      addList.list = [...addList.list, payload.newTodo];
      state = {
        ...state,
        todosList: state.todosList.filter((todo) => todo.id !== payload.listId),
      };
      return { ...state, todosList: [{ ...addList }, ...state.todosList] };

    case "reset_todo":
      return initialState;

    default:
      return state;
  }
}

export default todos;
