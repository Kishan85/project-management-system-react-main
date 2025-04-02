import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createFormHeaders, createHeaders } from "../../utils/Utils";

//TASK BOARD API
export const createBoardAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}create-board`, data, config);
};
export const gettaskBoardListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}board-list`, data, config);
};

export const updateBoardAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}update-board`, data, config);
};
export const deleteBoardAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}delete-board`, data, config);
};

//TASK FORM API
export const createTaskAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}create-task`, data, config);
};

export const startTaskAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}start-task`, data, config);
};

