<template>
    <div class="main-header-component">
        <b-navbar toggleable="sm" class="nav-header">
            <b-navbar-toggle target="nav-collapse" class="toggle-header"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-row class="row-main-header">
                    <b-nav class="nav-main-header">
                        <b-col class="col-nav">
                            <b-nav-item active class="item-main-header" @click="redirectToPage('/')">Home</b-nav-item>
                            <b-nav-item class="item-main-header services-item" @click="redirectToPage('/servicii/0/0')">Servicii</b-nav-item>
                            <b-nav-item class="item-main-header portofolio-item" @click="redirectToPage('/portofoliu')">Portofoliu</b-nav-item>
                            <b-nav-item class="item-main-header blog-item" @click="redirectToPage('/blog')">Blog</b-nav-item>
                            <b-nav-item class="item-main-header contact-form-item" @click="redirectToPage('/formular-contact')">Contact</b-nav-item>
                        </b-col>
                        <b-col class="col-nav">
                            <b-nav-item class="item-main-header link-item event-form-item" @click="redirectToPage('/formular-eveniment')"><i>Aveți un eveniment?</i></b-nav-item>
                            <b-nav-item class="item-main-header login-item" @click="redirectToPage('/autentificare')"><b-button class="redirect-login main-button">Login</b-button></b-nav-item>
                            <b-nav-item class="item-main-header register-item" @click="redirectToPage('/inregistrare')"><b-button class="redirect-register second-button">Înregistrare</b-button></b-nav-item>
                        </b-col>
                    </b-nav>
                </b-row>
            </b-collapse>
        </b-navbar>
        <b-row class="row-main-header logo">
            <img class="logo-image" src="https://organizez-images.fra1.digitaloceanspaces.com/homepage%2Flogo%2Flogo.png"/>
        </b-row>
    </div>
</template>
<script>
 export default {
    data() {
        return {
        }
    },
    methods: {
        redirectToPage(path) {
            this.$router.push(path);
        }
    },
    mounted() {
    }
  }
</script>
<style>


</style>