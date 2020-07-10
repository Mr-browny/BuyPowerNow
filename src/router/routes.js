
const routes = [
  {
    path: '/',
    component: () => import('layouts/PreloaderLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }, 
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Index.vue') },
      { path: '', component: () => import('pages/auth/Login.vue') },
      { path: 'signup', component: () => import('pages/auth/Signup.vue') },
      { path: 'forgotPassword', component: () => import('pages/auth/ForgotPassword.vue') },
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/main/Dashboard.vue') },
      { path: 'Profile', component: () => import('pages/main/Profile.vue') },
      { path: 'Message', component: () => import('pages/main/Message.vue') },
      { path: 'Notification', component: () => import('pages/main/Notification.vue') },
      { path: 'SingleDiscos/:id', component: () => import('pages/main/SingleDiscos.vue') },
      { path: 'Help', component: () => import('pages/main/Help.vue') },
      { path: 'Faqs', component: () => import('pages/main/Faqs.vue') },
      { path: 'History', component: () => import('pages/main/TransactionHistory.vue') },
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
