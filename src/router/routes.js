export const ROUTES_PATH = {
  HOME: '/home',
  POST: '/posts',
  CREATE_POST: '/create-post',
  UPDATE_POST: '/update-post',
  CATEGORIES: '/categories',
  EXCHANGES: '/exchanges',
  ADD_EXCHANGES: '/add-exchanges',
  EDIT_EXCHANGES: '/edit-exchange',
  LOGIN: '/login'
}

export const ROUTES_SIDEBAR = [
  {
    name: 'home',
    label: 'Home',
    path: ROUTES_PATH.HOME,
    component: () => import('@src/views/PostsView/PostsView.vue'),
    meta: {
      layout: 'dashboard-layout',
      requiresAuth: true,
      icon: 'fas fa-th',
      parent: 'home'
    }
  },
  {
    name: 'posts',
    label: 'Posts',
    path: ROUTES_PATH.POST,
    component: () => import('@src/views/PostsView/PostsView.vue'),
    meta: {
      layout: 'dashboard-layout',
      icon: 'far fa-newspaper',
      requiresAuth: true,
      parent: 'posts'
    }
  },
]

export const ROUTES = [
  {
    name: 'create-post',
    path: ROUTES_PATH.CREATE_POST,
    component: () => import('@src/views/PostsView/CreatePost.vue'),
    meta: {
      layout: 'dashboard-layout',
      requiresAuth: true,
      parent: 'posts'
    }
  },
  {
    name: 'update-post',
    path: ROUTES_PATH.UPDATE_POST,
    component: () => import('@src/views/PostsView/UpdatePost.vue'),
    meta: {
      layout: 'dashboard-layout',
      requiresAuth: true,
      parent: 'posts'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@src/views/LoginView/LoginView.vue'),
    meta: {
      layout: 'auth-layout',
      requiresAuth: false,
      parent: ''
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@src/views/NotFound/NotFound.vue'),
    meta: {
      layout: 'auth-layout',
      requiresAuth: false,
      parent: ''
    }
  }
]
