<template>
<div >
<div class="sufee-login d-flex align-content-center flex-wrap">
        <div class="">
            <div class="login-content">
                
                <div class="login-form">
                    
                    <div class="col-md-6 login_img">
                    <img src="../assets/log.jpg" class="img-responsive">
                </div>
                    <form @submit.prevent="signUp" class="col-md-6">
                         <div class="form-group">
                            <label>First name</label>
                            <input type="text" class="form-control" placeholder="first name" v-model="userData.firstname">
                        </div>
                         <div class="form-group">
                            <label>Last name</label>
                            <input type="text" class="form-control" placeholder="last name" v-model="userData.lastname">
                        </div>
                         <div class="form-group">
                            <label>user name</label>
                            <input type="text" class="form-control" placeholder="username" v-model="userData.username">
                        </div>
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" placeholder="Email" v-model="userData.email">
                        </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" placeholder="Password" v-model="userData.password">
                        </div>
                                <div class="checkbox">
                                    <label>
                                <input type="checkbox"> Remember Me
                            </label>
                                    <label class="pull-right">
                                <a href="#">Forgotten Password?</a>
                            </label>

                                </div>
                                <button  class="btn btn-success btn-flat m-b-30 m-t-30" >Sign in</button>
                                
                                <div class="register-link m-t-15 text-center">
                                    <p>Don't have account ? <router-link
                                    to="/login"> Sign in Here</router-link></p>
                                </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>
 <script>
 import firebase from'firebase/app';
 import db from '../firestore'
 export default {
    firebase:{
          users:db.ref('users')
         },
     data(){
         
      return{
     userData: {
               firstname: '',
               lastname: '',
               username: '',
               email: '',
               password: ''
            },
            successMessage: '',
            errorMessage: ''
         }
      
     },
     methods:{
        signUp: function() {
  firebase.auth().createUserWithEmailAndPassword(this.userData.email, this.userData.password)
               .then(() => {
                  firebase.auth().currentUser.updateProfile({
                     displayName: this.userData.username
                  }).then(() => {
                     this.$firebaseRefs.users.push({
                        firstname: this.userData.firstname,
                        lastname: this.userData.lastname,
                        username: this.userData.username,
                        email: this.userData.email,
                     }).then(() => {
                        this.$router.replace('/');
                     }).catch(err => {
                        this.errorMessage = err.message;
                     });
                  }).catch(err => {
                     this.errorMessage = err.message;
                  });
               }).catch(err => {
                  this.errorMessage = err.message
               });
}
     }
 }
 </script>