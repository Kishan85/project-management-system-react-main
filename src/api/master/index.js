import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createFormHeaders, createHeaders } from "../../utils/Utils";

//! Master Department Starts Here
//  get Department List Master
export const getDepartmentListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}department-list`, data, config);
};
//  create Department Master
export const createDepartmentAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}create-department`, data, config);
};
//  update Department Master
export const updateDepartmentAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}update-department`, data, config);
};
//  delete Department Master
export const deleteDepartmentAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}delete-department`, data, config);
};
//! Master Department Ends Here

//! Master Designation Starts Here
//  get Designation List Master
export const getDesignationListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}designation-list`, data, config);
};
//  create Designation Master
export const createDesignationAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}create-designation`, data, config);
};
//  update Designation Master
export const updateDesignationAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}update-designation`, data, config);
};
//  delete Designation Master
export const deleteDesignationAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}delete-designation`, data, config);
};
//! Master Company Structure Ends Here
//! Master Company Structure Starts Here
//  get Company Structure List Master
export const getCompanyStructureListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}company-structure-list`, data, config);
};
//  create Company Structure Master
export const createCompanyStructureAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}create-company-structure`, data, config);
};
//  update Company Structure Master
export const updateCompanyStructureAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}update-company-structure`, data, config);
};
//  delete Company Structure Master
export const deleteCompanyStructureAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}delete-company-structure`, data, config);
};
//! Master Company Structure Ends Here

//! Master Priority Starts Here
//  get Priority List Master
export const getPriorityListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}priority-list`, data, config);
};
//  create Priority Master
export const createPriorityAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}create-priority`, data, config);
};
//  update Priority Master
export const updatePriorityAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}update-priority`, data, config);
};
//  delete Priority Master
export const deletePriorityAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}delete-priority`, data, config);
};
//! Master Priority Ends Here
