<template>
<div>


  <div class="col-xs-12 col-sm-12">
                     
                        <div class="card">
                            <div class="card-header">
                                <strong>Edit Employee</strong> 
                            </div>
                            <div class="card-body card-block">
                                <form @submit.prevent="updateItem">
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Name</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-address-book"></i></div>
                                        <input class="form-control" v-model="employee.firstname" placeholder="enter your first name" >
                                    </div>
                                </div>
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Phone input</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-phone"></i></div>
                                        <input class="form-control" v-model="employee.phone" type="number"   >
                                    </div>
                                </div>
                            <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Birth</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                                      <input   type="date" name="bday" min="1000-01-01"
                                      max="3000-12-31" class="form-control" placeholder="Selecteer..."  v-model="employee.birth" 
                                      required>
                                    </div>
               
                                </div>
                               
                               
                                <div class="form-group col-sm-6 col-xs-12">
                                    <label class=" form-control-label">Eamil</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-envelope"></i></div>
                                        <input class="form-control" v-model="employee.email"  required text="email">
                                    </div>
                                </div>
                               
                             <div class="form-group col-sm-6 col-xs-12">
                                  <label class=" form-control-label">country</label>

                                <v-select  data-placeholder="Choose a country..." :value="employee.option" v-model="employee.country" class="standardSelect" :options="option"> 
                                   
                                </v-select>

                            </div>
                            
                            <div class="form-group col-sm-3 col-xs-6">
                                    <label class=" form-control-label">Gender</label>
                                    <div class="input-group">
                                        <div class="input-group-addon"><i class="fa fa-male"></i></div>
                                        <input class="form-control" type="radio" name="radiobutton" value="female" v-model="employee.gender">female
                                         
                                        <input class="form-control" type="radio" name="radiobutton" value="male"  v-model="employee.gender">male
                                        
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
    items: db.ref('employees'),
    itemsObj: {
      source: db.ref('employees'),
      asObject: true
    }
  },
  data(){
      return {
      employee: {},
        option:[
         'Cairo',
         'Giza',
         'Zagazig'
     ],
    }
  },
  created() {
     let item = this.itemsObj[this.$route.params.id]
     this.employee = {
       'firstname': item.firstname,
       'phone': item.phone,
       'email': item.email,
       'birth' :item.birth,
       'country':item.country,
      'gender':item.gender
     }
  },
   methods: {
    updateItem:function() {
      this.$firebaseRefs.items.child(this.$route.params.id).set(this.employee);
      this.$router.push('/Employeeoperation')
    }
  }
}
</script>
