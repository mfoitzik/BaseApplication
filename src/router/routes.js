
const routes = [
  {
    path: '/',
    component: () => import('layouts/ShellLayout.vue'),
    children: [
      { 
        path: '',
        component: () => import('pages/Pane.vue'),
        props: true,
        children: [
          { 
            path: '',
            component: () => import('pages/Explorer.vue')
          },
          { 
            path: 'reports',
            component: () => import('pages/Reports.vue') 
          },
          { 
            path: 'settings',
            component: () => import('pages/Settings.vue') 
          }
        ]
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
