<template>
    <div class="dataPrivacyPolicy-page">
      <Unauthenticated-User-Header v-if="this.$route.params.idUser === undefined || this.$route.params.idUser === ''"></Unauthenticated-User-Header>
      <Authenticated-User-Header v-else :idUser="this.$route.params.idUser"></Authenticated-User-Header>
        <div class="dataPrivacyPolicy-background">
            <div class="dataPrivacyPolicy-container">
                <b-row class="row-dataPrivacyPolicy">
                    <p class="dataPrivacyPolicy-title">{{titleDataPrivacyPolicy}}</p>
                </b-row>
                <b-row>
                    <p class="dataPrivacyPolicy-text">{{textDataPrivacyPolicy}}</p>
                </b-row>     
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import axios from 'axios';
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
            titleDataPrivacyPolicy: "",
            textDataPrivacyPolicy: "",
        }
    },
    methods: {
        getParam() {
            if(this.$route.params.idUser !== undefined) {
                this.idUser = this.$route.params.idUser;
            }
            this.getDataPrivacyPolicy();
        },
        getDataPrivacyPolicy() {
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "https://squid-app-q7qzv.ondigitalocean.app/be/dataPrivacyPolicy/getDataPrivacyPolicy/"
            }).then(result => {
                console.log(result)
                this.titleDataPrivacyPolicy = result.data[0].title_data_privacy_policy,
                this.textDataPrivacyPolicy = result.data[0].text_data_privacy_policy
            })
        },

      },
    mounted() {
        this.getParam(); 
    }
  }
</script>
<style>
  .dataPrivacyPolicy-background {
    /* background-image: url('https://i.pinimg.com/236x/0b/28/9b/0b289b6fbbaba4381fae3968a7755420.jpg')!important; 
    background-repeat: repeat !important;
    background-size: 680px !important; */
    background-position: center !important;
    /* background-image: url('https://i.pinimg.com/236x/5a/66/8f/5a668ff113e7894c93fb09dda004cec7.jpg')!important;  */
    /* background-repeat: repeat !important; */
    /* background-size: 780px !important; */ 
    /* background-image: url('https://i.pinimg.com/564x/94/3a/0b/943a0b9382d2e7c5f94d194b97e92238.jpg')!important;  
    background-repeat: no-repeat !important;
    background-size: 760px !important; 
    margin: 20px !important;
    width: 999px !important;
    position: center !important; */
  }
 .dataPrivacyPolicy-container {
        width: 45%;
        margin: auto;
        padding: 30px;
        background-color: rgb(243 233 220 / 50%);
        padding-bottom: 10px;
    }
    /* .formUser-form .input-form {
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
    }  */

      .dataPrivacyPolicy-title {
        color: #111111;;
        line-height: 2;
        letter-spacing: 0.15em;
        font-size: 20px;
        text-align: center;
        font-family: 'Nord Book';
        font-weight: 600;
        margin-bottom: 0px !important;
        padding: 0 0 20px 0 !important;
    }
    /* .row-article.container {
        width: 80%;
        margin: auto;
        background-color: rgba(249,248,246,1);
        padding: 50px 100px !important;
    }
    .image-blog-article {
        width: 100%;
        height: auto !important;
        min-height: 300px !important;
        max-height: 500px !important;
        padding: 0px !important;
    }
    .article-info {
        margin-bottom: 0px !important;
        color: #a9927d;
        line-height: 1.8;
        letter-spacing: 0.11em;
        font-size: 15px;
        text-align: center;
        font-family: 'Nord Light';
        font-weight: 400;
        font-style: normal;
        text-align: left;
        padding: 20px 0 !important;
    }
    .article-long-description {
        padding: 0px !important;
        text-align: left;
        margin-bottom: 0px !important;
        color: #000000;
        font-size: 16px;
        text-align: justify;
        font-family: 'Nord Light';
        font-weight: 400;   
    } */
 .aboutUs-image {
        width: 300px !important;
        position: center !important;
    }
    
    @media only screen and (max-width: 992px) {
     .dataPrivacyPolicy-container {
        width: 95%;
    }
    }
    @media only screen and (max-width: 1200px) and (min-width: 768px) {
      .dataPrivacyPolicy-container {
        width: 75%;
    }
    }
</style>

