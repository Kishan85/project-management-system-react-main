import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createFormHeaders, createHeaders } from "../../utils/Utils";

//! Plan API Starts Here
//  get Plan List form Card Home Page
export const getPlanListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}plan-list`);
};
//  create Company Demo Account
export const createCompanyDemoAccountAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}company-register`,data);
};


// Get sidebar api
export const dashboardAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}dashboard`,data,config);
};

//Organizational chart api
export const organizationalAPI = async (data)=>{
  const config =createHeaders();
  return await axios.post(`${BASE_URL}tree`,data,config);
}