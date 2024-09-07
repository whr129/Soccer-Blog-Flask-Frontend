import type { RouteProps } from 'react-router-dom';

export type IRouterConfig = RouteProps & {
    subChildren?: RouteProps[];
  };

export interface IcurrentUser {
  id: string;
  status: number;
  userName: string;
  email: string;
  password: string;
  checkPassword: string;
  roles: Array<string>;
}

export interface IcurrentRole {
  id: string;
  code: string;
}

export interface IcurrentGroup {
  groupName: string;
  id: string;
  picUrl: string;
  description: string;
  code: string;
  status: number;
  owner: Array<IcurrentUser>;
  admin: Array<IcurrentUser>;
}

export interface IcurrentSchedule {
  id: string;
  content: string;
  title: string;
  dueDate: string;
  isFinished: number;
  overDue: boolean;
}

export interface IcurrentBook {
  id: number;
  updateTime: string | null;
  createTime: string;
  beginTime: string | null;
  endTime: string | null;
  //0: unread, 1: in progress, 2: finished
  status: number;
  author: string;
  page: number | null;
  readPage: number | null;
  bookName: string;
  isDelete: number;
  deleteTime: string | null;
  picUrl: string;
  rate: number | null;
}

export interface IcurrentBookParam {
  author: string;
  bookName: string;
  status: number;
  pageNum: number;
  pageSize: number;
}

export interface IcurrentBookUpdateParam {
  id: string;
  status: number;
  rate: number | null;
  page: number | null;
  readPage: number | null;
}


export interface IcurrentBookNotes {
  id: number;
  bookId: number;
  content: string | null;
  createDate: string;
  updateTime: string | null;
  isDelete: number;
  deleteTime: string | null;
}


export interface IcurrentBookQuote {
  id: number;
  bookId: number;
  content: string | null;
  review: string | null;
  createDate: string;
  updateTime: string | null;
  isDelete: number;
  deleteTime: string | null;
}

export interface pageParam {
  pageNum: number,
  pageSize: number,
}

export interface StandardRes {
  code: string;
  data: any;
  message: string;
}
