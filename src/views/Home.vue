<template>
    <div class="home-page">
      <Main-Header></Main-Header>
      <b-row class="row-home row-search">
        <b-row class="search-home">
          <p class="title-search-home">Aveți un eveniment de organizat?</p>
          <p class="subtitle-search-home">Găsiți peste 100 de servicii pregătite pentru crearea evenimentului perfect</p>
        </b-row>
        <b-row class="search-home">
          <b-col sm="12" md="6" lg="6" xl="4" class="col-search-home">
            <v-select 
              v-bind:options="locations"
              v:bind:key="location.idLocation"
              label="location"
              v-model="chosenLocation.location"
              placeholder="Introduceți orașul sau județul evenimentului"
              @search="searchLocations"
              @input="setLocation"
              class="search-location">
              <span slot="no-options">
                Nu a fost găsit niciun oraș sau județ
              </span>
                <template slot="option" slot-scope="option" class="search-location-template">
                  <b-row>
                    <b-col cols="1">
                      <span><font-awesome-icon icon="fa-location-dot" class="icon-dot-location"/></span>
                    </b-col>
                    <b-col cols="11">
                      <p class="location-search">{{ option.location }}</p>
                      <p class="category-search">{{ option.categoryLocation }}</p>
                    </b-col>
                  </b-row>
                </template>
            </v-select>
          </b-col>
          <b-col sm="12" md="6" lg="6" xl="4" class="col-search-home">
            <v-select :options="categoriesProviders"   
              v-model="chosenCategoryProviders.category"
              label="category"
              v:bind:key="category.idCategory"
              placeholder="Categoria de servicii" 
              @input="setCategory" 
              class="search-category">
            </v-select>
          </b-col>
          <b-col sm="12" md="6" lg="6" xl="2" >
            <b-button class="search-button main-button">Caută</b-button>
          </b-col>
        </b-row>
      </b-row>
      <b-row class="row-home carousel-home">
        <vue-horizontal-list :items="categoriesProviders" :options="options" v-if="enableCarousel" class="categories-carousel">
          <template v-slot:default="{ item }">
            <div class="item">
              <b-img :src="item.categoryImage" rounded="circle" alt="Circle image" class="category-image"></b-img>
              <p class="category-name">{{ item.category }}</p>
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
        enableCarousel: false,
        categoriesProviders: [],
        options: {
          position: {
            start: 0,
          },
          responsive: [
            { end: 576, size: 1 },
            { start: 576, end: 768, size: 2 },
            { size: 3 },
          ],
        },
        locations: [],
        chosenLocation: {
          idLocation: "",
          location: "",
          categoryLocation: ""
        },
        chosenCategoryProviders: {
          idCategory: "0",
          category: ""
        }
      }
    },
    methods: {
      async getLocations(location) {
        return await axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/cities/locationContainsName/" + location
        })
      },
      searchLocations(location) {
        if(location.length >= 3) {
          this.locations = [];
          this.getLocations(location).then(result => {
            let location = {
              key: "",
              idLocation: "",
              location: "",
              categoryLocation: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              location = {
                key: result.data[i].category_location + i,
                idLocation: result.data[i].id_location,
                location: result.data[i].location,
                categoryLocation: result.data[i].category_location,
              }
              this.locations.push(location);
            }
          })   
        }
      },
      setCategory(value) {
        if(value == null) {
          this.chosenCategoryProviders = {
            idCategory: "",
            category: ""
          }
        } else {
          this.chosenCategoryProviders = {
            idCategory: value.idCategory,
            category: value.category
          }
        }
      },
      setLocation(value) {
        if(value == null) {
          this.chosenLocation = {
            idLocation: "",
            location: "",
            categoryLocation: ""
          }
        } else {
          this.chosenLocation = {
            idLocation: value.idLocation,
            location: value.location,
            categoryLocation: value.categoryLocation
          }
        }
      },
      getCategoriesProviders() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/categoryProviders/getAllCategoriesProviders"
        }).then(result => {
          if(result.data.length > 0) {
            let categoryProviders = {
              idCategory: 0,
              category: "",
              categoryImage: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              categoryProviders = {
                idCategory: result.data[i].id_category,
                category: result.data[i].category,
                categoryImage: result.data[i].category_image
              }
              this.categoriesProviders.push(categoryProviders);
            }
            this.enableCarousel = true;
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
  .category-image {
    width: 145px !important;
    height: 140px !important;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  }
  .category-name {
    color: #000000;
    font-size: 16px;
    padding-top: 15px !important;
  }
  .search-location-template {
    flex-direction: row;
    padding: 5px;
  }
  .location-search {
    margin-bottom: 0px !important;
    padding-bottom: 0px !important;
    font-size: 16px;
    color: #000000;
  }
  .category-search {
    margin-bottom: 0px !important;
    font-size: 13px;
    color:#808080;
    font-weight: 400;
  } 
  .search-location, .search-category {
    flex: 1;
    background: #FFFFFF;
    border: 1px solid #ced4da !important;
    color: #000000;
  }
  .search-location #vs1__combobox, .search-location .vs__dropdown-toggle,
  .search-category #vs1__combobox, .search-category .vs__dropdown-toggle {
    border: none;
    border-radius: 0;
    height: 40px !important;
  }
  .search-location .vs__open-indicator {
    display: none;
  }
  .search-location .vs__dropdown-menu {
    border: 0 !important;
  }
  .icon-dot-location {
    font-size: 16px;
    color:#588157;
  }
  .vs__dropdown-option--highlight {
    background-color: #f6f2f0 !important;
    color: #000000 !important;
  }
  .search-button {
    display: flex !important;
    justify-content: flex-start;
    width: auto !important;
    padding: 0 30px !important;
    background-color: #3a5a40 !important;
    border-radius: 0px !important;
    height: 100% !important;
    align-items: center;
  }
  .title-search-home {
    font-size: 24px;
    font-weight: 400;
    margin: 0 !important;
    padding-bottom: 5px;
    text-align: left;
    color:#9c876e;
  }
  .subtitle-search-home {
    font-size: 16px;
    margin: 0 !important;
    padding-bottom: 20px;
    text-align: left;
    color:#9c876e;
  }
  .row-search.row-home {
    background-color: #f6f2f0 !important;
    padding: 50px 50px 70px 50px !important;
    margin: 0 !important;
    background-image: url(https://organizez-images.fra1.digitaloceanspaces.com/homepage%2Fhome-decor.png);
    background-repeat: no-repeat;
    background-size: 200px 270px;
    background-position: right;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
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
