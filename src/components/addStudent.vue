

<template>
<div>
  <div >

  <div class="col-xs-12 col-sm-12">
                     
                        <div class="card">
                            <div class="card-header">
                                <strong>Add Student</strong> 
                            </div>
                            <div class="card-body card-block">
                                <form @submit.prevent="addstudent" method="post" >
                                   <p v-if="errors.length">
                             <b>Please correct the following error(s):</b>
                                 
                                   </p>
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Name</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-address-book"></i></div>
                                        <input class="form-control" v-model="students.firstname" placeholder="enter your first name" required  >
                                    </div>
                                    <small class="form-text text-muted">ex. dina Mahmoud </small>
                                </div>
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Phone input</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-phone"></i></div>
                                        <input class="form-control" v-model="students.phone" required  type="number" >
                                    </div>
                                        <small class="form-text text-muted">ex. (999) 999-9999</small>
                                </div>
                            <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Birth</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                                      <input   type="date" name="bday" min="1000-01-01"
                                      max="3000-12-31" class="form-control" placeholder="Selecteer..."  v-model="students.birth" 
                                      required >
                                    </div>
               
                                </div>
                              
                               
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Eamil</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-envelope"></i></div>
                                        <input class="form-control" v-model="students.email" required  type="email">
                                    </div>
                                </div>
                               
                             <div class="form-group col-sm-6 col-xs-12">
                                  <label class=" form-control-label">country</label>

                                <v-select  data-placeholder="Choose a country..." :value="students.option" v-model="students.country" class="standardSelect" :options="students.option"> 
                                   
                                </v-select>

                            </div>
                             
                            <div class="form-group col-sm-3 col-xs-6">
                                  <label class=" form-control-label">upload your image</label>

                                  <div >
                                <label class="customfile" >
                                <input type="file" @change="onFileChange" class="uploadfile" required>
                                upload file
                                </label>
                                <button type="button" class="btn btn-primary viewimage" data-toggle="modal" data-target="#exampleModal">
                                    view image
                                </button>
                                   
                              
                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                   <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">view upload image</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
         <img :src="students.image" />
                            
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
        <button type="button" class="btn btn-primary" @click="removeImage">remove Image</button>
      </div>
    </div>
  </div>
                                 
                              </div>                                   
                               </div>
                            </div>
                            <div class="form-group col-sm-3 col-xs-6">
                                    <label class=" form-control-label">Gender</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-male"></i></div>
                                        <input class="form-control" type="radio" name="radiobutton" value="female" v-model="students.gender">female
                                         
                                        <input class="form-control" type="radio" name="radiobutton" value="male"  v-model="students.gender">male
                                        
                                    </div>
                                    
                                </div>
                            <div class="col-sm-12 text-center">
                            <button  type="submit" class="btn-primary addemployee text-center" >Add</button>
                            </div>
                                
                                </form>
                        </div>
                        
                        
                            </div>
                        </div>
                    </div>
                   

</div>

     
              
           





</template>
<script>
import Datepicker from 'vuejs-datepicker';
import vSelect from 'vue-select'
import firebase from 'firebase/app'
import db from '../firestore'
import { parse } from 'path';
var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
    components:{
    Datepicker,
    vSelect,
   
   
    },
  data(){
    return{
      errors:[],
       students:{
         
     firstname:'',
     phone:'',
     email:'',
     birth:'',
     gender:'',
     country:'',
     option:[
         'Cairo',
         'Giza',
         'Zagazig'
     ],
     image:''
     
        },
     
    
  }
  },
  firebase: {
    items: db.ref('students')
  },
  computed: {
    validation: function () {
      return {
        name: !!this.students.firstname.trim(),
        email: emailRE.test(this.students.email),
        
      }

    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods:{
     checkForm: function (e) {
      if (this.students.firstname && this.students.email && this.students.phone) {
        return true;
      }

      this.errors = [];

      if (!this.students.firstname) {
        this.errors.push('Name required.');
      }
      if (!this.students.email) {
        this.errors.push('Age required.');
      }
      if (!this.students.phone ) {
        this.errors.push('phone must be number');
      }

      e.preventDefault();
    },
  
      onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.students.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.students.image = '';
    },
  

      
    addstudent:function(){
        if(this.isValid){
     this.$firebaseRefs.items.push({
      'firstname':this.students.firstname,
      'phone':this.students.phone,
      'email':this.students.email,
      'birth':this.students.birth,
       'gender':this.students.gender,
       'country':this.students.country,
        'image':this.students.image


    });
    this.students.firstname='',
     this.students.phone='',
      this.students.email='',
      this.students.birth='',
       this.students.gender='',
 
      this.$router.push('/studentopera')
     
}
else{
    
}
    },
    

  
  }
}
</script>
