<template>
  <div id="app">
	 <div>
    <sidebar v-show="$route.path==='/signup' || $route.path==='/login' ? false : true"></sidebar>
<div id="right-panel" class="right-panel" >
   <navbar  v-show="$route.path==='/signup' || $route.path==='/login' ? false : true"></navbar>
    
   <router-view></router-view>
</div>
	 </div>

</div>


 
</template>

<script>
import navbar from './components/navbar.vue'
import sidebar from './components/sidebar.vue'
import Home from './components/home.vue'
export default {
  name: 'app',
  components: {
   navbar,
   Home,
   sidebar
  },
  /*mounted(){
	   var rightpanel= document.getElementById('right-panel')
		  if(this.$route.path==='/signup' || this.$route.path==='/login'){
			 
			rightpanel.className = rightpanel.className.replace("");
		  }
		  else{
			   rightpanel.className = rightpanel.className.replace("right-panel");
		  }
	  }*/
  
  
}
$.noConflict();

jQuery(document).ready(function($) {

	

	[].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {
		new SelectFx(el);
	} );

	jQuery('.selectpicker').selectpicker;


	$('#menuToggle').on('click', function(event) {
		$('body').toggleClass('open');
	});

	$('.search-trigger').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').addClass('open');
	});

	$('.search-close').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.search-trigger').parent('.header-left').removeClass('open');
	});

	// $('.user-area> a').on('click', function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$('.user-menu').parent().removeClass('open');
	// 	$('.user-menu').parent().toggleClass('open');
	// });


});

</script>

<style>

</style>
