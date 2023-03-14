<template>
    <div class="admin-category">
       <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="table-section">
        <p class="title-admin">Categorii Servicii <span class="small-element-title">({{categoriesNumber}})</span></p>
        <b-row class="row-admin add-button"> 
           <b-button class="initiate-add-button" v-on:click="redirectToPage('/administrare/adaugare-categorie/' + $route.params.idUser)"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare categorie</b-button>
        </b-row>
        <b-row class="row-admin">
          <b-table bordered striped :fields="fieldsCategoriesTable" :items="categoriesProviders" :busy="isLoading" responsive="sm" class="categories-providers-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(index)>Index</template>
              <template #head(category)>Categorie Serviciu</template>
              <template #head(servicesNumber)>Număr de servicii</template>
              <template #head(categoryImage)>Imagine</template>
              <template #head(action)>Acțiune</template>
              <template #cell(index)="data">
                <b>{{ data.index + iteration + 1 }}</b>
              </template>
              <template #cell(category)="data">
                {{data.item.category}}
              </template>
               <template #cell(categoryImage)="data">
                {{data.item.categoryImage.substring(0,33) + "..."}}
              </template>
              <template #cell(servicesNumber)="data">
                {{data.item.servicesNumber}}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon" @click="redirectToPage('/administrare/editare-categorie/' + data.item.idCategory + '/' + $route.params.idUser)"/>
                <font-awesome-icon icon="fa-solid fa-trash-can" class="trash-icon" @click="initiateDeleteCategory(data.item.idCategory, data.item.category, data.item.servicesNumber)"/>
              </template>
          </b-table>
        </b-row>
        <b-row class="row-admin">
          <b-pagination
            v-model="currentPage"
            :total-rows="categoriesNumber"
            :per-page="perPageCategories"
            @input="getCategoriesProviders()"
            class="admin-pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row>
        <b-modal id="admin-info-modal" v-model="showInfoModal" :title="titleInfoModal" ok-only @ok="okInfoModal">
          <p>{{textInfoModal}}</p>
        </b-modal>
      </b-row>
      <b-row>
        <b-modal id="admin-delete-modal" v-model="showConfirmationModal" :title="titleConfirmationModal" @ok="okConfirmationModal" @close="cancelConfirmationModal" @cancel="cancelConfirmationModal">
          <p>{{textConfirmationModal}}</p>
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
        categoriesNumber: "",
        isLoading: true,
        fieldsCategoriesTable: ['Index', { key: 'category', label: 'Categorie'}, { key: 'categoryImage', label: 'Imagine'}, { key: 'servicesNumber', label: 'Număr de servicii'}, { key: 'action', label: 'Acțiune'}],
        categoriesProviders: [],
        currentPage: 1,
        perPageCategories: 15,
        iteration: 0,
        idDeletedCategory: "",
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,
        titleConfirmationModal: "",
        textConfirmationModal: "",
        showConfirmationModal: false,      
      }
    },
    methods: {
      getCategoriesProvidersNumber() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/categoriesServices/getCategoriesServicesNumber"
        }).then(result => {
          this.categoriesNumber = result.data[0].categories_number;
          this.getCategoriesProviders();
        })
      },
      getCategoriesProviders() {
        let thisRef = this;
        this.iteration = (this.currentPage - 1) * this.perPageCategories;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.categoriesProviders = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/categoriesServices/getAllCategoriesServices/" + this.iteration
        }).then(result => {
          if(result.data.length > 0) {
            let category = {
              idCategory: 0,
              category: "",
              categoryImage: "",
              servicesNumber: 0
            }
            for(var i = 0; i < result.data.length; i++) {
              category = {
                idCategory: result.data[i].id_category,
                category: result.data[i].category,
                categoryImage: result.data[i].category_image,
                servicesNumber: result.data[i].services_number,
              } 
              this.categoriesProviders.push(category);                   
            }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        })
      },
      redirectToPage(path) {
        this.$router.push(path);
      },
      initiateDeleteCategory(idCategory, categoryProvider, servicesNumber) {
         if(servicesNumber === 0) {
          this.titleConfirmationModal = "Confirmare ștergere categorie"
          this.textConfirmationModal = "Sigur doriți să ștergeți categoria " + categoryProvider + "?";
          this.showConfirmationModal = true;
          this.idDeletedCategory = idCategory;
        } else {
          this.titleConfirmationModal = "Ștergere categorie"
          this.textConfirmationModal = "Categoria " + categoryProvider + " nu poate fi ștearsă, întrucât este utilizată în " + servicesNumber + " servicii. Vă rugăm actualizați serviciile înainte de ștergerea categoriei.";
          this.showConfirmationModal = true;
        }
        

      },
      deleteCategoryProvider() {
        axios({
          method: 'delete',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/categoriesServices/deleteCategory/' + this.idDeletedCategory,
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
        }).then(result => {
          this.titleInfoModal = "Ștergere categorie";
          this.textInfoModal = "Categoria a fost ștearsă cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.titleInfoModal = "Ștergere categorie";
          this.textInfoModal = "A apărut o eroare la acțiunea de ștergere! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      okInfoModal() {
            this.idDeletedCategory = "";
            this.getCategoriesProviders();
      },
      okConfirmationModal() {
          this.deleteCategoryProvider();
      },
      cancelConfirmationModal() {
        this.idDeletedCategory = "";
      }
    },
    mounted() {
      this.getCategoriesProvidersNumber();
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