import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createFormHeaders, createHeaders } from "../../utils/Utils";


export const gettaskListAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}task-list`, data, config);
  };

export const getemployeeTasksAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}employee-task-list`, data, config);
  };