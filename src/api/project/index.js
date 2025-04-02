import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createFormHeaders, createHeaders } from "../../utils/Utils";

//! Project Starts Here
//  Create Project
export const createProjectAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}create-project`, data, config);
};
//  Update Project
export const updateProjectAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}update-project`, data, config);
};
//  Delete Project
export const deleteProjectAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}delete-project`, data, config);
};
//  List Project
export const getProjectTableListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}project-list`, data, config);
};
//   Add Project Document
export const addProjectDocumentAPI = async (data) => {
  const config = createFormHeaders();
  return await axios.post(`${BASE_URL}project-document`, data, config);
};
//   Update Project Document
export const updateProjectDocumentAPI = async (data) => {
  const config = createFormHeaders();
  return await axios.post(`${BASE_URL}update-project-document`, data, config);
};
//   DELETE Project Document
export const deleteProjectDocumentAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}delete-project-document`, data, config);
};
//   Add Project Document
export const getProjectDocumentListAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}document-list`, data, config);
};

//   Add Project Progress
export const addProjectProgressAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}add-project-progress`, data, config);
};