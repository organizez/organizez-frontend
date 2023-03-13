<template>
    <div class="admin-category">
    <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin-component">Adăugare categorie serviciu</p>
        <b-row class="row-form">
          <b-col class="col-form left">
            <label for="categoryName" class="label-form">Denumire Categorie<span class="mandatory-field">*</span>:</label>
            <b-form-input id="categoryName"  class="input-form" placeholder="Categorie" v-model="addedCategory.category"></b-form-input>            
          </b-col>
        </b-row>
        <b-row class="row-form">
          <b-col class="col-form left">
            <label for="categoryImage" class="label-form">Imagine<span class="mandatory-field">*</span>:</label>
            <b-form-textarea id="textarea-form" placeholder="Imagine" v-model="addedCategory.categoryImage"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="row-form admin-buttons">
          <b-button class="action-admin-button" v-on:click="addCategory()">Adăugare categorie</b-button>
          <b-button class="close-admin-button" v-on:click="closeAddCategory()">Close</b-button>
        </b-row>
      </b-row>
      <b-row>
        <b-modal id="admin-info-modal" v-model="showInfoModal" :title="titleInfoModal" ok-only @ok="okInfoModal">
          <p>{{textInfoModal}}</p>
        </b-modal>
      </b-row>
    </div>
</template>
<script>
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
    components: {
      AdminHeader
    },
    data() {
      return {
        addedCategory: {
          category: "",
          categoryImage: ""
        },
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,  
      }
    },
    methods: {
      closeAddCategory(category) {
        this.addedCategory = {
          category: ""
        }
        this.$router.push('/administrare/categorii/' + this.idUser);
      },
      addCategory() {
        axios({
          method: 'post',
          url: 'http://localhost:3000/categoriesServices/addCategoriesServices',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.addedCategory
        }).then(result => {
          this.addedCategory = {
            category: "",
            categoryImage: ""
          }
          this.titleInfoModal = "Adăugare categorie";
          this.textInfoModal = "Categoria a fost adăugată cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.titleInfoModal = "Adăugare categorie";
          this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
    },
    mounted() {
    }
  }
</script>
<style>
    .admin-category {
      padding: 0px;
    }
    .categories-providers-table {
      padding: 0 !important;
      overflow: overlay;
    }
    .categories-providers-table th:last-child, .categories-providers-table td:last-child  {
      text-align: center !important;
    }
</style>