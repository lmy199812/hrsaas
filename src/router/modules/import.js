import Layout from '@/layout'
export default {
  path: '/import',
  hidden: true,
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
      meta: { title: '导入', icon: 'table' }
    }
  ]
}
