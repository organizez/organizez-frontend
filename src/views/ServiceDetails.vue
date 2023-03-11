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
            <b-col class="col-service image" sm="12" md="12" lg="6" xl="6">
              <b-img-lazy v-bind="propsImage" :src="service.image1" fluid alt="image" class="image-service" v-b-modal.serviceGallery></b-img-lazy>
            </b-col>   
            <b-col class="col-service image" sm="12" md="12" lg="6" xl="6">
              <b-img-lazy v-bind="propsImage" :src="service.image2" fluid alt="image" class="image-service" v-b-modal.serviceGallery></b-img-lazy>
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
              <b-tab title="Detalii" class="tab-service">
                <b-row class="row-service-tab">
                  <p class="long-description-service">{{service.longDescription}}</p>
                </b-row>
                <b-row class="row-service-tab" v-if="service.category == 'Restaurante'">
                  <p class="text-content-tab"><span class="title-content-tab">Capacitate: </span>{{service.minimumCapacity}} - {{service.maximumCapacity}} persoane</p>                 
                </b-row>
               <b-row class="row-service-tab">
                  <b-button  v-b-modal.modal-prevent-closing class="contact-client-button main-button" type="submit">Contactează {{service.nameService}}</b-button>

                      <b-modal class="modal-service-details"
                        id="modal-prevent-closing"
                        ref="modal"
                        title="Formular de contact">
                        <div class="contact-form-modal">
                          <b-row class="row-form">
                            <b-col class="col-form left">
                            <label for="email" class="label-form">Email<span class="mandatory-field">*</span>:</label>
                            <b-form-input id="email" class="input-form" type="email" v-model="email" ></b-form-input>
                            </b-col>
                          </b-row>
                          <b-row class="row-form">
                            <b-col class="col-form left">
                              <label for="details" class="label-form">Mesaj:</label>
                              <b-form-textarea id="textarea-form" class="input-form" v-model="details"></b-form-textarea>            
                            </b-col>
                          </b-row>
                          </div>
                            <template #modal-footer>
                            <b-button class="button-send-form main-button" type="submit" v-on:click="sendContactFormEmail()">
                              Trimite
                            </b-button>
                            <b-button class="button-cancel-form second-button" @click="cancel()">
                              Închide
                            </b-button>
                            </template>
                      </b-modal>
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
import $ from "jquery";
 export default {
    components: {
      AuthenticatedUserHeader,
      UnauthenticatedUserHeader,
      Footer
    },
    data() {
      return { 
        email: '',
        details: '',
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
          location: "",
          minimumCapacity: "",
          maximumCapacity: "",
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
        console.log(this.idService)
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
              minimumCapacity: result.data.minimum_capacity,
              maximumCapacity: result.data.maximum_capacity,
              location: result.data.location + ', ' + result.data.city 
            }
        })
      },
      sendContactFormEmail() {
        let emailData = {
          email: this.email,
          details: this.details
        }
        axios({
          method: 'post',
          url: 'http://localhost:3000/contact-form-email',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: emailData
        }).then(result => {
          this.$refs['modal'].hide()
        })
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.details = ''
        this.nameState = null
      },
      // handleOk(bvModalEvent) {
      //   // Prevent modal from closing
      //   bvModalEvent.preventDefault()
      //   // Trigger submit handler
      //   // this.handleSubmit()
      // },
      // handleSubmit() {
      //   // Exit when the form isn't valid
      //   if (!this.checkFormValidity()) {
      //     return
      //   }
      //   // Push the name to submitted names
      //   this.submittedEmail.push(this.email)
      //   // Hide the modal manually
      //   this.$nextTick(() => {
      //     this.$bvModal.hide('modal-prevent-closing')
      //   })
      // }

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
  .col-service-tab {
    padding: 0px !important;
  }
  .col-service.image {
    padding: 15px;
    background-color: #f6f2f0;
  }
  .image-service {
    width: 100% !important;
    height: 100% !important;
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
    width: auto !important;
    height: 450px !important;
    margin: auto !important; 
  }
  .carousel-service-gallery .carousel-item {
    background: #ffffff !important;
  }
  .carousel-service-gallery {
    background: #ffffff !important;
  }
  .carousel-service-gallery .carousel-control-prev-icon, .carousel-service-gallery .carousel-control-next-icon {
    background-color: #9c876e !important;
    border-radius: 10px !important;
    padding: 20px !important;
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
    padding: 25px !important;
    border-right: 1px solid #dee2e6;
    border-left: 1px solid #dee2e6;
    border-bottom: 1px solid #dee2e6;
  }
  .long-description-service {
    font-size: 16px;
    text-align: left;
    color: #000000;
    margin-bottom: 0px !important;   
    padding-bottom: 20px; 
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
  .contact-client-button {
    width: auto !important;
    margin: 15px auto 10px auto !important;
    padding: 5px 20px !important;
    background-color: #3a5a40 !important;
    border-radius: 0px !important;
  }
  @media only screen and (max-width: 768px) {
    .service-details-container {
      width: 90%;
    }
  }
  .modal-service-details{
        font-size: 22px;
        text-align: left;
        font-weight: 100;
        color: #9c876e !important;
        font-family: 'Petrona';
  }
 .contact-form-modal {
        width: 100% !important;
        margin: auto;
        padding: 10px;
        background-color: rgba(255, 255, 255);
        padding-bottom: 50px;
        font-size: 16px;
        text-align: left;
        font-weight: 100;
        font-family: 'Petrona' !important;
    }
    .modal-title {
        font-family: 'Petrona' !important;
        color: #9c876e !important;
        font-size: 20px;
    }
    .contact-form-modal .input-form {
        margin: 0 12px !important;
    }
    .contact-form-modal .col-form {
        text-align: left !important;
    }
    .col-form .input-form {
        margin: 0 !important;
    }
    .buttons {
        margin: 30px 0 0 0 !important;
    }
    .button-send-form {
      width: auto !important;
      padding: 5px 20px !important;
      background-color: #3a5a40 !important;
      border-radius: 0px !important;
    }
    .button-cancel-form {
      width: auto !important;
      padding: 5px 20px !important;
      background-color: #bd9a7a !important;
      border-color: #c3a995 !important;
      border-radius: 0px !important;
    }
     .submit-form {
        width: 50% !important;
        margin: 10px auto 0 auto;
        padding: 10px !important;
        background-color: #3a5a40 !important;
    }
    .submit-form:focus, .submit-register.focus, .submit-register:active, .submit-register.active, .submit-register:focus:active {
        border-color: #3a5a40 !important;
        box-shadow: 0 0 0 0.25rem rgb(88 129 87 / 20%) !important;
    } 

    @media only screen and (max-width: 992px) {
     .contact-form-modal {
        width: 95% !important;
    }
    }
    @media only screen and (max-width: 1200px) and (min-width: 768px) {
      .contact-form-modal {
        width: 75% !important;
    }
    }
</style>