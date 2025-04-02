import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createFormHeaders, createHeaders } from "../../utils/Utils";

//! Employee  Starts Here
// Register Employee
export const registerEmployeeAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}register-employee`, data, config);
};
// Update Employee
export const updateEmployeeAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}update-employee`, data, config);
};
// Delete Employee
export const deleteEmployeeAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}delete-employee`, data, config);
};
// Get Employee List
export const getEmployeeTableListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}employee-list`, data, config);
};

export const getEmployeeProfile = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}profile`, data, config);
};

