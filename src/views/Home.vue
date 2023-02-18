<template>
    <div class="home-page">
      <Main-Header></Main-Header>
      <b-row class="row-home">
      <vue-horizontal-list :items="categoriesProviders" :options="options" v-if="categoriesProviders !== []" class="categories-carousel">
        <template v-slot:default="{ item }">
          <div class="item">
            <h3>{{ item.idCategory }}</h3>
            <p>{{ item.category }}</p>
          </div>
        </template>
      </vue-horizontal-list>
      </b-row>
      <Footer></Footer>
    </div>
</template>
<script>
import axios from 'axios';
// import $ from "jquery";
import MainHeader from "../components/MainHeader.vue";
import Footer from "../components/Footer.vue";
import VueHorizontalList from "vue-horizontal-list";

 export default {
    components: {
      MainHeader,
      Footer,
      VueHorizontalList
    },
    data() {
      return {
        categoriesProviders: [],
        options: {
          position: {
            start: 10,
          },
          responsive: [
            { end: 576, size: 1 },
            { start: 576, end: 768, size: 2 },
            { size: 3 },
          ],
        },
      }
    },
    methods: {
      getCategoriesProviders() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/categoryProviders/getAllCategoriesProviders"
        }).then(result => {
          if(result.data.length > 0) {
            let categoryProviders = {
              idCategory: 0,
              category: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              categoryProviders = {
                idCategory: result.data[i].id_category,
                category: result.data[i].category
              }
              this.categoriesProviders.push(categoryProviders);
            }
            console.log(this.categoriesProviders)
          }
        })
      },
    },
    mounted() {
      this.getCategoriesProviders();
    },
    computed: {
    }
  }
</script>
<style>
  .row-home {
    margin: 10px 50px!important;
  }
  .categories-carousel {
    padding: 0 !important;
  }

</style>