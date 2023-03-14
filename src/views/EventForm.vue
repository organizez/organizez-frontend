<template>
    <div class="form-page">
      <Unauthenticated-User-Header v-if="this.$route.params.idUser === undefined || this.$route.params.idUser === ''"></Unauthenticated-User-Header>
      <Authenticated-User-Header v-else :idUser="this.$route.params.idUser"></Authenticated-User-Header>
      <div class="formUser-background">
       <div class="formUser-form">
        <b-row class="row-form">
          <p class="title-login">Formular organizare eveniment</p>
        </b-row>
        <b-row class="row-form">
          <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
            <label for="firstNameUser" class="label-form">Nume<span class="mandatory-field">*</span>:</label>
            <b-form-input id="firstNameUser" class="input-form" placeholder="Nume" v-model="firstNameUser" ></b-form-input>
            <!-- <p v-if="firstNameUserState == false" class="errorMessage">{{firstNameUserErrorMessage}}</p> -->
          </b-col>
          <b-col class="col-form right" sm="12" md="12" lg="6" xl="6">
            <label for="lastNameUser" class="label-form">Prenume<span class="mandatory-field">*</span>:</label>
            <b-form-input id="lastNameUser" class="input-form" placeholder="Prenume" v-model="lastNameUser" ></b-form-input>
            <!-- <p v-if="lastNameUserState == false" class="errorMessage">{{lastNameUserErrorMessage}}</p> -->
          </b-col>
        </b-row>
        <b-row class="row-form">
          <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
           <label for="email" class="label-form">Email<span class="mandatory-field">*</span>:</label>
           <b-form-input id="email" class="input-form" type="email" placeholder="Adresa de e-mail" v-model="email" ></b-form-input>
           <!-- <p v-if="emailState == false" class="errorMessage">{{emailErrorMessage}}</p> -->
          </b-col>
          <b-col class="col-form right" sm="12" md="12" lg="6" xl="6">
            <label for="phone" class="label-form">Număr de telefon<span class="mandatory-field">*</span>:</label>
            <b-form-input id="phone" class="input-form" placeholder="Număr de telefon" v-model="phone" ></b-form-input>
            <!-- <p v-if="phoneState == false" class="errorMessage">{{phoneErrorMessage}}</p> -->
          </b-col>
        </b-row>
         <b-row class="row-form">
          <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
           <label for="dateEvent" class="label-form">Dată eveniment<span class="mandatory-field">*</span>:</label>
           <b-form-input id="dateEvent" class="input-form" type="date" placeholder="Dată eveniment" v-model="dateEvent" ></b-form-input>
           <!-- <p v-if="dateState == false" class="errorMessage">{{dateErrorMessage}}</p> -->
          </b-col>
          <b-col class="col-form right" sm="12" md="12" lg="6" xl="6">
            <label for="numberGuests" class="label-form">Număr invitați<span class="mandatory-field">*</span>:</label>
            <b-form-input id="numberGuests" class="input-form" type="number" placeholder="Număr invitați" v-model="numberGuests"></b-form-input>
            <!-- <p v-if="numberGuestsState == false" class="errorMessage">{{numberGuestsErrorMessage}}</p> -->
          </b-col>
        </b-row>

       <b-row class="row-form">
        <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
          <label for="cities" class="label-form">Oraș<span class="mandatory-field">*</span>:</label>
          <b-select v-model="idCity" :options="cities" class="select-form"></b-select> 
        </b-col>
        <b-col class="col-form right" sm="12" md="12" lg="6" xl="6">
          <label for="budget" class="label-form">Buget<span class="mandatory-field">*</span>:</label>
          <b-form-input id="budget" class="input-form" placeholder="Buget" v-model="budget" ></b-form-input>
          <!-- <p v-if="budgetState == false" class="errorMessage">{{budgetErrorMessage}}</p> -->
          </b-col>
        </b-row>
        <b-row class="row-form">
          <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
            <label for="details" class="label-form">Detalii suplimentare<span class="mandatory-field">*</span>:</label>
            <b-form-textarea id="textarea-form" placeholder="Detalii suplimentare" v-model="details"></b-form-textarea>            
          </b-col>
        </b-row>
         <b-row class="row-form">
                <b-form-checkbox
                    id="signedProviders"
                    v-model="signedProviders"
                    button-variant="success"
                    value="true"
                    unchecked-value="false" 
                   >
                    Ați semnat cu anumiți furnizori?
                </b-form-checkbox> 
            </b-row>
            <b-row class="row-form buttons">
                <b-button class="submit-form" type="submit" v-on:click="addForm">Trimite formular</b-button>
            </b-row>
       </div>
      </div>
       <br>
       <Footer></Footer>
    </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
