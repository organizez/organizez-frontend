<template>
    <div class="service-details-page">
      <Unauthenticated-User-Header v-if="this.$route.params.idUser === undefined || this.$route.params.idUser === ''"></Unauthenticated-User-Header>
      <Authenticated-User-Header v-else :idUser="this.$route.params.idUser"></Authenticated-User-Header>
        <div class="service-details-container">
          <b-row class="row-service">
            <p class="title-service">{{service.nameService}}</p>
            <p class="location-service"><font-awesome-icon class="location-icon" icon="fa-solid fa-location-dot" /> {{service.location}}</p>
          </b-row>
          <b-row class="row-service">
            <b-col class="col-service image" sm="12" md="12" lg="12" xl="5">
              <b-img-lazy v-bind="propsImage" :src="service.image1" fluid alt="image" class="image-service" v-b-modal.serviceGallery></b-img-lazy>
            </b-col>   
            <b-col class="col-service image" sm="12" md="12" lg="12" xl="7">
              <b-img-lazy v-bind="propsImage" :src="service.image1" fluid alt="image" class="image-service" v-b-modal.serviceGallery></b-img-lazy>
            </b-col>        
          </b-row>
          <b-row class="row-service">
            <b-modal id="serviceGallery" size="xl" :title="service.nameService" hide-footer>
              <b-carousel
                class="carousel-service-gallery"
                controls
                background="#ababab"
                img-width="1024"
                img-height="450"
                style="text-shadow: 1px 1px 2px #333;">
                <b-carousel-slide
                  :img-src="service.image1"
                ></b-carousel-slide>
                <b-carousel-slide
                  :img-src="service.image2"
                ></b-carousel-slide>
                <b-carousel-slide 
                  :img-src="service.image3"
                ></b-carousel-slide>        
                <b-carousel-slide
                  :img-src="service.image4"
                ></b-carousel-slide> 
              </b-carousel>
            </b-modal>         
          </b-row>
          <b-row class="row-service">
            <b-tabs class="tabs-service">
              <b-tab title="Descriere" active class="tab-service">
                <p class="long-description-service">{{service.longDescription}}</p>
              </b-tab>
              <b-tab title="Informații suplimentare" class="tab-service">
                <b-row class="row-service-tab">
                  <b-col class="col-service-tab" sm="12" md="12" lg="12" xl="2">
                    <p class="title-content-tab">Site:</p>
                  </b-col>
                  <b-col class="col-service-tab" sm="12" md="12" lg="12" xl="10">
                    <p class="text-content-tab site"><i>{{service.siteLink}}</i></p>
                  </b-col>                  
                </b-row>
                <b-row class="row-service-tab" v-if="service.category == 'Restaurante'">
                  <b-col class="col-service-tab" sm="12" md="12" lg="12" xl="2">
                    <p class="title-content-tab">Capacitate:</p>
                  </b-col>
                  <b-col class="col-service-tab" sm="12" md="12" lg="12" xl="10">
                    <p class="text-content-tab">{{service.capacity}} persoane</p>
                  </b-col>                  
                </b-row>
                <b-row class="row-service-tab">
                  <b-col class="col-service-tab" sm="12" md="12" lg="12" xl="2">
                    <p class="title-content-tab">Categorie:</p>
                  </b-col>
                  <b-col class="col-service-tab" sm="12" md="12" lg="12" xl="10">
                    <p class="text-content-tab">{{service.category}}</p>
                  </b-col>                  
                </b-row>
                <b-row class="row-service-tab">
                  <b-col class="col-service-tab" sm="12" md="12" lg="12" xl="2">
                    <p class="title-content-tab">Furnizor:</p>
                  </b-col>
                  <b-col class="col-service-tab" sm="12" md="12" lg="12" xl="10">
                    <p class="text-content-tab">{{service.company}}</p>
                  </b-col>                  
                </b-row>
              </b-tab>
            </b-tabs>
          </b-row>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import UnauthenticatedUserHeader from "../components/UnauthenticatedUserHeader.vue";
