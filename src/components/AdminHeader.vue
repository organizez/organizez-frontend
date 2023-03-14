<template>
    <div class="admin-header-component">
      <b-row class="row-admin-header">
        <b-navbar toggleable="sm" class="admin-nav-header">
          <b-navbar-toggle target="nav-collapse" class="toggle-header"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-row class="row-main-header">
                <b-nav class="nav-main-header">
                  <b-col class="col-nav">
                      <b-nav-item-dropdown  class="admin-header-item">
                        <template #button-content>
                          Administrare
                        </template>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/' + idUser)">Dashboard</b-dropdown-item>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/utilizatori/' + idUser)">Utilizatori</b-dropdown-item>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/categorii/' + idUser)">Categorii clienți</b-dropdown-item>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/clienti/' + idUser)">Clienți</b-dropdown-item>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/portofoliu/' + idUser)">Portofoliu</b-dropdown-item>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/blog/' + idUser)">Blog</b-dropdown-item>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/despre-noi/' + idUser)">Despre noi</b-dropdown-item>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/politica-de-confidentialitate-a-datelor/' + idUser)">Termeni și condiții </b-dropdown-item>
                        <b-dropdown-item class="admin-nav-item" @click="redirectToPage('/administrare/termeni-si-conditii/' + idUser)">Politică de confidențialitate</b-dropdown-item>
                    </b-nav-item-dropdown>
                  </b-col>
                  <b-col class="col-nav">
                      <b-nav-item-dropdown class="admin-header-item user">
                        <template #button-content>
                          {{firstNameUser}}
                        </template>
                      <b-dropdown-item class="dropdown-user" @click="redirectToLogin()">Deconectare</b-dropdown-item>
                    </b-nav-item-dropdown>
                  </b-col>
                </b-nav>
              </b-row>
          </b-collapse>
        </b-navbar>
      </b-row>
      <b-row class="row-admin-header logo">
        <img class="admin-logo-image" src="https://organizez-images.fra1.digitaloceanspaces.com/homepage%2Flogo%2Flogo.png"/>
      </b-row>
  </div>
</template>
<script>
import axios from 'axios';
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
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/users/getUser/' + this.idUser
        }).then(result => {
          console.log(result)
          this.firstNameUser = result.data[0].first_name;
        })
      },
      redirectToPage(path) {
        this.$router.push(path);
      }
    },
    mounted() {
      this.getUser();
    }
  }
</script>
<style>
  .admin-header-item .dropdown-menu {
    border-radius: 0px !important;
    box-shadow: 2px 2px 5px rgb(40 40 40 / 15%);
  }
  .admin-header-item .nav-link {
    width: auto;
    color: #000 !important;
  }
  .admin-header-item  a:hover, .admin-header-item  a:focus {
    color: #9c876e!important;
    font-size: 16px !important;
    outline: none;
  }
  .admin-nav-item a {
    padding: 10px 20px 10px 20px;
  }
  .admin-nav-header {
    padding: 0px !important;
    width: 100%;
    box-shadow: 2px 2px 5px rgb(40 40 40 / 15%);
    background-color: #f6f2f0 !important;
  }
  .admin-header-item .dropdown-item:active, .admin-header-item .dropdown-item.active,
  .admin-header-item .dropdown-item:focus, .admin-header-item .dropdown-item.focus,
  .admin-header-item .dropdown-item:focus:active, .dropdown-item:hover, .dropdown-item:focus { 
    background-color: #f6f2f0 !important;
  }
  .row-admin-header {
    width: 100% !important;
    margin: 0 !important;
  }
  .row-admin-header.logo {
    justify-content: center;
    padding: 20px;
  }
  .admin-logo-image {
    height: auto;
    width: 200px !important;
    padding: 0px !important;
  }
  .admin-header-item.user .dropdown-menu {
    right: 0px;
  }
</style>