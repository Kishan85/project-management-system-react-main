import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createHeaders } from "../../utils/Utils";


//! Login
//  LOgin
export const loginAPI = async (data) => {
  return await axios.post(`${BASE_URL}login`, data);
};

//change Password Api

export const chnagePasswordAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}change-password`, data, config);
};
