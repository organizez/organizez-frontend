<template>
    <div class="services-page">
        <Unauthenticated-User-Header v-if="this.$route.params.idUser === undefined || this.$route.params.idUser === ''"></Unauthenticated-User-Header>
        <Authenticated-User-Header v-else :idUser="this.$route.params.idUser"></Authenticated-User-Header>
        <b-row class="row-services header">
            <p v-if='services.length > 0' class="title-services-found">{{titleServicesFound}}</p>
            <p v-else class="title-services-found">Niciun serviciu nu a fost găsit</p>
        </b-row>
        <div class="services-container" v-if='services.length > 0'>
            <b-row class="services-found-container">
                <b-overlay :show="isLoading" rounded="sm" class="spinner" spinner-type="grow">
                    <b-row class="service-found" v-for="service in services" :key="service.idService">
                        <b-row class="row-services-found" sm="12" md="12" lg="12" xl="12">
                            <b-img :src="service.image1" fluid alt="image" class="image-service-found"></b-img>
                        </b-row>
                        <b-row class="row-services-found text" sm="12" md="12" lg="12" xl="12">
                            <p class="title-service-found">{{service.name}}</p>
                            <p class="location-service-found"><font-awesome-icon class="location-icon" icon="fa-solid fa-location-dot" /> {{service.location}}</p>
                            <p class="description-service-found">{{service.shortDescription}}</p>
                        </b-row>
                        <b-row class="row-services-found button">
                            <b-button class="view-service-button main-button" @click="redirectToService(service.idCustomerService)">Descoperă <font-awesome-icon icon="fa-solid fa-angle-right" class="angle-right-icon"/></b-button>
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
import UnauthenticatedUserHeader from "../components/UnauthenticatedUserHeader.vue";
import AuthenticatedUserHeader from '../components/AuthenticatedUserHeader.vue';
import Footer from "../components/Footer.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
    components: {
        AuthenticatedUserHeader,
        UnauthenticatedUserHeader,
        Footer
    },
    data() {
      return {    
        idUser: "",    
        isLoading: true,
        services: [],
        servicesNumber: 0,
        currentPage: 1,
        perPageServices: 8,
        iteration: 0,
        county: "",
        servicesCategory: "",
        titleServicesFound: "",
        getServicesNumberRoute: "",
        getServicesRoute: ""
      }
    },
    methods: {
        getParams() {
            if(this.$route.params.idUser !== undefined) {
                this.idUser = this.$route.params.idUser;
            }
            if(this.$route.params.idCounty !== undefined) {
                this.idCounty = this.$route.params.idCounty;
            }
            if(this.$route.params.idServicesCategory !== undefined) {
                this.idServicesCategory = this.$route.params.idServicesCategory;
            }   
            // if(this.idCounty === "0") {
            //     if(this.idServicesCategory === "0") {
            //         this.getServicesNumberRoute = "http://localhost:3000/services/getServicesNumberAllCountiesAndAllCategories";
            //         this.getServicesRoute = "http://localhost:3000/services/getServicesAllCountiesAndAllCategories/" + this.iteration;
            //         this.titleServicesFound = "Toate serviciile";
            //     } else {
            //         this.getServicesNumberRoute = "http://localhost:3000/services/getServicesNumberAllCountiesAndSingleCategory/" + this.idServicesCategory;
            //         this.getServicesRoute = "http://localhost:3000/services/getServicesAllCountiesAndSingleCategory/" + this.idServicesCategory + "/" + this.iteration;
            //     }
            // } else {
            //     if(this.idServicesCategory === "0") {
            //         this.getServicesNumberRoute = "http://localhost:3000/services/getServicesNumberSingleCountyAndAllCategories/" + this.idCounty;
            //         this.getServicesRoute = "http://localhost:3000/services/getServicesSingleCountyAndAllCategories/" + this.idCounty + "/" + this.iteration;
            //     } else {
            //         this.getServicesNumberRoute = "http://localhost:3000/services/getServicesNumberByCountyAndCategory/" + this.idCounty + "/" + this.idServicesCategory;
            //         this.getServicesRoute = "http://localhost:3000/services/getServicesByCountyAndCategory/" + this.idCounty + "/" + this.idServicesCategory + "/" + this.iteration 
            //     }
            // }
            // this.getServicesNumber();  
            this.getCustomersNumber();      
        },
        // getServicesNumber() {
        //     axios({
        //         method: "get",
        //         headers: {"accept": "application/json"},
        //         url: this.getServicesNumberRoute
        //     }).then(result => {
                
        //         this.servicesNumber = result.data[0].services_number;
        //         this.getServices();
        //     })
        // },
        // getServices(){
        //     let thisRef = this;
        //     this.iteration = (this.currentPage - 1) * this.perPageServices;
        //     if(this.isLoading !== true) {
        //         this.isLoading = true;
        //     }
        //     this.services = [];
        //     axios({
        //         method: "get",
        //         headers: {"accept":"application/json"},
        //         url: this.getServicesRoute 
        //     }).then(result => {
        //         if(this.idCounty !== "0" && this.idServicesCategory !== "0") {
        //             this.county = result.data[0].county;
        //             this.servicesCategory = result.data[0].category;
        //             this.titleServicesFound = this.servicesCategory + " în " + this.county;
        //         } else if(this.idCounty === "0" && this.idServicesCategory !== "0") {
        //             this.servicesCategory = result.data[0].category;
        //             this.titleServicesFound = this.servicesCategory;
        //         } else if(this.idCounty !== "0" && this.idServicesCategory === "0") {
        //             this.county = result.data[0].county;
        //             this.titleServicesFound = "Toate serviciile din " + this.county;
        //         }

        //         if(result.data.length > 0) {
        //             let service = {
        //                 idService: 0,
        //                 nameService: "",
        //                 location: "",
        //                 image: "",
        //                 shortDescription: "",
        //                 longDescription: "",
        //                 id_provider: 0,
        //                 company: ""
        //             }
        //             for(var i = 0; i < result.data.length; i++) {
        //                 service = {
        //                     idService: result.data[i].id_service,
        //                     nameService: result.data[i].name_service,
        //                     image: result.data[i].image1_service,
        //                     shortDescription: result.data[i].short_description,
        //                     company: result.data[i].company,
        //                     location: result.data[i].location + ', ' + result.data[i].city 
        //                 }
        //                 this.services.push(service);
        //             }
        //             setTimeout(function() {
        //                 thisRef.isLoading = false;
        //             }, 2000);
        //         } else {
        //             thisRef.isLoading = false;
        //         }
        //     })
        // },
      getCustomersNumber() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/customers/getCustomersNumber"
        }).then(result => {
          this.servicesNumber = result.data.customers_number;
          this.getCustomers();
        })
      },
      getCustomers() {
            let thisRef = this;
            this.iteration = (this.currentPage - 1) * this.perPageServices;
            if(this.isLoading !== true) {
                this.isLoading = true;
            }
            this.services = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/customers/getAllCustomers/" + this.iteration
        }).then(result => {
          console.log(result)
          if(result.data.length > 0) {
            let customer = {
                idCustomer: 0,
                company: "",
                completeNameRepresentative: "",
                emailRepresentative: "",
                phoneRepresentative: "",
                subscriptionType: "",
                idCustomerService: 0,
                name: "",
                location: "",
                city: "",
                website: "",
                phone: "",
                shortDescription: "",
                longDescription: "",
                image1: "",
                image2: "",
                image3: "",
                image4: "",
                image5: "",
                image6: "",
                image7: "",
                image8: "",
                image9: "",
                image10: "",
                image11: "",
                image12: "",
                image13: "",
                image14: "",
                image15: "",
                image16: "",
                image17: "",
                image18: "",
                image19: "",
                image20: "",
                minimumCapacity: "",
                maximumCapacity: "",
                numberHall: "",
                category: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              customer = {
                idCustomer: result.data[i].id_customer,
                company: result.data[i].name_company,
                completeNameRepresentative: result.data[i].name_representative,
                emailRepresentative: result.data[i].email_representative,
                phoneRepresentative: result.data[i].phone_representative,
                subscriptionType: result.data[i].subscription_type,
                idCustomerService: result.data[i].id_customer_service,
                name: result.data[i].name,
                location: result.data[i].location,
                city: result.data[i].city,
                website: result.data[i].website,
                phone: result.data[i].phone,
                shortDescription: result.data[i].short_description,
                longDescription: result.data[i].long_description,
                image1: result.data[i].image1,
                image2: result.data[i].image2,
                image3: result.data[i].image3,
                image4: result.data[i].image4,
                image5: result.data[i].image5,
                image6: result.data[i].image6,
                image7: result.data[i].image7,
                image8: result.data[i].image8,
                image9: result.data[i].image9,
                image10: result.data[i].image10,
                image11: result.data[i].image11,
                image12: result.data[i].image12,
                image13: result.data[i].image13,
                image14: result.data[i].image14,
                image15: result.data[i].image15,
                image16: result.data[i].image16,
                image17: result.data[i].image17,
                image18: result.data[i].image18,
                image19: result.data[i].image19,
                image20: result.data[i].image20,
                minimumCapacity: result.data[i].minimum_capacity,
                maximumCapacity: result.data[i].maximum_capacity,
                numberHall: result.data[i].number_hall,
                category: result.data[i].category
              } 
              this.services.push(customer);                   
            }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        })
      },
        redirectToService(idService) {
            if(this.idUser !== undefined) {
                this.$router.push('/serviciu/' + idService + '/' + this.idUser);
            } else {
                this.$router.push('/serviciu/' + idService);
            }
        }
    },
    mounted() {
        $(".nav-link").removeClass("active");
        $(".services-item .nav-link").addClass("active"); 
        this.getParams();
    },
  }
