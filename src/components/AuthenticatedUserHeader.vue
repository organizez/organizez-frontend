<template>
    <div class="main-header-component">
        <b-row class="row-main-header">
            <b-nav class="nav-main-header">
                <b-col class="col-nav">
                    <b-nav-item active class="item-main-header" @click="redirectToPage('/')">Home</b-nav-item>
                    <b-nav-item class="item-main-header services-item" @click="redirectToPage('/servicii/1/4')">Servicii</b-nav-item>
                    <b-nav-item class="item-main-header portofolio-item" @click="redirectToPage('/portofoliu')">Portofoliu</b-nav-item>
                    <b-nav-item class="item-main-header blog-item" @click="redirectToPage('/blog')">Blog</b-nav-item>
                    <b-nav-item class="item-main-header contact-form-item" @click="redirectToPage('/formular-contact')">Contact</b-nav-item>
                </b-col>
                <b-col class="col-nav">
                    <b-nav-item class="item-main-header link-item event-form-item" @click="redirectToPage('/formular-eveniment')"><i>Aveți un eveniment?</i></b-nav-item>
                    <b-nav-item-dropdown right class="admin-header-item user">
                        <template #button-content>
                            {{firstNameUser}}
                        </template>
                        <b-dropdown-item @click="redirectToLogin()">Deconectare</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-col>
            </b-nav>
        </b-row>
        <b-row class="row-main-header logo">
            <img class="logo-image" src="https://organizez-images.fra1.digitaloceanspaces.com/homepage%2Flogo%2Flogo.png"/>
        </b-row>
    </div>
</template>
<script>
import axios from 'axios';
// import $ from "jquery";
 export default {
    props: ['idUser'],
    data() {
        return {
            firstNameUser: ""
        }
    },
    methods: {
        getUser() {
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: 'http://localhost:3000/users/getUser/' + this.idUser
            }).then(result => {
                this.firstNameUser = result.data[0].first_name;
            })
        },
        redirectToPage(path) {
            this.$router.push(path + "/" + this.idUser);
        },
        redirectToLogin() {
            this.$router.push("/autentificare");
        }
    },
    mounted() {
    },
    created() {
        this.getUser();
    }
  }
</script>
<style>
    .admin-header-item.user .dropdown-item { 
        padding: 5px 30px !important;
    }
    .admin-header-item.user .dropdown-item:active, .admin-header-item.user .dropdown-item.active,
    .admin-header-item.user .dropdown-item:focus, .admin-header-item.user .dropdown-item.focus,
    .admin-header-item.user .dropdown-item:focus:active { 
        background-color: rgb(163, 177, 138, 0.2);
    }
</style>