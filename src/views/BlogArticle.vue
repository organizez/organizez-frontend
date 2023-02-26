<template>
    <div class="blog-article-page">
        <Main-Header></Main-Header>
        <div class="blog-article-container">
           
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import MainHeader from "../components/MainHeader.vue";
import Footer from "../components/Footer.vue";
import axios from 'axios';
// import $ from "jquery";
 export default {
    components: {
        MainHeader,
        Footer
    },
    data() {
      return {  
      }
    },
    methods: {

    },
    mounted() {
       
    },
  }
</script>
<style>

</style>