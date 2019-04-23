

<template>
<div>

  <div >

  <div class="col-xs-12 col-sm-12">
                     
                        <div class="card">
                            <div class="card-header">
                                <strong>Add Employee</strong> 
                            </div>
                            <div class="card-body card-block">
                                <form @submit.prevent="addemployee">
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Name</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-address-book"></i></div>
                                        <input class="form-control" v-model="employess.firstname" placeholder="enter your first name"  required type="text">
                                    </div>
                                    
                                </div>
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Phone input</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-phone"></i></div>
                                        <input class="form-control" v-model="employess.phone"  type="number">
                                    </div>
                                       
                                </div>
                            <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Birth</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                                      <input   type="date" name="bday" min="1000-01-01"
                                      max="3000-12-31" class="form-control" placeholder="Selecteer..."  v-model="employess.birth" 
                                      >
                                    </div>
                                    <small class="form-text text-muted">ex. 22 /7 /2017</small>
               
                                </div>
                              
                               
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Eamil</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-envelope"></i></div>
                                        <input class="form-control" v-model="employess.email" type="email" required >
                                    </div>
                                  >
                                </div>
                               
                             <div class="form-group col-sm-6 col-xs-12">
                                  <label class=" form-control-label">country</label>

                                <v-select  data-placeholder="Choose a country..." :value="employess.option" v-model="employess.country" class="standardSelect" :options="employess.option" aria-required="true"> 
                                   
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
         <img :src="employess.image" />
                            
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
                                        <input class="form-control" type="radio" name="radiobutton" value="female" v-model="employess.gender">female
                                         
                                        <input class="form-control" type="radio" name="radiobutton" value="male"  v-model="employess.gender">male
                                        
                                    </div>
                                </div>
                                <div class="col-sm-12 text-center">
                            <button  type="submit" class="btn-primary addemployee" >Add</button>
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
        employess:{
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
    items: db.ref('employees')
  },
  computed: {
    validation: function () {
      return {
        name: !!this.employess.firstname.trim(),
        email: emailRE.test(this.employess.email),
        
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
        vm.employess.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.employess.image = '';
    },
  

      
    addemployee:function(){
        if(this.isValid){
     this.$firebaseRefs.items.push({
      'firstname':this.employess.firstname,
      'phone':this.employess.phone,
      'email':this.employess.email,
      'birth':this.employess.birth,
       'gender':this.employess.gender,
       'country':this.employess.country,
        'image':this.employess.image


    });
    this.employess.firstname='',
     this.employess.phone='',
      this.employess.email='',
      this.employess.birth='',
       this.employess.gender='',
 
      this.$router.push('/Employeeoperation')
     
}
else{
    
}
    },
    
deleteemploy:function(item){
 this.emplpyees.splice(this.emplpyees.indexOf(item),1)
        },
    validtionfirstname:function(){
        if (this.firstname.length < 6  )
        return document.getElementById('error').innerHTML = "your first name must be more than 6 char";
    
    else 
        return document.getElementById('error').innerHTML = "";
    },
     validtionphone:function(){
        if (this.phone.length != 10  )
        return document.getElementById('error').innerHTML = "your phone number must be 10 number";
    
    else 
        return document.getElementById('error').innerHTML = "";
    },
     validtionemail:function(){
        if (!this.email.endsWith('@yahoo.com')  || !this.email.endsWith('@gmail.com'))
        return document.getElementById('error').innerHTML = "your email must end with yahoo.com or gmail.com";
    
    else 
        return document.getElementById('error').innerHTML = "";
    },
    editemploye:function(employee){
        this.firstname=(this.emplpyees.indexOf(employee),employee.firstname)
        this.phone=(this.emplpyees.indexOf(employee),employee.phone),
        this.birth=(this.emplpyees.indexOf(employee),employee.birth)
        this.email=(this.emplpyees.indexOf(employee),employee.email)
        this.country=(this.emplpyees.indexOf(employee),employee.country)
      
    }
  }
}
</script>
