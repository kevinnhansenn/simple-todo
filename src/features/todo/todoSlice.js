import { createSlice } from "@reduxjs/toolkit";
import { fetchTodo } from "./todoAPI";

const initialState = {
  tasks: [],
  loading: true,
  tab: "All",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push({
        id: new Date().getTime(),
        title: action.payload,
        checked: false,
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const tasks = [...state.tasks];
      tasks.forEach((task) => {
        if (task.id === action.payload.id) {
          task.title = action.payload.title;
        }
      });
      state.tasks = tasks;
    },
    toggleTask: (state, action) => {
      const tasks = [...state.tasks];
      tasks.forEach((task) => {
        if (task.id === action.payload) {
          task.completed = !task.completed;
        }
      });
      state.tasks = tasks;
    },
  },
});

export const {
  setTab,
  setTasks,
  setLoading,
  addTask,
  deleteTask,
  editTask,
  toggleTask,
} = todoSlice.actions;

export const selectTab = (state) => state.todo.tab;
export const selectLoading = (state) => state.todo.loading;

export const selectTasks = (state) => {
  if (state.todo.tab === "All") {
    return state.todo.tasks;
  }

  if (state.todo.tab === "Active") {
    return state.todo.tasks.filter((task) => !task.completed);
  }

  if (state.todo.tab === "Completed") {
    return state.todo.tasks.filter((task) => task.completed);
  }

  return [];
};

export const selectTitle = (state) => {
  const notCompleted = state.todo.tasks.filter((task) => !task.completed)
    .length;
  const completed = state.todo.tasks.filter((task) => task.completed).length;

  if (state.todo.tab === "All") {
    return {
      completed,
      notCompleted,
    };
  }

  if (state.todo.tab === "Active") {
    return `${notCompleted} Active Tasks`;
  }

  if (state.todo.tab === "Completed") {
    return `${completed} Completed Tasks`;
  }

  return "";
};

export const fetchRequest = () => (dispatch) => {
  const data = localStorage.getItem("memory");

  if (data) {
    dispatch(setLoading(false));
    dispatch(setTasks(JSON.parse(data)));
    return;
  }

  fetchTodo()
    .then((res) => {
      const data = res.data.slice(0, 10);
      dispatch(setTasks(data));
      localStorage.setItem("memory", JSON.stringify(data));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export default todoSlice.reducer;
