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
                <template slot="option" slot-scope="option">
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
      <b-row class="row-home">
        <p class="title-home-section">CATEGORII DE SERVICII</p>
        <hr class="home-line">
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
      <b-row class="row-home about-us">
        <b-card class="about-us-container"
            img-src="https://i.pinimg.com/236x/a3/a8/2d/a3a82d408b862d026717a6239fa91cb3.jpg" img-alt="Card image" img-right >
          <h4 class="title-about-us">Despre noi</h4>
          <h5 class="line-title-about-us">________</h5>
          <b-card-text>
            <p class="text-about-us">Momentele unice ale vieții sunt cele mai importante.</p>
            <p class="text-about-us">Iubim să aducem un zâmbet pe chipul oamenilor și să luăm parte la momente deosebite.</p>
            <p class="text-about-us">Acesta este și scopul nostru principal. Ne dorim să ne punem amprenta asupra evenimentului tau, </p>
            <p class="text-about-us">să surprindem cele mai fabuloase clipe care să îți încânte chipul de fiecare dată când arunci o privire. </p>
            <p class="text-about-us">Noi suntem o echipă de profeșioniști, pregătită să organizeze momentul tau!</p>
          </b-card-text>
        </b-card>
    </b-row>
      <b-row class="row-home">
        <p class="title-home-section">CELE MAI RECENTE ARTICOLE PUBLICATE</p>
        <hr class="home-line">
      </b-row>
      <b-row class="row-home blog">
        <b-col class="col-blog-article" v-for = "(blogArticle, index) in blogArticles" :key="index">
          <b-card class="blog-article-container" :img-src="blogArticle.image" img-alt="Image" img-height="200px" img-top :title="blogArticle.nameArticle" >
            <b-card-text class="blog-article-text">
              {{blogArticle.shortDescription}}
            </b-card-text>
            <template #footer >
              <small class="blog-article-date">Publicare: <i>{{blogArticle.dateArticle}}</i></small>
            </template>
          </b-card>
        </b-col>
      </b-row>
      <Footer></Footer>
    </div>
</template>
<script>
import axios from 'axios';
// import $ from "jquery";
import moment from 'moment';
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
        enableCarousel: false,
        categoriesProviders: [],
        options: {
          position: {
            start: 0,
          },
          responsive: [
            { end: 576, size: 1 },
            { start: 576, end: 768, size: 2 },
            { size: 4 },
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
        },
        blogArticles: []
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
      getBlogArticlesByDate() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/blog/getBlogsByDate"
        }).then(result => {
          
            if(result.data.length > 0) {
              let blogArticle = {
                image: "",
                nameArticle: "",
                shortDescription: "",
                dateArticle: ""
              }
            for( var i = 0; i < result.data.length; i++) {
              blogArticle = {
                image: result.data[i].image,
                nameArticle: result.data[i].name_article,
                shortDescription: result.data[i].short_description,
                dateArticle: moment(result.data[i].date_article).format('LL')
              }
              this.blogArticles.push(blogArticle);
            }
          }
        })
      }
    },
    mounted() {
      moment.locale('ro');
      this.getCategoriesProviders();
      this.getBlogArticlesByDate();
    },
    computed: {
    }
  }
</script>
<style>
  .row-home {
    margin: 10px 60px !important;
    padding: 20px 0;
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
  .search-home {
    column-gap: 2%;
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
    padding: 60px 50px 70px 60px !important;
    margin: 0 !important;
    background-image: url(https://organizez-images.fra1.digitaloceanspaces.com/homepage%2Fhome-decor.png);
    background-repeat: no-repeat;
    background-size: 200px 270px;
    background-position: right;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  }
  .title-home-section {
    font-size: 18px;
    font-weight: 400;
    margin: 0 !important;
    padding: 20px 0 5px 0px !important;
    text-align: left;
    color: #9c876e;
  }
  .home-line {
    color: #9c876e;
    font-weight: 700;
  }
  .title-about-us {
    color: #9c876e;
    text-transform: uppercase;
    line-height: 2;
    letter-spacing: 0.15em;
    font-size: 20px;
    text-align: center;
    font-family: 'Nord Book';
    font-weight: 500;
    margin-bottom: 0px !important;
  }
  .line-title-about-us {
    padding-bottom: 25px;
  }
  .text-about-us {
    font-weight: 300;
    color: black;
    margin-bottom: 0px !important;
  }
  .about-us-container {
    margin: 0 !important;
    border-radius: 0px !important;
    background-color: #cad2c5 !important;
    border: none !important;
  }
  .about-us-container .card-img-right {
    height: 280px !important;
    width: 250px;
  }
  .card-body {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .row-home.about-us {
    margin: 0px !important;
    padding: 20px 60px;
    background-color: #cad2c5 !important;
    border-top: 1px solid #a4ac86;
    border-bottom: 1px solid #a4ac86;
  }
  .row-home.blog {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .col-blog-article {
    width: 27% !important;
    padding: 0px !important;
    flex: none !important;
  }
  .blog-article-container {
    background-size: 250px !important;
    padding: 0px !important;
    border-radius: 0px !important;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  }
  .blog-article-container .card-img-top {
    border-radius: 0px !important;
  }
  .blog-article-container .card-title {
    margin-bottom: 0px !important;
    color: #9c876e;
    text-transform: uppercase;
    line-height: 2;
    letter-spacing: 0.11em;
    font-size: 16px;
    text-align: center;
    font-family: 'Nord Book';
    font-weight: 400;
  }
  .blog-article-text {
    margin-bottom: 0px !important;
    color: #5e503f;
    font-style: italic;
  }
  .blog-article-container .card-body {
    padding: 5px 0 !important;
  }
</style>
