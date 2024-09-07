import { commentFetch } from "../fetch";
import { StandardRes } from "../../types";

export const addNewPost = (data: any) => 
    commentFetch.post<void, StandardRes>('/addNewPost', data);

export const deleteSubPost = (data: any) => 
    commentFetch.post<void, StandardRes>('/deleteSubPost', data);

export const deletePost = (data: any) => 
    commentFetch.post<void, StandardRes>('/deletePost', data);

export const addNewSubPost = (data: any) => 
    commentFetch.post<void, StandardRes>('/addNewSubPost', data);

export const queryMainPost = (data: any) => 
    commentFetch.post<void, StandardRes>('/queryMainPost', data);

export const querySubPost = (data: any) => 
    commentFetch.post<void, StandardRes>('/querySubPost', data);