import UnauthenticatedUserHeader from "../components/UnauthenticatedUserHeader.vue";
import AuthenticatedUserHeader from '../components/AuthenticatedUserHeader.vue';
import Footer from "../components/Footer.vue";
 export default {
    components: {
      AuthenticatedUserHeader,
      UnauthenticatedUserHeader,
      Footer,
    },
    data() {
      return {
        idUser: "",
        firstNameUser: "",
        lastNameUser: "",
        email: "",
        phone: "",
        dateEvent: "",
        numberGuests: 0,
        idCity: "",
        // city: "",
        budget: 0.00,
        details: "",
        signedProviders: false,
        cities: []
      }
    },
    methods: {
      getParam() {
        if(this.$route.params.idUser !== undefined) {
          this.idUser = this.$route.params.idUser;
        }
        this.getCities();
      },
      addForm() {
        let formObject = {
            'firstNameUser': this.firstNameUser,
            'lastNameUser': this.lastNameUser,
            'email': this.email,
            'phone': this.phone,
            'dateEvent': this.dateEvent,
            'numberGuests': this.numberGuests,
            'idCity': this.idCity,
            // 'city': this.city,
            'budget': this.budget,
            'details': this.details,
            'signedProviders': this.signedProviders,
        }
        axios({
          method: 'post',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/forms/addForm',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: formObject
        }).then (result => {
            console.log("SUCCESS POST", result);
        }).catch (error => {
          console.log("ERROR POST", error);
        })
        },
        getCities() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/cities/getAllCities"
        }).then(result => {
          if(result.data.length > 0) {
            let city = {
              value: 0,
              text: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              city = {
                value: result.data[i].id_city,
                text: result.data[i].city
              }
              this.cities.push(city);
            }
          }
        })
      },
      },
    mounted() {
      $(".nav-link").removeClass("active");
      $(".event-form-item .nav-link").addClass("active"); 
      this.getParam();
    }
  }
</script>
<style>
  .formUser-background {
    /* background-image: url('https://i.pinimg.com/236x/0b/28/9b/0b289b6fbbaba4381fae3968a7755420.jpg')!important; 
    background-repeat: repeat !important;
    background-size: 680px !important; */
    background-position: center !important;
    /* background-image: url('https://i.pinimg.com/236x/5a/66/8f/5a668ff113e7894c93fb09dda004cec7.jpg')!important; 
    background-repeat: repeat !important;
    background-size: 780px !important; */
     /* background-image: url('https://i.pinimg.com/236x/4d/3c/6a/4d3c6aa65e9a6d3aea91f024a55f2834.jpg')!important; 
    background-repeat: repeat !important;
    background-size: 860px !important; */
  }

 .formUser-form {
        width: 65%;
        margin: auto;
        padding: 30px;
        background-color: rgb(243 233 220 / 50%);
        padding-bottom: 50px;
    }
    .formUser-form .input-form {
        margin: 0 12px !important;
    }
    .formUser-form .col-form {
        text-align: left !important;
    }
    .col-form .input-form {
        margin: 0 !important;
    }
    .buttons {
        margin: 30px 0 0 0 !important;
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
     .formUser-form {
        width: 95% !important;
    }
    }
    @media only screen and (max-width: 1200px) and (min-width: 768px) {
      .formUser-form {
        width: 89% !important;
    }
    }
</style>

