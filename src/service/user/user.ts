import { userFetch } from "../fetch";
import { StandardRes } from "../../types";

export const register = (data: any) => 
    userFetch.post<void, StandardRes>('/register', data);

export const login = (data: any) =>
    userFetch.post<void, StandardRes>('/login', data);

export const logout = () =>
    userFetch.post<void, StandardRes>('/logout');

export const addRoleToUser = (data: any) =>
    userFetch.post<void, StandardRes>('/addRoleToUser', data);

export const changeUserStatus = (data: any) =>
    userFetch.post<void, StandardRes>('/changeUserStatus', data);

export const editUserInfo = (data: any) =>
    userFetch.post<void, StandardRes>('/editUserInfo', data);

export const editUserRoles = (data: any) =>
    userFetch.post<void, StandardRes>('/editUserRoles', data);

export const queryUserInfo = () =>
    userFetch.post<void, StandardRes>('/queryUserInfo');

export const getUserList = (data: any) =>
    userFetch.post<void, StandardRes>('/getUserList', data);

export const getRoleList = () =>
    userFetch.post<void, StandardRes>('/queryRoleList');