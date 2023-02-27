<template>
    <div class="services-page">
        <Main-Header></Main-Header>
        <div class="services-container">
            <b-row>
                <h4 class="search-results"><font-awesome-icon icon="fa-solid fa-map-pin" class="map-pin-icon" /> Locatie <font-awesome-icon icon="fa-solid fa-rectangle-list" class="rectangle-list-icon" />Category</h4>
            </b-row>
            <b-row class="services-found-container">
                <b-overlay :show="isLoading" rounded="sm" class="spinner" spinner-type="grow">
                    <b-row class="service-found" v-for="service in services" :key="service.idService">
                        <b-row class="row-services-found" sm="12" md="12" lg="5" xl="12">
                            <b-img :src="service.image" fluid alt="image" class="image-service-found"></b-img>
                        </b-row>
                        <b-row class="row-services-found" sm="12" md="12" lg="12" xl="12">
                            <p class="title-service-found">{{service.nameService}}</p>
                            <p class="location-service-found"><font-awesome-icon class="location-icon" icon="fa-solid fa-location-dot" /> {{service.location}}</p>
                            <p class="description-service-found">{{service.shortDescription}}</p>
                        </b-row>
                        <b-row class="row-services-found button">
                            <b-button class="view-service-button main-button" @click="redirectToService(service.idService)">Descoperă <font-awesome-icon icon="fa-solid fa-angle-right" class="angle-right-icon"/></b-button>
                        </b-row>
                    </b-row>
                </b-overlay>
            </b-row>
            <b-row class="row-services">
                <b-pagination
                    v-model="currentPage"
                    :total-rows="servicesNumber"
                    :per-page="perPageServices"
                    @input="getServices()"
                    class="site-pagination-table">
                </b-pagination>
            </b-row>
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
        isLoading: true,
        services: [],
        servicesNumber: 0,
        currentPage: 1,
        perPageServices: 8,
        iteration: 0,
      }
    },
    methods: {
        getServicesNumber(){
            axios({
                method: "get",
                headers: {"accept": "application/json"},
                url: "http://localhost:3000/services/getServicesNumber"
            }).then(result => {
                this.servicesNumber = result.data[0].services_number;
                this.getServices();
            })
        },
        getServices(){
            let thisRef = this;
            this.iteration = (this.currentPage - 1) * this.perPageServices;
            if(this.isLoading !== true){
            this.isLoading = true;
            }
            this.services = [];
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "http://localhost:3000/services/getAllServices/" + this.iteration
            }).then(result => {
                if(result.data.length > 0) {
                    let service = {
                        idService: 0,
                        nameService: "",
                        location: "",
                        image: "",
                        shortDescription: "",
                        longDescription: "",
                        id_provider: 0,
                        company: ""
                    }
                    for(var i = 0; i < result.data.length; i++) {
                        service = {
                            idService: result.data[i].id_service,
                            nameService: result.data[i].name_service,
                            image: result.data[i].image1_service,
                            shortDescription: result.data[i].short_description,
                            company: result.data[i].company,
                            location: result.data[i].location + ', ' + result.data[i].city + ', ' + result.data[i].county
                        }
                        this.services.push(service);
                    }
                    setTimeout(function() {
                        thisRef.isLoading = false;
                    }, 2000);
                }
            })
        },
        redirectToService(idService) {
            this.$router.push('/' + idService);
        }
    },
    mounted() {
      this.getServicesNumber();
    },
  }
</script>
<style>
    .services-container {
        width: 70%;
        margin: auto;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .search-results {
        font-size: 18px;
        text-align: left;
    }
    .map-pin-icon {
        color: #B22222;
    }
    .spinner {
        position: relative !important;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .service-found {
        width: 45%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        padding: 20px !important;
        margin-bottom: 35px;
        border: 1px solid #dad7cd;
        box-shadow: 0 8px 32px 0 rgb(213 189 175 / 20%);
        border-radius: 10px !important;
    }
    .service-found:hover {
        box-shadow: 0 8px 32px 0 rgb(213 189 175 / 50%)
    }
    .row-services-found {
        padding: 0px !important;
        margin: 0px !important;
    }
    .rectangle-list-icon {
        padding: 0 5px 0 25px !important;
        color:#3b77b3;
    }
    .location-icon {
        font-size: 18px;
        color: #3b77b3;
        margin-right: 5px;
    }
    .title-service-found {
        font-size: 16px;
        text-align: left;
        font-weight: 600;
        color: #000000;
        margin-bottom: 0px !important;
        color: #9c876e !important;
        padding: 0px !important;
    }
    .location-service-found {
        font-size: 12px;
        color: #000000;
        text-align: left;
        margin-bottom: 0px !important;
        padding: 0px !important;
    }
    .description-service-found {
        font-size: 14px;
        text-align: left;
        color: #000000;
        margin-bottom: 0px !important;    
        padding: 10px 0 0 0 !important;
    }
    .image-service-found {
        width: 100% !important;
        height: 180px !important;
        padding: 0px !important;
    }
    .view-service-button {
        width: auto !important;
        padding: 5px 20px !important;
        background-color: #3a5a40 !important;
        border-radius: 0px !important;
        margin: 10px 0 0 0 !important;
        cursor: pointer;
    }
    .row-services-found.button {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    .angle-right-icon {
        font-size: 10px;
        color: #FFFFFF;
    }
</style>