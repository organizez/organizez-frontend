<template>
    <div class="form-page">
      <Main-Header></Main-Header>
      <div class="contactForm-background">
       <div class="contactForm-form">
        <b-row class="row-form">
          <p class="title-form">Formular contact</p>
        </b-row>
        <b-row class="row-form">
          <b-col class="col-form left">
           <label for="email" class="label-form">Email<span class="mandatory-field">*</span>:</label>
           <b-form-input id="email" class="input-form" type="email" placeholder="Adresa de e-mail" v-model="email" ></b-form-input>
           <!-- <p v-if="emailState == false" class="errorMessage">{{emailErrorMessage}}</p> -->
          </b-col>
        </b-row>
        <b-row class="row-form">
          <b-col class="col-form left">
            <label for="details" class="label-form">Detalii<span class="mandatory-field">*</span>:</label>
            <b-form-textarea id="textarea-form" placeholder="Detalii suplimentare" v-model="details"></b-form-textarea>            
          </b-col>
        </b-row>
            <b-row class="row-form buttons">
                <b-button class="submit-form" type="submit" v-on:click="addContactForm">Trimite formular</b-button>
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
import MainHeader from "../components/MainHeader.vue";
import Footer from "../components/Footer.vue";
 export default {
    components: {
      MainHeader,
      Footer,
    },
    data() {
      return {
        email: "",
        details: "",
      }
    },
    methods: {
      addContactForm() {
        let formObject = {
            'email': this.email,
            'details': this.details,
        }
        axios({
          method: 'post',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/contactForms/addContactForm',
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
      },
    mounted() {
    }
  }
</script>
<style>
  .contactForm-background {
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

 .contactForm-form {
        width: 45% !important;
        margin: auto;
        padding: 30px;
        background-color: rgb(243 233 220 / 50%);
        padding-bottom: 50px;
    }
    .contactForm-form .input-form {
        margin: 0 12px !important;
    }
    .contactForm-form .col-form {
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
</style>

