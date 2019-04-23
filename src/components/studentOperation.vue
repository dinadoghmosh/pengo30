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
                                <table id="bootstrap-data-table-export" class="table table-striped table-bordered table-responsive">
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
                                        
                                        <tr v-for="(student , index) in items" :key="student['.key']" >
                                            <td>{{index +1}}</td>
                                            <td>{{student.firstname}}</td>
                                            <td>{{student.phone}}</td>
                                            <td>{{student.email}}</td>
                                             <td>{{student.birth}}</td>
                                              <td>{{student.gender}}</td>
                                              <td>{{student.country}}</td>
                                              <td ><img :src="student.image" class="tech_img"></td>
                                            
                                            <td  class="opera"><router-link class="fa fa-pencil-square edit" :to="{ name: 'Editstudent', params: {id: student['.key']} }"></router-link>
                                            <i class="fa fa-trash delete" @click="showAlert(student['.key'])"></i>
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
import firebase from 'firebase/app'
import db from '../firestore'
import Swal from 'sweetalert2'


export default {
    components:{
         name: 'ListItem',
         Swal,
        
    },
    data() {
    return {
      students: []
    }
  },
  firebase: {
    items: db.ref('students')
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
      this.deletestudent(item)
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

      deletestudent:function(item){
 this.$firebaseRefs.items.child(item).remove()
        }
  }
}
</script>
