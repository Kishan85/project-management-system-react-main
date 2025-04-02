import axios from "axios";
import { BASE_URL } from "../../constants/myConstants";
import { createFormHeaders, createHeaders } from "../../utils/Utils";

//! User Permission Starts Here
export const createMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}create-menu`, data, config);
};
export const deleteMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}delete-menu`, data, config);
};
export const listMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}menu-list`, data, config);
};
export const updateMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}update-menu`, data, config);
};

// create sub-menu
export const createSubMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}create-submenu`, data, config);
};
// create sub-menu
export const updateSubMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}update-submenu`, data, config);
};
// delete sub-menu
export const deleteSubMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}delete-submenu`, data, config);
};
//  sub-menu list
export const ListubMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}list-submenu`, data, config);
};

//  role type
export const createRoleTypeAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}create-role`, data, config);
};
//  delete role type
export const deleteRoleTypeAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}delete-role`, data, config);
};
//  get role type
export const getRoleTypeAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}role-list-dd`, data, config);
};
//  get role type
export const getSubMenuListByMenuAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}submenu-list`, data, config);
};
//  get role permission list
export const getRolePermissionListAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}getrolepermission`, data, config);
};
//  get role permission list
export const getUserPermissionListAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}getuserpermission`, data, config);
};
//  get role permission list
// export const saveRolePermissionAPI = async (data) => {
//     const config = createHeaders();
//     return await axios.post(`${BASE_URL}list-submenu`, data, config);
// };
//  get user permission list
export const saveUserPermissionAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}role-permission`, data, config);
};


//###################################
// User Master
export const createUserAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}create-user`, data, config);
};
export const getUserListAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}get-user-list`, data, config);
};
export const deleteUserAPI = async (data) => {
    const config = createHeaders();
    return await axios.post(`${BASE_URL}delete-user`, data, config);
};