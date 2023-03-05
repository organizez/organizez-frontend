<template>
    <div class="admin-header-component">
        <b-nav small class="admin-header">
            <b-nav-item active left class="admin-header-item logo">Organizez</b-nav-item>
            <b-nav-item-dropdown right class="admin-header-item user">
              <template #button-content>
                {{firstNameUser}}
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
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
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/users/getUser/' + this.idUser
        }).then(result => {
          console.log(result)
          this.firstNameUser = result.data[0].first_name;
        })
      }
    },
    mounted() {
      this.getUser();
    }
  }
</script>
<style>
  .admin-header-component {
    width: 100%;
    background-color: #a3b18a;
    height: 60px;
    box-shadow: 0 0.25rem 0.25rem rgb(0 0 0 / 25%), inset 0 -1px 5px rgb(0 0 0 / 25%);
  }
  .admin-header-item.logo {
    width: 80%;
  }
  .admin-header-item.logo a {
    font-weight: 600;
    font-size: 20px;
    padding: 15px;
    color: #000;
     width: 150px;
  }
  .admin-header-item.user {
    width: 20%;
  }
  .admin-header-item.user a {
    font-size: 15px;
    padding: 18px 30px 18px 18px;
    color: #000;
    text-align: right;
  }
</style>