import AuthenticatedUserHeader from '../components/AuthenticatedUserHeader.vue';
import Footer from "../components/Footer.vue";
import axios from 'axios';
// import $ from "jquery";
 export default {
    components: {
      AuthenticatedUserHeader,
      UnauthenticatedUserHeader,
      Footer
    },
    data() {
      return {   
        idUser: "",
        idService: 0,
        service: {
          idService: 0,
          nameService: "",
          image1: "",
          image2: "",
          image3: "",
          image4: "",
          shortDescription: "",
          longDescription: "",
          siteLink: "",
          company: "",
          category: "",
          location: ""
        },
        propsImage: {
          blankColor: '#f6f2f0',
          blankHeight: 250,
          class: 'image-service'
        }
      }
    },
    methods: {
      getParams() {
        if(this.$route.params.idUser !== undefined) {
            this.idUser = this.$route.params.idUser;
        }
        this.idService = this.$route.params.idService;
        this.getServiceById();
      },
      getServiceById() {
        axios({
          method: "get",
          headers: {"accept": "application/json"},
          url: "http://localhost:3000/services/getServiceById/" + this.idService
        }).then(result => {
          console.log(result)
            this.service = {
              idService: result.data.id_service,
              nameService: result.data.name_service,
              image1: result.data.image1_service,
              image2: result.data.image2_service,
              image3: result.data.image3_service,
              image4: result.data.image4_service,
              shortDescription: result.data.short_description,
              longDescription: result.data.long_description,
              siteLink: result.data.site_link,
              company: result.data.company,
              category: result.data.category,
              capacity: result.data.capacity,
              location: result.data.location + ', ' + result.data.city + ', ' + result.data.county
            }
        })
      },

    },
    mounted() {
      this.getParams();
    },
  }
</script>
<style>
  .service-details-container {
    width: 75%;
    margin: auto;
  }
  .row-service {
    margin: 0 0 20px 0 !important;
  }
  .col-service.image {
    padding: 15px;
    background-color: #f6f2f0;
  }
  .image-service {
    width: 100% !important;
    height: 300px !important;
    padding: 0px !important;
    box-shadow: 3px 0 5px 0 #ccc;
  }
  #serviceGallery .modal-xl {
    width: 1000px !important;
  }
  #serviceGallery .modal-title {
    font-size: 22px;
    text-align: left;
    font-weight: 600;
    color: #9c876e !important;
    font-family: 'Petrona';
  }
  .carousel-service-gallery {
    background: #f6f2f0 !important;
  }
  .carousel-service-gallery .carousel-indicators {
    display: none !important;
  }
  .carousel-service-gallery .carousel-inner {
    border-radius: 0 !important;
  }
  .carousel-service-gallery .img-fluid {
    height: 450px !important;
  }
  .title-service {
    font-size: 24px;
    text-align: left;
    font-weight: 600;
    color: #000000;
    margin-bottom: 0px !important;
    color: #9c876e !important;
    padding: 0px !important;
  }
  .location-service {
    font-size: 14px;
    color: #000000;
    text-align: left;
    margin-bottom: 0px !important;
    padding: 0px !important;
  }
  .tabs-service .nav-link {
    color: #000000 !important;
    font-size: 16px;
  }
  .tabs-service .nav-link.active {
    color: #588157 !important;
    font-size: 16px;
    font-weight: 600;
  }
  .tabs-service .nav-link:hover {
    color: #588157 !important;
    font-size: 16px;
  }
  .tabs-service .tab-content {
    padding: 25px 16px !important;
    border-right: 1px solid #dee2e6;
    border-left: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }
  .long-description-service {
    font-size: 16px;
    text-align: left;
    color: #000000;
    margin-bottom: 0px !important;    
    padding: 10px 0 0 0 !important;
  }
  .title-content-tab {
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    color: #3a5a40;
    margin-bottom: 0px !important;    
  }
  .text-content-tab {
    font-size: 16px;
    text-align: left;
    color: #000000;
    margin-bottom: 0px !important;    
  }
  .text-content-tab.site {
    color: #3b77b3;
    cursor: pointer;
  }
  .text-content-tab.site:hover {
    font-weight: 600;
  }
</style>