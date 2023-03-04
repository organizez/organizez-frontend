<template>
    <div class="login-page">
        <Unauthenticated-User-Header></Unauthenticated-User-Header>
        <div class="login-form">
            <b-row class="row-form">
                <p class="title-login">Autentificare</p>
            </b-row>
            <b-row class="row-form">
                <label for="email" class="label-form">Email<span class="mandatory-field">*</span>:</label>
                <b-form-input id="email" class="input-form" type="email" placeholder="Adresa de e-mail" v-model="email" :state="emailState"></b-form-input>
                <p v-if="emailState == false" class="errorMessage">{{emailErrorMessage}}</p>
            </b-row>
            <b-row class="row-form">
                <label for="password" class="label-form">Parolă<span class="mandatory-field">*</span>:</label>
                <b-form-input id="password" class="input-form" type="password" placeholder="Parola" v-model="password" :state="passwordState"></b-form-input>
                <p v-if="passwordState == false" class="errorMessage">{{passwordErrorMessage}}</p>
            </b-row>
            <b-row class="row-form">
                <b-col class="col-form left">
                    <p class="link-col" v-on:click="redirectRegister">Înregistrare</p>
                </b-col>
                <b-col class="col-form right">
                    <p class="link-col">Ați uitat parola?</p>
                </b-col>
            </b-row>
            <b-row class="row-form buttons">
                <b-button class="submit-login main-button" type="submit" v-on:click="checkFields">Login</b-button>
            </b-row>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
import UnauthenticatedUserHeader from "../components/UnauthenticatedUserHeader.vue";
import Footer from "../components/Footer.vue";
 export default {
    components: {
      UnauthenticatedUserHeader,
      Footer,
    },
    data() {
      return {
        email: "",
        emailError: 0,
        emailErrorMessage: "",
        password: "",
        passwordError: 0,
        passwordErrorMessage: "",
        idUser: "", 
        userRole: ""
      }
    },
    methods: {
        checkFields() {
            if(this.email === "" && this.password === "") {
                this.emailError = 1;
                this.passwordError = 1;
            } else {
                if(this.email === "") {
                    this.emailError = 1;
                } else if(this.password === "") {
                    this.passwordError = 1;
                } else {
                    this.emailError = 0;
                    this.passwordError = 0;
                    this.postLogin();
                }
            }
        },
        postLogin() {
            let loginData = {
                'email': this.email,
                'password': this.password
            }
            axios({
            method: 'post',
                url: 'http://localhost:3000/users/login',
                mode: 'no-cors',
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                contentType: "application/json;odata=verbose",
                data: loginData
            }).then(result => {
                console.log("users", result);
                if(result.data.status == "unfound") {
                    this.emailError = 2;
                } else if(result.data.status == "mismatch") {
                    this.emailError = 0;
                    this.passwordError = 2;
                } else if(result.data.status == "success") {
                    this.idUser = result.data.idUser;
                    this.userRole = result.data.role;
                    this.emailError = 0;
                    this.passwordError = 0;
                    this.redirectHome();
                }
            })
        },
        redirectRegister() {
            this.$router.push('/inregistrare');
        },
        redirectHome() {
            if(this.userRole === "standard") {
                this.$router.push('/' + this.idUser);
            } else if(this.userRole === "admin") {
                this.$router.push('/administrare/' + this.idUser);
            }
        }
    },
    mounted() {
        $(".nav-link").removeClass("active");
    },
    computed: {
       emailState() {
            if(this.emailError === 1) {
                if(this.email !== "") {
                    return true;
                } else {
                    this.emailErrorMessage = "Adresa de email este obligatorie!";
                    return false;
                }
            } else if(this.emailError === 2) { 
                this.emailErrorMessage = "Utilizatorul nu a fost găsit. Vă rugăm, să vă înregistrați!";
                return false;
            } else {
                return null;
            } 
        }, 
        passwordState() {
            if(this.passwordError === 1) {
                if(this.password !== "") {
                    return true;
                } else {
                    this.passwordErrorMessage = "Parola este obligatorie!";
                    return false;
                }
            } else if(this.passwordError === 2) { 
                this.passwordErrorMessage = "Parola introdusă nu este corectă!";
                return false;
            } else {
                return null;
            } 
        }  
    }
  }
</script>
<style>
    .login-form {
        width: 40%;
        margin: 20px auto;
        padding: 30px;
        background-color: rgba(249,248,246,1);
    }
    .title-login {
        font-size: 22px;
        font-weight: 600;
        padding-bottom: 10px;
        margin-bottom: 0 !important;
        color: #000;
    }
    .link-col {
        padding: 0;
        margin: 0;
        color: #3a5a40;
        font-weight: 600;
        cursor: pointer;
        font-weight: 700;
        line-height: 26px;
        display: inline-block;
        position: relative;
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
    }
    .link-col:hover:after {
        visibility: visible;
        opacity: 1;
        width: 100%;
    }
    .link-col:after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "";
        width: 0;
        height: 1px;
        background: #3a5a40;
        visibility: hidden;
        opacity: 0;
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
    }
    .submit-login {
        width: 50% !important;
        margin: 10px auto ;
        padding: 10px !important;
        background-color: #3a5a40 !important;
        border-radius: 0 !important;
    }
</style>