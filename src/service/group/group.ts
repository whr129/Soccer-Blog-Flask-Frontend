import { groupFetch } from "../fetch";
import { StandardRes } from "../../types";

export const addGroup = (data: any) => 
    groupFetch.post<void, StandardRes>('/addGroup', data);

export const disableGroup = (data: any) => 
    groupFetch.post<void, StandardRes>('/disableGroup', data);

export const editGroup = (data: any) => 
    groupFetch.post<void, StandardRes>('/editGroup', data);

export const updateGroupOwner = (data: any) => 
    groupFetch.post<void, StandardRes>('/updateGroupOwner', data);

export const disableGroupAdmin = (data: any) => 
    groupFetch.post<void, StandardRes>('/disableGroupAdmin', data);

export const addGroupAdmin = (data: any) => 
    groupFetch.post<void, StandardRes>('/addGroupAdmin', data);

export const queryGroupDetail = (data: any) => 
    groupFetch.post<void, StandardRes>('/queryGroupDetail', data);

export const queryGroupList= (data: any) => 
    groupFetch.post<void, StandardRes>('/queryGroupList', data);
