import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/ebook'
  },
  {
    path: '/ebook',
    component: () => import('../views/ebook/EbookIndex.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('../components/ebook/EbookReader.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
