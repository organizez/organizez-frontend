<template>
    <div class="admin-category-component">
      <b-row class="table-section" v-if="enabledAddCategory === false && enabledEditCategory === false">
        <p class="title-admin-component">Categorii Furnizori <span class="small-element-title">({{categoriesNumber}})</span></p>
        <b-row class="row-admin-component add-button"> 
           <b-button class="initiate-add-button" v-on:click="initiateAddCategory()"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare categorie</b-button>
        </b-row>
        <b-row class="row-admin-component">
          <b-table bordered striped :fields="fieldsCategoriesTable" :items="categoriesProviders" :busy="isLoading" responsive="sm" class="categories-providers-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(index)>Index</template>
              <template #head(category)>Categorie Furnizori</template>
              <template #head(servicesNumber)>Număr de servicii</template>
              <template #head(action)>Acțiune</template>
              <template #cell(index)="data">
                <b>{{ data.index + iteration + 1 }}</b>
              </template>
              <template #cell(category)="data">
                {{data.item.category}}
              </template>
              <template #cell(servicesNumber)="data">
                {{data.item.servicesNumber}}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="editCategory(data.item)"/>
                <font-awesome-icon icon="fa-solid fa-trash-can" class="trash-icon" @click="initiateDeleteCategory(data.item.idCategory, data.item.category, data.item.servicesNumber)"/>
              </template>
          </b-table>
        </b-row>
        <b-row class="row-admin-component">
          <b-pagination
            v-model="currentPage"
            :total-rows="categoriesNumber"
            :per-page="perPageCategories"
            @input="getProviders()"
            class="pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row class="add-form-section" v-else-if="enabledAddCategory === true && enabledEditCategory === false">
        <p class="title-admin-component">Adăugare categorie furnizor</p>
        <b-row class="row-form">
          <b-col class="col-form left">
            <label for="categoryName" class="label-form">Denumire Categorie<span class="mandatory-field">*</span>:</label>
            <b-form-input id="categoryName"  class="input-form" placeholder="Categorie" v-model="addedCategory.category"></b-form-input>            
          </b-col>
        </b-row>
        <b-row class="row-form admin-buttons">
          <b-button class="action-admin-button" v-on:click="addCategory()">Adăugare categorie</b-button>
          <b-button class="close-admin-button" v-on:click="closeAddCategory()">Close</b-button>
        </b-row>
      </b-row>
      <b-row class="add-form-section" v-else-if="enabledEditCategory === true && enabledAddCategory === false">
        <p class="title-admin-component">Editare categorie furnizor</p>
        <b-row class="row-form">
          <b-col class="col-form left">
            <label for="categoryName" class="label-form">Denumire Categorie<span class="mandatory-field">*</span>:</label>
            <b-form-input id="categoryName" class="input-form" placeholder="Categorie" v-model="editedCategory.category"></b-form-input>            
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
      <b-row>
        <b-modal id="admin-delete-modal" v-model="showConfirmationModal" :title="titleConfirmationModal" @ok="okConfirmationModal" @close="cancelConfirmationModal" @cancel="cancelConfirmationModal">
          <p>{{textConfirmationModal}}</p>
        </b-modal>
      </b-row>
    </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
 export default {
    data() {
      return {
        categoriesNumber: "",
        isLoading: true,
        fieldsCategoriesTable: ['Index', { key: 'category', label: 'Categorie'}, { key: 'servicesNumber', label: 'Număr de servicii'}, { key: 'action', label: 'Acțiune'}],
        categoriesProviders: [],
        currentPage: 1,
        perPageCategories: 15,
        iteration: 0,
        enabledAddCategory: false,
        addedCategory: {
          category: ""
        },
        enabledEditCategory: false,
        editedCategory: {
          idCategory: "",
          category: ""
        },
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
          url: "http://localhost:3000/categoryProviders/getCategoriesProvidersNumber"
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
          url: "http://localhost:3000/categoryProviders/getAllCategoriesProviders/" + this.iteration
        }).then(result => {
          if(result.data.length > 0) {
            let category = {
              idCategory: 0,
              category: "",
              servicesNumber: 0
            }
            for(var i = 0; i < result.data.length; i++) {
              category = {
                idCategory: result.data[i].id_category,
                category: result.data[i].category,
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
      initiateAddCategory() {
        this.enabledAddCategory = true;
      },
      closeAddCategory(category) {
        this.enabledAddCategory = false;
        this.addedCategory = {
          category: ""
        }
      },
      addCategory() {
        axios({
          method: 'post',
          url: 'http://localhost:3000/categoryProviders/addCategoryProviders',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.addedCategory
        }).then(result => {
          this.addedCategory = {
            category: ""
          }
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare categorie";
          this.textInfoModal = "Categoria a fost adăugată cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare categorie";
          this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      editCategory(categoryProvider) {
        this.enabledAddCategory = false;
        this.enabledEditCategory = true;
        this.editedCategory = {
          idCategory: categoryProvider.idCategory,
          category: categoryProvider.category
        }
      },
      updateCategory() {
        axios({
          method: 'put',
          url: 'http://localhost:3000/categoryProviders/updateCategoryProvider',
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
        this.enabledEditCategory = false;
        this.editCategory = {
          idCategory: "",
          category: ""
        }
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
          url: 'http://localhost:3000/categoryProviders/deleteCategoryProvider/' + this.idDeletedCategory,
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
        }).then(result => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere categorie";
          this.textInfoModal = "Categoria a fost ștearsă cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere categorie";
          this.textInfoModal = "A apărut o eroare la acțiunea de ștergere! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      okInfoModal() {
        switch(this.actionInfoModal) {
          case "adding":
            this.enabledAddCategory = false;
            this.getCategoriesProviders();
            break;
          case "updating":
            this.enabledEditCategory = false;
            this.getCategoriesProviders();
            break;
          case "deleting":
            this.idDeletedCategory = "";
            this.getCategoriesProviders();
            break;
        }
      },
      okConfirmationModal() {
        console.log(this.idDeletedCategory)
        if(this.idDeletedCategory !== "") {
          this.deleteCategoryProvider();
        } 
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
    .admin-category-component {
      padding: 30px;
    }
    .categories-providers-table {
      padding: 0 !important;
    }
    .categories-providers-table th:last-child, .categories-providers-table td:last-child  {
      text-align: center !important;
    }
</style>