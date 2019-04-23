<template>
<div>
  <div >

  <div class="col-xs-12 col-sm-12">
                     
                        <div class="card">
                            <div class="card-header">
                                <strong>Edit Student</strong> 
                            </div>
                            <div class="card-body card-block">
                                <form @submit.prevent="updateItem">
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Name</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-address-book"></i></div>
                                        <input class="form-control" v-model="student.firstname" placeholder="enter your first name" >
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Phone input</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-phone"></i></div>
                                        <input class="form-control" v-model="student.phone" type="number"   >
                                    </div>
                                </div>
                            <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Birth</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                                      <input   type="date" name="bday" min="1000-01-01"
                                      max="3000-12-31" class="form-control" placeholder="Selecteer..."  v-model="student.birth" 
                                      required>
                                    </div>
               
                                </div>
                               
                               
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Eamil</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-envelope"></i></div>
                                        <input class="form-control" v-model="student.email"  required text="email">
                                    </div>
                                </div>
                               
                             <div class="form-group col-sm-6 col-xs-12">
                                  <label class=" form-control-label">country</label>

                                <v-select  data-placeholder="Choose a country..." :value="student.option" v-model="student.country" class="standardSelect" :options="option"> 
                                   
                                </v-select>

                            </div>
                            
                            <div class="form-group col-sm-3 col-xs-6">
                                    <label class=" form-control-label">Gender</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-male"></i></div>
                                        <input class="form-control" type="radio" name="radiobutton" value="female" v-model="student.gender">female
                                         
                                        <input class="form-control" type="radio" name="radiobutton" value="male"  v-model="student.gender">male
                                        
                                    </div>
                                </div>
                                <div class="col-sm-12 text-center">
                            <button  type="submit" class="btn-primary addemployee" >Edit</button>
                                </div>
                                </form>
                        </div>
                        
                        
                            </div>
                        </div>
                    </div>
</div>

    
</template>
<script>
import firebase from 'firebase/app'
import db from '../firestore'
import vSelect from 'vue-select'
export default {
    components:{
     name: 'EditItem',
     vSelect
    },
    firebase: {
    items: db.ref('students'),
    itemsObj: {
      source: db.ref('students'),
      asObject: true
    },
     computed: {
    validation: function () {
      return {
        
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
  },
  data(){
      return {
      student: {
       
      },
       option:[
         'Cairo',
         'Giza',
         'Zagazig'
     ],
    
    }
  },
  created() {
     let item = this.itemsObj[this.$route.params.id]
     this.student = {
       'firstname': item.firstname,
       'phone': item.phone,
       'email': item.email,
       'birth':item.birth,
       'gender':item.gender,
       'country':item.country,
       
       
       }
  },
   methods: {
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
       
    updateItem:function() {
      this.$firebaseRefs.items.child(this.$route.params.id).set(this.student);
      this.$router.push('/studentopera')
    }
  }
}
</script>
