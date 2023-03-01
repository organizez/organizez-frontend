<template>
    <div class="main-header-component">
        <b-row class="row-main-header">
            <b-nav class="nav-main-header">
                <b-col class="col-nav">
                    <b-nav-item active class="item-main-header">Home</b-nav-item>
                    <b-nav-item class="item-main-header">Servicii</b-nav-item>
                    <b-nav-item class="item-main-header">Portofoliu</b-nav-item>
                    <b-nav-item class="item-main-header">Blog</b-nav-item>
                    <b-nav-item class="item-main-header">Contact</b-nav-item>
                </b-col>
                <b-col class="col-nav">
                    <b-nav-item class="item-main-header link-item"><i>Aveți un eveniment?</i></b-nav-item>      
                    <b-nav-item class="item-main-header"><b-button class="redirect-login main-button" v-on:click="redirectLogin">Login</b-button></b-nav-item>
                    <b-nav-item class="item-main-header"><b-button class="redirect-register second-button" v-on:click="redirecRegister">Înregistrare</b-button></b-nav-item>
                </b-col>
            </b-nav>
        </b-row>
        <b-row class="row-main-header logo">
            <img class="logo-image" src="https://organizez-images.fra1.digitaloceanspaces.com/homepage%2Flogo%2Flogo.png"/>
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
    .nav-main-header {
        top: 0;
        padding: 5px 30px !important;
        box-shadow: 2px 2px 5px rgb(40 40 40 / 15%);
    }
    .row-main-header {
        margin: 0 !important;
    }
    .row-main-header.logo {
       justify-content: center;
       padding: 30px;
    }
    .col-nav {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 50%;
        align-items: center;
    }
    .col-nav:first-child {
        width: 50%;
    }
    .col-nav:nth-child(2) {
        width: 50%;
        justify-content: flex-end;
    }
    .item-main-header a {
        color: #000000 !important;
        font-size: 16px !important;
    }
    .item-main-header .nav-link.active {
        color: #9c876e!important;
        font-size: 16px !important;
        font-style: italic;
        font-weight: 600;
    }
    .item-main-header a:hover {
        color: #9c876e!important;
        font-size: 16px !important;
        font-style: italic;
    }
    .item-main-header.link-item a {
        display: inline-block;
        position: relative;
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
    }
    .item-main-header.link-item a:hover:after {
        visibility: visible !important;
        opacity: 1 !important;
        width: 100%;
    }
    .item-main-header.link-item a:after {
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
    .redirect-login {
        width: auto !important;
        margin: 0 auto;
        padding: 5px 20px !important;
        background-color: #3a5a40 !important;
        border-radius: 0px !important;
    }
    .redirect-register {
        width: auto !important;
        margin: 0 auto;
        padding: 5px 20px !important;
        background-color: #bd9a7a !important;
        border-color: #c3a995 !important;
        border-radius: 0px !important;
    }
    .logo-image {
        height: auto;
        width: 240px !important;
    }
</style>