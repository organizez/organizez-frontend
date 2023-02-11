<template>
    <div class="register-page">
        <div class="register-form">
            <b-row class="row-form">
                <p class="title-register">Înregistrare</p>
            </b-row>
            <b-row class="row-form">
                <b-col class="col-form left">
                    <label for="firstName" class="label-form">Prenume<span class="mandatory-field">*</span>:</label>
                    <b-form-input id="firstName" class="input-form" placeholder="Prenume" v-model="firstName" :state="firstNameState"></b-form-input>
                    <p v-if="firstNameState == false" class="errorMessage">{{firstNameErrorMessage}}</p>
                </b-col>
                <b-col class="col-form right">
                    <label for="lastName" class="label-form">Nume<span class="mandatory-field">*</span>:</label>
                    <b-form-input id="lastName" class="input-form" placeholder="Nume" v-model="lastName" :state="lastNameState"></b-form-input>
                    <p v-if="lastNameState == false" class="errorMessage">{{lastNameErrorMessage}}</p>
                </b-col>
            </b-row>
            <b-row class="row-form">
                <label for="email" class="label-form">Email<span class="mandatory-field">*</span>:</label>
                <b-form-input id="email" class="input-form" type="email" placeholder="Adresa de e-mail" v-model="email" :state="emailState"></b-form-input>
                <p v-if="emailState == false" class="errorMessage">{{emailErrorMessage}}</p>
            </b-row>
            <b-row class="row-form">
                <label for="password" class="label-form">Parolă<span class="mandatory-field">*</span>:</label>
                <b-form-input id="password" class="input-form" type="password" placeholder="Parola" v-model="password" :state="passwordState"></b-form-input>
                <password v-model="password" :strength-meter-only="true" @score="getScore"/>
                <p v-if="passwordState == false" class="errorMessage">{{passwordErrorMessage}}</p>
            </b-row>
            <b-row class="row-form">
                <label for="confirmedPassword" class="label-form">Confirmare parolă<span class="mandatory-field">*</span>:</label>
                <b-form-input id="confirmedPassword" class="input-form" type="password" placeholder="Parola" v-model="confirmedPassword" :state="confirmedPasswordState" @input="validateConfirmedPassword"></b-form-input>
                <p v-if="confirmedPasswordState == false" class="errorMessage">{{confirmedPasswordErrorMessage}}</p>
            </b-row>
            <b-row class="row-form">
                <b-form-checkbox
                    id="terms"
                    v-model="terms"
                    button-variant="success"
                    value="accepted"
                    unchecked-value="not_accepted"
                    :state="termsState">
                    Sunt de acord cu <span class="terms">Termenii si conditiile de utilizare</span> ale site-ului organizez.ro
                </b-form-checkbox> 
                <p v-if="termsState == false" class="errorMessage">Acceptarea termenilor și condițiilor de utilizare este obligatorie!</p>
            </b-row>
            <b-row class="row-form buttons">
                <b-button class="submit-register" type="submit" v-on:click="checkFields">Înregistrare</b-button>
            </b-row>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
