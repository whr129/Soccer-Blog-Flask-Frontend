import { lazy } from 'react';
import type { RouteProps } from 'react-router-dom';

const BookDetail = lazy(() => import('./index'));

/** 路由配置 */
export const routeConfig: RouteProps[] = [
  {
    path: '/personal-center/group-detail/:id',
    element: <BookDetail/>,
  },
];