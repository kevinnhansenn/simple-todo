import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export function fetchTodo(id = 1) {
  return axios.get(`todos?userId=${id}`);
}
