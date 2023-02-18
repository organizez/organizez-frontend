<template>
    <div class="footer-component">
        <b-row class="row-footer content-footer">
            <b-col class="col-footer links-footer">
                <p class="title-col-footer">Informații utile</p>
                <p class="text-col-footer">Despre noi</p>
                <p class="text-col-footer">Termeni și condiții</p>
                <p class="text-col-footer">Politica de confidențialitate a datelor</p>
                <p class="text-col-footer">ANPC</p>
            </b-col>
            <b-col class="col-footer logo-footer">
                <img class="logo-image-footer" src="https://organizez-images.fra1.digitaloceanspaces.com/homepage%2Flogo%2Flogo.png"/>
            </b-col>
            <b-col class="col-footer links-footer">
                <p class="title-col-footer">Contactează-ne</p>
                <p class="text-col-footer">Formular de contact</p>
                <p class="title-col-footer title-social-networks">Rețele de socializare</p>
                <b-row class="social-networks">
                    <b-col class="col-social-networks"><p class="icon-col-footer"><font-awesome-icon icon="fa-brands fa-facebook" class="facebook-icon"/></p></b-col>
                    <b-col class="col-social-networks"><p class="icon-col-footer"><font-awesome-icon icon="fa-brands fa-instagram" class="instagram-icon"/></p></b-col>
                    <b-col class="col-social-networks"><p class="text-col-footer"><font-awesome-icon icon="fa-brands fa-twitter" class="twitter-icon"/></p></b-col>
                    
                </b-row>
            </b-col>
        </b-row>
        <b-row class="row-footer copyright-footer">
            <p class="copyright-text">© 2023 Organizez</p>
        </b-row>
    </div>
</template>
<script>
// import axios from 'axios';
// import $ from "jquery";
 export default {
    data() {
      return {
      }
    },
    methods: {
        redirectLogin() {

        },
        redirecRegister() {

        }
    },
    mounted() {
    }
  }
</script>
<style>
    .footer-component {
        bottom: 0;
        position: relative;
    }
    .content-footer {
        background-color: #f6f2f0 !important;
        padding: 15px  !important;
        margin: 0 !important;
    }
    .col-footer.links-footer {
        padding-left: 10% !important;
        align-items: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .col-footer.logo-footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .logo-image-footer {
        width: 150px !important;
        height: auto;
    }
    .title-col-footer {
        margin-bottom: 0 !important;
        font-weight: 600;
        font-size: 14px;
        color:#000000;
    }
    .text-col-footer {
        margin-bottom: 0 !important;
        font-size: 14px;
        color:#000000;
    }
    .title-social-networks {
        padding-top: 10px !important;
    }
    .social-networks {
        margin: 0 !important;
        width: 100px;
    }
    .col-social-networks {
        padding: 0px !important;
    }
    .icon-col-footer {
        margin-bottom: 0 !important;
        font-size: 16px;
        color:#000000;
        text-align: left;
    }
    .copyright-text {
        font-size: 14px;
        color: #000000;
        margin: 0 !important;
        padding: 0 !important;
    }
    .row-footer {
        margin: 0 !important;
    }
    .row-footer.copyright-footer {
        padding: 10px 0 !important;
    }
</style>