</script>
<style>
    .services-container {
        width: 80%;
        padding: 20px 40px !important;
        margin: auto;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }
    .search-results {
        font-size: 18px;
        text-align: left;
    }
    .row-services.header {
        background-color: rgb(163, 177, 138, 0.2);
        padding: 30px !important;
        margin: 0 0 60px 0 !important;
    }
    .title-services-found {
        color: #9c876e;
        line-height: 2;
        letter-spacing: 0.15em;
        font-size: 20px;
        text-align: center;
        font-family: 'Nord Book';
        font-weight: 500;
        margin-bottom: 0px !important;
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
        padding: 30px !important;
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
    .row-services-found.text {
        padding-top: 10px !important;
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
        text-align: justify;
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
    @media only screen and (max-width: 768px) {
        .services-found-container {
            margin: 0px !important;
        }
        .service-found {
            width: 100% !important;
            margin: 0px !important;
        }
        .services-found-container .b-overlay-wrap {
            padding: 0px !important;
            row-gap: 30px;
        }
        .services-container {
            padding: 0 !important;
        }
        .row-services {
            margin: 0px !important;
        }
        .row-services .site-pagination-table {
            margin-top: 20px !IMPORTANT;
        }
    }
    @media only screen and (max-width: 768px) and (min-width: 576px) {
        .services-container {
            width: 60%;
        }
        .row-services .site-pagination-table {
            margin-top: 20px !IMPORTANT;
        }
    }
    @media only screen and (max-width: 992px) and (min-width: 768px) {
        .services-container {
            width: 95%;
            padding: 0px !important;
        }
        .service-found {
            width: 47%;
        }
    }
    @media only screen and (max-width: 1200px) and (min-width: 992px) {
        .services-container {
            width: 90%;
            padding: 0px !important;
        }
        .service-found {
            width: 46%;
        }
    }
</style>