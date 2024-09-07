import { lazy } from 'react';
import type { RouteProps } from 'react-router-dom';

const AddNew = lazy(() => import('./index'));

/** 路由配置 */
export const routeConfig: RouteProps[] = [
  {
    path: '/personal-center/group-management',
    element: <AddNew />,
  },
];