<template>
    <div class="admin-category">
    <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin">Editare categorie furnizor</p>
        <b-row class="row-form">
          <b-col class="col-form left">
            <label for="categoryName" class="label-form">Denumire Categorie<span class="mandatory-field">*</span>:</label>
            <b-form-input id="categoryName" class="input-form" placeholder="Categorie" v-model="editedCategory.category"></b-form-input>            
          </b-col>
        </b-row>
        <b-row class="row-form">
          <b-col class="col-form left">
            <label for="categoryImage" class="label-form">Imagine<span class="mandatory-field">*</span>:</label>
            <b-form-textarea id="textarea-form" placeholder="Imagine" v-model="editedCategory.categoryImage"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="row-form admin-buttons">
          <b-button class="action-admin-button" v-on:click="updateCategory()">Actualizare categorie</b-button>
          <b-button class="close-admin-button" v-on:click="closeEditCategory()">Close</b-button>
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
import { S3 } from "@aws-sdk/client-s3";
import spaceConfig from "../../../../digital-ocean-space-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
   components: {
      AdminHeader
    },
    data() {
      return {
        file1: [],
        editedCategory: {
          idCategory: 0,
          category: "",
          categoryImage: ""
        },
        isLoading: true,
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,   
      }
    },
    methods: {
        getParams() {
            this.idUser = this.$route.params.idUser;
            this.idCategory = this.$route.params.idCategory;
            this.getCategoryService();
        },
        getCategoryService() {
          let thisRef = this;
          axios({
            method: "get",
            headers: {"accept":"application/json"},
            url: "http://localhost:3000/categoriesServices/getCategoryServiceById/" + this.idCategory
          }).then(result => {
            this.editedCategory = {
                idCategory: result.data.id_category,
                category: result.data.category,
                categoryImage: result.data.category_image
            }
              setTimeout(function() {
                thisRef.isLoading = false;
              }, 1000);
        })
      },
      editCategory(categoryProvider) {
        this.enabledAddCategory = false;
        this.enabledEditCategory = true;
        this.editedCategory = {
          idCategory: categoryProvider.idCategory,
          category: categoryProvider.category,
          categoryImage: categoryProvider.categoryImage
        }
      },
      updateCategory() {
        axios({
          method: 'put',
          url: 'http://localhost:3000/categoriesServices/updateCategoriesServices',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedCategory
        }).then(result => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare categorie";
          this.textInfoModal = "Categoria a fost actualizată cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare categorie";
          this.textInfoModal = "A apărut o eroare la acțiunea de actualizare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      closeEditCategory() {
        this.$router.push('/administrare/categorii/' + this.idUser);
       
      },
    },
    mounted() {
      this.getParams(); 
    }
  }
</script>
<style>
    .admin-category-component {
      padding: 30px;
    }
    .categories-providers-table {
      padding: 0 !important;
      overflow: overlay;
    }
    .categories-providers-table th:last-child, .categories-providers-table td:last-child  {
      text-align: center !important;
    }
</style>