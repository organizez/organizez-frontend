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
      <b-row class="about-us-row-home">
        <div class="module-border-wrap">
          <div class="about-us-homepage-class">
            <div class="main-about-us-hompeage-class">
              <b-card class="card-about-us-homepage-class"
                img-src="https://i.pinimg.com/236x/a3/a8/2d/a3a82d408b862d026717a6239fa91cb3.jpg" img-alt="Card image" img-right >
                <h4 class="h4-about-us-homepage-class">Despre noi</h4>
                <h5 class="h5-class-space">________</h5>
                <b-card-text>
                  <p class="text-about-us-homepga-class">Momentele unice ale vieții sunt cele mai importante.</p>
                  <p class="text-about-us-homepga-class">Iubim să aducem un zâmbet pe chipul oamenilor și să luăm parte la momente deosebite.</p>
                  <p class="text-about-us-homepga-class">Acesta este și scopul nostru principal. Ne dorim să ne punem amprenta asupra evenimentului tau, </p>
                  <p class="text-about-us-homepga-class">să surprindem cele mai fabuloase clipe care să îți încânte chipul de fiecare dată când arunci o privire. </p>
                  <p class="text-about-us-homepga-class">Noi suntem o echipă de profeșioniști, pregătită să organizeze momentul tau!</p>
                </b-card-text>
              </b-card>
            </div>
          </div>
        </div>
      </b-row>
      <HomePageBlog></HomePageBlog>
      <Footer></Footer>
    </div>
</template>
<script>
import axios from 'axios';
// import $ from "jquery";
import MainHeader from "../components/MainHeader.vue";
import Footer from "../components/Footer.vue";
import HomePageBlog from "../components/HomepageBlog.vue"
import VueHorizontalList from "vue-horizontal-list";

 export default {
    components: {
      MainHeader,
      Footer,
      HomePageBlog,
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

  .h5-class-space {
    padding-bottom: 50px;
    padding-left: 460px !important;
  }
  .text-about-us-homepga-class {
    font-family: 'Petrona';
    font-weight: 300;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-left: 460px;
  }
  .h4-about-us-homepage-class {
    font-family: 'Petrona';
    font-weight: 300;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding-left: 460px;
    
  }
  .card-about-us-homepage-class {
    padding-right: 208px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin: 0 !important;
    background-color: #cad2c5 !important ;
  }
  .h5-class-space{
    padding-left: 190px;
  }
  .main-about-us-hompeage-class {
    padding-top: 30px !important;
    padding-bottom: 30px !important;
    margin: 0px !important;
  
  }
</style>