import Password from 'vue-password-strength-meter';
 export default {
    components: {
        Password 
    },
    data() {
      return {
        firstName: "",
        firstNameError: false,
        firstNameErrorMessage: "",
        lastName: "",
        lastNameError: false,
        lastNameErrorMessage: "",
        email: "",
        emailError: false,
        emailErrorMessage: "",
        password: "",
        passwordError: false,
        passwordErrorMessage: "",
        scorePassword: 0,
        confirmedPassword: "",
        confirmedPasswordError: false,
        confirmedPasswordErrorMessage: "",
        terms: "not_accepted",
        termsError: false,
        duplicateUser: false
      }
    },
    methods: {
        getScore(score) {
            console.log(score);
            this.scorePassword = score;
        },
        validateConfirmedPassword() {
            console.log(this.confirmedPassword, this.password)
            if(this.confirmedPassword !== this.password) {
                this.confirmedPasswordError = true;
            } else {
                this.confirmedPasswordError = false;
            }
        },
        checkFields() {
            if(this.terms == "not_accepted") {
                this.termsError = true;
            }
            if(!this.email.includes("@") || this.email == "") {
                this.emailError = true;
            } 
            if(this.password == "" || this.scorePassword < 2) {
                this.passwordError = true;
            } 
            if(this.confirmedPassword == "") {
                this.confirmedPasswordError = true;
            } 
            if(this.firstName == "") {
                this.firstNameError = true;
            }
            if(this.lastName == "") {
                this.lastNameError = true;
            } 
            if(this.termsError == false && this.emailError == false && this.firstNameError == false && this.lastNameError == false && this.passwordError == false && this.confirmedPasswordError == false) {
                this.registerPost();
            }
        },
        registerPost() {
            let userObject = {
                'email': this.email,
                'password': this.password,
                'firstName': this.firstName,
                'lastName': this.lastName,
            }
            axios({
                method: 'post',
                url: 'http://localhost:3000/users/register',
                mode: 'no-cors',
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                contentType: "application/json;odata=verbose",
                data: userObject
            }).then(result => {
                console.log("SUCCESS POST", result);
                if(result.data === "duplicate") {
                    this.duplicateUser = true;
                    this.emailError = true;
                } else {
                    this.$router.push('/home');
                }
            }).catch(error => {
                console.log("ERROR POST", error);
            })
        }
    },
    computed: {
        firstNameState() {
            if(this.firstNameError == true) {
                if(this.firstName !== "") {
                    return true;
                } else {
                    this.firstNameErrorMessage = "Prenumele este obligatoriu!";
                    return false;
                }
            } else {
                return null;
            } 
        },
        lastNameState() {
            if(this.lastNameError == true) {
                if(this.lastName !== "") {
                    return true;
                } else {
                    this.lastNameErrorMessage = "Numele este obligatoriu!";
                    return false;
                }
            } else {
                return null;
            } 
        },
        emailState() {
            if(this.emailError == true) {
                if(this.duplicateUser === true && this.email !== "") {
                    this.emailErrorMessage = "Adresa de email există deja!";
                    return false;
                } else if(this.duplicateUser === true && this.email === "") {
                    this.duplicateUser = false;
                    this.emailErrorMessage = "Adresa de email este obligatorie!";
                    return false;
                } else {
                    if(this.email !== "" && this.email.includes("@")) {
                        return true;
                    } else {
                        this.emailErrorMessage = "Adresa de email este obligatorie!";
                        return false;
                    }
                }
            } else {
                return null;
            } 
        },
        passwordState() {
            if(this.passwordError == true) {
                if(this.password === "") {
                    this.passwordErrorMessage = "Parola este obligatorie!";
                    return false;
                } else if(this.scorePassword < 2) {
                    this.passwordErrorMessage = "Nu ati introdus o parola suficient de puternică!";
                    return false;
                } else {
                    return true;
                }
            } else {
                return null;
            } 
        },
        confirmedPasswordState() {
            if(this.confirmedPasswordError == true) {
                if(this.confirmedPassword === "") {
                    this.confirmedPasswordErrorMessage = "Confirmarea parolei este obligatorie!";
                    return false;
                } else if(this.confirmedPassword !== this.password) {
                    this.confirmedPasswordErrorMessage = "Acest câmp trebuie să coincidă cu Parola!";
                    return false;
                } else {
                    return true;
                }
            } else {
                return null;
            } 
        },
        termsState() {
            if(this.termsError == true) {
                if(this.terms != "not_accepted") {
                    return true;
                } else {
                    return false;
                }
            } else {
                return null;
            } 
        }
    }
  }
</script>
<style>
    .register-page {
        margin: 8% 0;
    }
    .register-form {
        width: 45%;
        margin: auto;
        padding: 30px;
        background-color: rgb(243 233 220 / 50%);
    }
    .title-register {
        font-size: 22px;
        font-weight: 600;
        padding-bottom: 10px;
        margin-bottom: 0 !important;
        color: #000;
    }
    .register-form .input-form {
        margin: 0 12px !important;
    }
    .register-form .col-form {
        text-align: left !important;
    }
    .col-form .input-form {
        margin: 0 !important;
    }
    .Password__strength-meter {
        margin: 10px 0 0 0 !important;
    }
    .Password {
        max-width: 100% !important;
        margin: 0 !important;
        text-align: left !important;
    }
    .terms {
        font-weight: bold;
        color: #000000;
        cursor: pointer;
        text-decoration: underline;
    }
    .custom-checkbox label {
        float: right !important;
        width: 96%;
        text-align: left;
        font-size: 14px;
    }
    .custom-checkbox input {
        float: left;
        width: 3%;
        height: 100%;
        filter: grayscale(1);
    }
    .errorMessage {
        margin-bottom: 0 !important;
        font-size: 13px;
        text-align: left;
        color: #dc3545;
    }
    .buttons {
        margin: 30px 0 0 0 !important;
    }
    .submit-register {
        width: 50% !important;
        margin: 10px auto 0 auto;
        padding: 10px !important;
        background-color: #3a5a40 !important;
    }
    .submit-register:focus, .submit-register.focus, .submit-register:active, .submit-register.active, .submit-register:focus:active {
        border-color: #3a5a40 !important;
        box-shadow: 0 0 0 0.25rem rgb(88 129 87 / 20%) !important;
    } 
</style>