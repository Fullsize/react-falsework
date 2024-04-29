import withAuth from '@/hocs/withAuth';
export default [
  {
    path: '',
    name: '首页',
    component: 'home',
    hoc: [withAuth],
    children: [],
  },
];
