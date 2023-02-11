<template>
    <div class="login-page">
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
                <b-button class="submit-login" type="submit" v-on:click="checkFields">Login</b-button>
            </b-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
 export default {
    components: {
    },
    data() {
      return {
        email: "",
        emailError: 0,
        emailErrorMessage: "",
        password: "",
        passwordError: 0,
        passwordErrorMessage: "",
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
                    this.emailError = 0;
                    this.passwordError = 0;
                    this.redirectHome();
                }
            })
        },
        redirectRegister() {
            this.$router.push('/register');
        },
        redirectHome() {
            this.$router.push('/home');
        }
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
    .login-page {
        margin: 8% 0;
    }
    .login-form {
        width: 40%;
        margin: auto;
        padding: 30px;
        background-color: rgb(243 233 220 / 50%);
    }
    .title-login {
        font-size: 22px;
        font-weight: 600;
        padding-bottom: 10px;
        margin-bottom: 0 !important;
        color: #000;
    }
    .row-form {
        margin-bottom: 20px;
    }
    .label-form {
        text-align: left;
        padding-bottom: 5px  !important;
        margin: 0;
        color: #000;
    }
    .mandatory-field {
        color: red;
    }
    .input-form {
        margin: 0 10px !important;
        padding: 10px !important;
        flex-shrink: initial !important;
    }
    .input-form:focus {
        border-color: #a3b18a !important;
        box-shadow: 0 0 0 0.25rem rgb(88 129 87 / 20%) !important;
    }
    .col-form.right {
        text-align: right;
    }
    .col-form.left {
        text-align: left;
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
    }
    .submit-login:focus, .submit-login.focus, .submit-login:active, .submit-login.active, .submit-login:focus:active {
        border-color: #3a5a40 !important;
        box-shadow: 0 0 0 0.25rem rgb(88 129 87 / 20%) !important;
    } 
</style>