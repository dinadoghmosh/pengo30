import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'

import VueRouter from 'vue-router'
import firebase from 'firebase/app'

import Home from './components/home.vue'
import employee from './components/employee.vue'
import addEmployee from './components/addEmployee.vue'
import Employeeoperation from './components/Employeeoperation.vue'
import './assets/main.css'
import login from './views/login.vue'
import signup from './views/signup.vue'
import VueFire from 'vuefire'
import EditEmployee from './components/EditEmployee.vue'
import addstudent from './components/addStudent.vue'
import studentopera from './components/studentOperation.vue'
import student from './components/student.vue'
import editstudent from './components/editstudent.vue'
import editprofile from './components/editprofile.vue'



Vue.use(vueRouter )
Vue.use(VueFire)

const router=new VueRouter({
  mode:'history',
  routes:[
    {path:'/' ,component:Home ,meta: {
    requiresAuth: true
   },
   beforeEnter: requireAuth
  },
    {path:'/employee' ,component:employee},
    {path:'/login' ,component:login},
  
    {path:'/signup' ,component:signup},
    {path:'/addEmployee' ,component:addEmployee},
    {path:'/Editemployee' ,name :'Editemployee',component:EditEmployee},
    {path:'/Employeeoperation' ,component:Employeeoperation},
    {path:'/addstudent' ,component:addstudent},
    {path:'/studentopera' ,component:studentopera},
    {path:'/student' ,component:student},
    {path:'/editprofile' ,component:editprofile},
    {path:'/Editstudent' ,name :'Editstudent',component:editstudent},
  ]
  
})
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !currentUser) {
   next('/login');
  } else if (requiresAuth && currentUser) {
   next();
  } else {
   next();
  }
  });
  function requireAuth(to, from, next) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        next({
          path: "/login"
        });
      } else {
          next(
            
          )
      }
  
  })
  }
new Vue({
  render: h => h(App),
  router,
  
}).$mount('#app')

