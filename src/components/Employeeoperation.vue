<template>
<div>
    <div class="animated fadeIn">
                <div >

                    <div >
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Employee Operation</strong>
                            </div>
                            <div class="card-body table-responsive">
                                <table id=" employeeopera" class="table table-striped table-bordered table-responsive display nowrap ">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>phone</th>
                                            <th>email</th>
                                          <th>BirthDay</th>
                                             <th>Gender</th>
                                             <th>country</th>
                                             <th>Teacher image</th>
                                            <th>operation</th>
                                         
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        <tr v-for="(employee , index) in items" :key="employee['.key']" >
                                            <td>{{index +1}}</td>
                                            <td>{{employee.firstname}}</td>
                                            <td>{{employee.phone}}</td>
                                            <td>{{employee.email}}</td>
                                             <td>{{employee.birth}}</td>
                                              <td>{{employee.gender}}</td>
                                              <td>{{employee.country}}</td>
                                              <td ><img :src="employee.image" class="tech_img"></td>
                                            
                                            <td  class="opera"><router-link class="fa fa-pencil-square edit" :to="{ name: 'Editemployee', params: {id: employee['.key']} }"></router-link>
                                            <i class="fa fa-trash delete" @click="showAlert(employee['.key'])"></i>
                                            </td>
                                            
                                        </tr>
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>
    </div>
</div>
</template>
<script>
import db from '../firestore'
import Swal from 'sweetalert2'


export default {
    components:{
        
         Swal,
        
    },
    data() {
    return {
      employees: [],
      
    }
  },
  firebase: {
    items: db.ref('employees')
  },
  
  methods:{
      showAlert:function(item){
            // Use sweetalert2
           Swal.fire({
  title: 'Are you sure?',
  text: 'you will Delete employee',

showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {
      this.deleteemploy(item)
    Swal.fire(
      'Deleted!',
      'Your imaginary file has been deleted.',
      'success'
    )
  // For more information about handling dismissals please visit
  // https://sweetalert2.github.io/#handling-dismissals
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
})
},

      deleteemploy:function(item){
 this.$firebaseRefs.items.child(item).remove()
        }
  },
  
}

</script>
