<template>
    <div class="admin-area-page">
        <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
        <div class="admin-area-content">
            <div class="admin-nav-container">
                <b-nav vertical class="admin-vertical-nav">
                    <b-nav-item class="admin-vertical-item" active @click="showComponent('dashboard')">Dashboard</b-nav-item>
                    <b-nav-item class="admin-vertical-item" @click="showComponent('users')">Utilizatori</b-nav-item>
                    <b-nav-item class="admin-vertical-item" @click="showComponent('providers')">Furnizori</b-nav-item>
                    <b-nav-item class="admin-vertical-item" @click="showComponent('categories')">Categorii</b-nav-item>
                    <b-nav-item class="admin-vertical-item" @click="showComponent('services')">Servicii</b-nav-item>
                    <b-nav-item class="admin-vertical-item" @click="showComponent('blog')">Blog</b-nav-item>
                    <b-nav-item class="admin-vertical-item" @click="showComponent('portofolio')">Portofoliu</b-nav-item>
                </b-nav>
            </div>
            <div class="admin-component-container">
              <Admin-Dashboard v-if="activeDashboard === true"></Admin-Dashboard>
              <Admin-Users v-if="activeUsers"></Admin-Users>
              <Admin-Providers v-if="activeProviders"></Admin-Providers>
              <Admin-Category-Providers v-if="activeCategoryProviders"></Admin-Category-Providers>
              <Admin-Services v-if="activeServices"></Admin-Services>
              <Admin-Blog v-if="activeBlog"></Admin-Blog>
              <Admin-Portofolio v-if="activePortofolio"></Admin-Portofolio>
            </div>
        </div>
    </div>
</template>
<script>
// import axios from 'axios';
// import $ from "jquery";
import AdminHeader from "../components/AdminHeader.vue";
import AdminDashboard from "../components/AdminDashboard.vue";
import AdminUsers from "../components/AdminUsers.vue";
import AdminProviders from "../components/AdminProviders.vue";
import AdminCategoryProviders from "../components/AdminCategoryProviders.vue";
import AdminServices from "../components/AdminServices.vue";
import AdminBlog from "../components/AdminBlog.vue";
import AdminPortofolio from "../components/AdminPortofolio.vue";

 export default {
    components: {
        AdminHeader,
        AdminDashboard,
        AdminUsers,
        AdminProviders,
        AdminCategoryProviders,
        AdminServices,
        AdminBlog,
        AdminPortofolio
    },
    data() {
      return {
        activeDashboard: false, 
        activeUsers: false,
        activeProviders: false,
        activeCategoryProviders: false,
        activeServices: false,
        activeBlog: false, 
        activePortofolio: false
      }
    },
    methods: {
      showComponent(componentName) {
        console.log(componentName)
      switch(componentName) {
        case 'dashboard':
          this.activeDashboard = true;
          this.activeUsers = false;
          this.activeProviders = false;
          this.activeCategoryProviders = false;
          this.activeServices = false;
          this.activeBlog = false;
          this.activePortofolio = false;
          break;
        case 'users':
          this.activeDashboard = false;
          this.activeUsers = true;
          this.activeProviders = false;
          this.activeCategoryProviders = false;
          this.activeServices = false;
          this.activeBlog = false;
          this.activePortofolio = false;         
          break;
        case 'providers':
          this.activeDashboard = false;
          this.activeUsers = false;
          this.activeProviders = true;
          this.activeCategoryProviders = false;
          this.activeServices = false;
          this.activeBlog = false;
          this.activePortofolio = false;
          break;
        case 'categories':
          this.activeDashboard = false;
          this.activeUsers = false;
          this.activeProviders = false;
          this.activeCategoryProviders = true;
          this.activeServices = false;
          this.activeBlog = false;
          this.activePortofolio = false;
          break;
        case 'services':
          this.activeDashboard = false;
          this.activeUsers = false;
          this.activeProviders = false;
          this.activeCategoryProviders = false;
          this.activeServices = true;
          this.activeBlog = false;
          this.activePortofolio = false;         
          break;
        case 'blog':
          this.activeDashboard = false;
          this.activeUsers = false;
          this.activeProviders = false;
          this.activeCategoryProviders = false;
          this.activeServices = false;
          this.activeBlog = true;
          this.activePortofolio = false;             
          break;
        case 'portofolio':
          this.activeDashboard = false;
          this.activeUsers = false;
          this.activeProviders = false;
          this.activeCategoryProviders = false;
          this.activeServices = false;
          this.activeBlog = false;
          this.activePortofolio = true;           
          break;
        default:
          this.activeDashboard = true;
          this.activeUsers = false;
          this.activeProviders = false;
          this.activeCategoryProviders = false;
          this.activeServices = false;
          this.activeBlog = false;
          this.activePortofolio = false;         
      }
      }
    },
    mounted() {
      console.log(this.$route.params.idUser)
    },
    computed: {
    }
  }
</script>
<style>
  .admin-area-page {
    width: 100%;
    height: 100%;
  }
  .admin-area-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex: row;
  }
  .admin-nav-container {
    width: 15%;
    height: 100%; 
    box-shadow: 0 0.25rem 0.25rem rgb(0 0 0 / 5%), inset 0 -1px 5px rgb(0 0 0 / 15%);
  }
  .admin-vertical-item a {
    color:#000000 !important;
    font-size: 16px !important;
    text-align: left !important;
    padding: 10px 10px 10px 30px !important;
  }
  .admin-vertical-nav {
    width: 100%;
    border-bottom: 1px solid lightgray;
  }
  .admin-vertical-item {
    width: 100%;
    border-bottom: 1px solid lightgray;
  }
  .admin-component-container {
    width: 85%;
  }
</style>