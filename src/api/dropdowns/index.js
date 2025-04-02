import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createFormHeaders, createHeaders } from "../../utils/Utils";

//! DropDown API Starts Here
//  get Designation DD List by Department
export const getDesignationDDAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}get-designation-by-department`, data, config);
};
//  get Department DD List
export const getDepartmentDDAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}get-department-dd`, data, config);
};
//  get Team DD List
export const getTeamListByDepartmentDDAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}get-team-by-department-dd`, data, config);
};

//  get Report to DD List by designation and department ID
export const getReportToDDAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}get-report-to-by-department-and-designation-id`, data, config);
};
//  get Company Level DD List
export const getCompanyStructureLevelDDAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}get-company-level-dd`, data, config);
};
//  get Project DD List
export const getProjectDDAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}get-project-dd`, data, config);
};
//  get Priority  DD List
export const getPriorityDDAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}get-priority-dd`, data, config);
};

//  get Team DD List
export const getUserListByProjectDDAPI = async (data) => {
  const config = createHeaders();
  return await axios.post(`${BASE_URL}get-user-by-project-dd`, data, config);
};