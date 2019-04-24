<template>
<div >
    
<div class="sufee-login d-flex align-content-center flex-wrap">
        <div class="">
            
          
            <div class="login-content">
                
                
                <div class="login-form " >
                    <div class="col-md-6 login_img">
                    <img src="../assets/log.jpg" class="img-responsive">
                </div>
                    <form @submit.prevent="login" class="col-md-6">
                        <div class="form-group">
                            <label>Email address</label>
                            <input type="email" class="form-control" placeholder="Email" v-model="email">
                        </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>
                                
                                <button  class="btn btn-success btn-flat m-b-30 m-t-30" >Sign in</button>
                                
                                <div class="register-link m-t-15 text-center">
                                    <p>Don't have account ? <router-link
                                    to="/signup"> Sign Up Here</router-link></p>
                                </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>
 <script>
 import firebase from 'firebase/app' ;
 export default {
     
     data(){
      return{
          email:'',
          password:''

      }

     },
     methods:{
         login:function(){
          firebase.auth().signInWithEmailAndPassword(this.email ,this.password).then(
              
          user => {
                  console.log(user);
                  this.$router.replace('/');
               })
               .catch(err => {
                  this.errorMessage = err.message
               });
         }
     }
 }
 </script>
 

