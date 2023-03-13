<template>
    <div class="admin-customers">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="edit-form-section">
        <p class="title-admin">Editare furnizor</p>
        <b-overlay :show="isLoading" rounded="sm" class="blog-administration-spinner" spinner-type="grow">
          <b-row class="row-admin">
              <b-row class="row-admin-form">
                  <label for="company" class="label-form">Companie</label>
                  <b-form-input id="company" class="input-admin-form" placeholder="Companie" v-model="editedCustomer.company"></b-form-input>
              </b-row>
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="first-name-representative" class="label-form">Prenume Reprezentant:</label>
                  <b-form-input id="first-name-representative" class="input-admin-form" placeholder="Prenume Reprezentant" v-model="editedCustomer.firstNameReprezentative"></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="last-name-representative" class="label-form">Nume Reprezentant:</label>
                  <b-form-input id="last-name-representative" class="input-admin-form" placeholder="Nume Reprezentant" v-model="editedCustomer.lastNameReprezentative"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="email-representative" class="label-form">Email Reprezentant:</label>
                  <b-form-input id="email-representative" class="input-admin-form" placeholder="Email Reprezentant" v-model="editedCustomer.emailReprezentative"></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="phone-representative" class="label-form">Telefon Reprezentant:</label>
                  <b-form-input id="phone-representative" class="input-admin-form" placeholder="Telefon Reprezentant" v-model="editedCustomer.phoneReprezentative"></b-form-input>
                </b-col>
              </b-row>
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="name" class="label-form">Denumire:</label>
                  <b-form-input id="name" class="input-admin-form" placeholder="Denumire" v-model="editedCustomer.name"></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="subscription-type" class="label-form">Tip abonament:</label>
                  <b-form-input id="subscription-type" class="input-admin-form" placeholder="Tip abonament" v-model="editedCustomer.subscriptionType"></b-form-input>
                </b-col>
              </b-row>  
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="location" class="label-form">Locație:</label>
                  <b-form-input id="location" class="input-admin-form" placeholder="Locație" v-model="editedCustomer.location"></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="website" class="label-form">Site:</label>
                  <b-form-input id="website" class="input-admin-form" placeholder="Site" v-model="editedCustomer.website"></b-form-input>
                </b-col>
              </b-row>      
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="short-description" class="label-form">Descriere scurtă:</label>
                  <b-form-input id="short-description" class="input-admin-form" placeholder="Descriere scurtă" v-model="editedCustomer.shortDescription"></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="long-description" class="label-form">Descriere lungă:</label>
                  <b-form-input id="long-description" class="input-admin-form" placeholder="Descriere lungă" v-model="editedCustomer.longDescription"></b-form-input>
                </b-col>
              </b-row>  
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file1" :state="Boolean(file1)" placeholder="Alegeți imaginea 1" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file2" :state="Boolean(file2)" placeholder="Alegeți imaginea 2" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
              </b-row>  
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file3" :state="Boolean(file3)" placeholder="Alegeți imaginea 3" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file4" :state="Boolean(file4)" placeholder="Alegeți imaginea 4" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
              </b-row>  
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file5" :state="Boolean(file5)" placeholder="Alegeți imaginea 5" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file6" :state="Boolean(file6)" placeholder="Alegeți imaginea 6" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
              </b-row>  
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file7" :state="Boolean(file7)" placeholder="Alegeți imaginea 7" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file8" :state="Boolean(file8)" placeholder="Alegeți imaginea 8" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
              </b-row>  
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file9" :state="Boolean(file9)" placeholder="Alegeți imaginea 9" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <b-form-file v-model="file10" :state="Boolean(file10)" placeholder="Alegeți imaginea 10" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
              </b-row>  
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="minimum-capacity" class="label-form">Capacitate minimă:</label>
                  <b-form-input id="minimum-capacity" class="input-admin-form" placeholder="Capacitate minimă" v-model="editedCustomer.minimumCapacity"></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="maximum-capacity" class="label-form">Capacitate maximă:</label>
                  <b-form-input id="maximum-capacity" class="input-admin-form" placeholder="Capacitate maximă" v-model="editedCustomer.maximumCapacity"></b-form-input>
                </b-col>
              </b-row>   
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="number-hall" class="label-form">Număr săli</label>
                  <b-form-input id="number-hall" class="input-admin-form" placeholder="Număr săli" v-model="editedCustomer.numberHall"></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="maximum-capacity" class="label-form">Capacitate maximă:</label>
                  <b-form-input id="maximum-capacity" class="input-admin-form" placeholder="Capacitate maximă" v-model="editedCustomer.maximumCapacity"></b-form-input>
                </b-col>
              </b-row>   
              <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="cities" class="label-form">Orașe<span class="mandatory-field">*</span>:</label>
                  <b-select v-model="editedCustomer.idCity"  :options="cities" class="select-admin-form"></b-select>             
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                  <label for="category" class="label-form">Categorie<span class="mandatory-field">*</span>:</label>
                  <b-select v-model="editedCustomer.idCategory" :options="categoriesServices" @change="getFacilitiesOptionsByCategory(editedCustomer.idCategory)" class="select-admin-form"></b-select>             
                </b-col>
              </b-row>
              <b-row>
                <b-form-group
                  label="Facilități"
                  v-slot="{ ariaDescribedby }">
                  <b-form-checkbox
                    :aria-describedby="ariaDescribedby"
                    v-for="option in facilitiesOptions"
                    v-model="selectedFacilitiesOptions"
                    :key="option.value"
                    :value="option.value"
                    class="checkbox-facility">
                    {{ option.text }}
                  </b-form-checkbox>
                </b-form-group>
              </b-row>
              <b-row class="row-form admin-buttons">
                  <b-button class="action-admin-button" v-on:click="updateCustomer()">Actualizare client</b-button>
                  <b-button class="close-admin-button" v-on:click="closeEditCustomer()">Close</b-button>
              </b-row>
          </b-row>
        </b-overlay>
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
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
    components: {
      AdminHeader
    },
    data() {
      return {
        isLoading: true,
        editedCustomer: {
          idCustomer: 0,
          company: "",
          firstNameRepresentative: "",
          lastNameRepresentative: "",
          emailRepresentative: "",
          addressCompany: "",
        },
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false    
      }
    },
    methods: {
      editCustomer(customer) {
        this.editedCustomer = {
          idCustomer: customer.idCustomer,
          company: customer.company,
          firstNameRepresentative: customer.firstNameRepresentative,
          lastNameRepresentative: customer.lastNameRepresentative,
          emailRepresentative: customer.emailRepresentative,
          addressCompany: customer.addressCompany,
        }
      },
      updateCustomer() {
        axios({
          method: 'put',
          url: 'http://localhost:3000/customers/updateCustomer',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedCustomer
        }).then(result => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare furnizor";
          this.textInfoModal = "Furnizorul a fost actualizat cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare furnizor";
          this.textInfoModal = "A apărut o eroare la acțiunea de actualizare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      closeEditCustomer() {
        this.editedCustomer = {
          idCustomer: "",
          company: "",
          firstNameRepresentative: "",
          lastNameRepresentative: "",
          emailRepresentative: "",
          addressCompany: "",
        }
      },
      okInfoModal() {
        this.getCustomers();
      }
    },
    mounted() {
     
    }
  }
</script>
<style>
    .admin-customers {
      padding: 30px;
    }
    .customers-table {
      padding: 0 !important;
      overflow: overlay;
    }
    .customers-table th:first-child  {
      width: 5% !important;
    }
    .customers-table th:last-child, .customers-table td:last-child  {
      text-align: center !important;
    }
</style>