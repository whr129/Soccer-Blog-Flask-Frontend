import { lazy } from 'react';
import type { RouteProps } from 'react-router-dom';

const ToDoListPage = lazy(() => import('./index'));

/** 路由配置 */
export const routeConfig: RouteProps[] = [
  {
    path: '/personal-center/user-management',
    element: <ToDoListPage />,
  },
];