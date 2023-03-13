<template>
    <div class="admin-customers">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin">Editing clienți</p>
        <b-row class="row-admin">
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="12" xl="12">
                <label for="company" class="label-form">Companie</label>
                <b-form-input id="company" class="input-admin-form" placeholder="Companie" v-model="editedCustomer.company"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="first-name-representative" class="label-form">Prenume Reprezentant:</label>
                <b-form-input id="first-name-representative" class="input-admin-form" placeholder="Prenume Reprezentant" v-model="editedCustomer.firstNameRepresentative"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="last-name-representative" class="label-form">Nume Reprezentant:</label>
                <b-form-input id="last-name-representative" class="input-admin-form" placeholder="Nume Reprezentant" v-model="editedCustomer.lastNameRepresentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="email-representative" class="label-form">Email Reprezentant:</label>
                <b-form-input id="email-representative" class="input-admin-form" placeholder="Email Reprezentant" v-model="editedCustomer.emailRepresentative"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="phone-representative" class="label-form">Telefon Reprezentant:</label>
                <b-form-input id="phone-representative" class="input-admin-form" placeholder="Telefon Reprezentant" v-model="editedCustomer.phoneRepresentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="name" class="label-form">Denumire:</label>
                <b-form-input id="name" class="input-admin-form" placeholder="Denumire" v-model="editedCustomer.name"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="subscription-type" class="label-form">Tip abonament:</label>
                <b-select v-model="editedCustomer.subscriptionType" :options="subscriptionTypes" class="select-admin-form"></b-select>    
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="location" class="label-form">Locație:</label>
                <b-form-input id="location" class="input-admin-form" placeholder="Locație" v-model="editedCustomer.location"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="cities" class="label-form">Orașe<span class="mandatory-field">*</span>:</label>
                <b-select v-model="editedCustomer.idCity"  :options="cities" class="select-admin-form"></b-select>             
              </b-col>
            </b-row>    
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="website" class="label-form">Website:</label>
                <b-form-input id="website" class="input-admin-form" placeholder="Site" v-model="editedCustomer.website"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="website" class="label-form">Telefon site:</label>
                <b-form-input id="website" class="input-admin-form" placeholder="Telefon" v-model="editedCustomer.phone"></b-form-input>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="short-description" class="label-form">Descriere scurtă:</label>
                <b-form-textarea id="textarea-form" rows="8" class="input-admin-form" placeholder="Descriere scurtă" v-model="editedCustomer.shortDescription"></b-form-textarea>            
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="long-description" class="label-form">Descriere lungă:</label>
                <b-form-textarea id="textarea-form" rows="8" class="input-admin-form" placeholder="Descriere lungă" v-model="editedCustomer.longDescription"></b-form-textarea> 
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file1" :state="Boolean(file1)" @change="deleteImage(file1)" @input="uploadImage1()" placeholder="Alegeți imaginea 1" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file2" :state="Boolean(file2)" @change="deleteImage(file2)" @input="uploadImage2()" placeholder="Alegeți imaginea 2" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file3" :state="Boolean(file3)" @change="deleteImage(file3)" @input="uploadImage3()" placeholder="Alegeți imaginea 3" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file4" :state="Boolean(file4)" @change="deleteImage(file4)" @input="uploadImage4()" placeholder="Alegeți imaginea 4" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file5" :state="Boolean(file5)" @change="deleteImage(file5)" @input="uploadImage5()" placeholder="Alegeți imaginea 5" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file6" :state="Boolean(file6)" @change="deleteImage(file6)" @input="uploadImage6()" placeholder="Alegeți imaginea 6" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file7" :state="Boolean(file7)" @change="deleteImage(file7)" @input="uploadImage7()" placeholder="Alegeți imaginea 7" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file8" :state="Boolean(file8)" @change="deleteImage(file8)" @input="uploadImage8()" placeholder="Alegeți imaginea 8" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file9" :state="Boolean(file9)" @change="deleteImage(file9)" @input="uploadImage9()" placeholder="Alegeți imaginea 9" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file10" :state="Boolean(file10)" @change="deleteImage(file10)" @input="uploadImage10()" placeholder="Alegeți imaginea 10" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="category" class="label-form">Categorie<span class="mandatory-field">*</span>:</label>
                <b-select v-model="editedCustomer.idCategory" :options="categoriesServices" @change="getFacilitiesOptionsByCategory(editedCustomer.idCategory)" class="select-admin-form"></b-select>             
              </b-col>
              <b-col class="col-admin-form text" sm="12" md="12" lg="6" xl="6">
                <b-form-group
                  label="Facilități" v-if="facilitiesOptions.length !== 0"
                  v-slot="{ ariaDescribedby }">
                  <b-form-checkbox
                    :aria-describedby="ariaDescribedby"
                    v-for="option in facilitiesOptions"
                    v-model="editedCustomer.selectedFacilitiesOptions"
                    :key="option.value"
                    :value="option.value"
                    class="checkbox-facility">
                    {{ option.text }}
                  </b-form-checkbox>
                </b-form-group>
                <p v-else>Nu există facilități pentru categoria selectată</p>
              </b-col>
            </b-row>
            <b-row class="row-admin-form" v-if="editedCustomer.idCategory === 4">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="minimum-capacity" class="label-form">Capacitate minimă:</label>
                <b-form-input id="minimum-capacity" class="input-admin-form" placeholder="Capacitate minimă" v-model="editedCustomer.minimumCapacity"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="maximum-capacity" class="label-form">Capacitate maximă:</label>
                <b-form-input id="maximum-capacity" class="input-admin-form" placeholder="Capacitate maximă" v-model="editedCustomer.maximumCapacity"></b-form-input>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form" v-if="editedCustomer.idCategory === 4">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="number-hall" class="label-form">Număr săli:</label>
                <b-form-input id="number-hall" class="input-admin-form" placeholder="Număr săli" v-model="editedCustomer.numberHall"></b-form-input>
              </b-col>
            </b-row> 
            <b-row class="row-admin-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="addCustomer()">Adăugare client</b-button>
                <b-button class="close-admin-button" v-on:click="closeAddCustomer()">Close</b-button>
            </b-row>
        </b-row>
      </b-row>
      <b-row>
        <b-modal id="admin-info-modal" v-model="showInfoModal" :title="titleInfoModal" ok-only >
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
        editedCustomer: {
          idCustomer: 0,
          company: "",
          firstNameRepresentative: "",
          lastNameRepresentative: "",
          emailRepresentative: "",
          phoneRepresentative: "",
          subscriptionType: "basic",
          name: "",
          location: "",
          website: "",
          phone: "",
          shortDescription: "",
          longDescription: "",
          image1: "",
          image2: "",
          image3: "",
          image4: "",
          image5: "",
          image6: "",
          image7: "",
          image8: "",
          image9: "",
          image10: "",
          minimumCapacity: 0,
          maximumCapacity: 0,
          numberHall: 0,
          idCity: 1,
          idCategory: 1,
          selectedFacilitiesOptions: []
        },
        file1: [],
        file2: [],
        file3: [],
        file4: [],
        file5: [],
        file6: [],
        file7: [],
        file8: [],
        file9: [],
        file10: [],
        selectedFacilitiesOptions: [],
        categoriesServices: [],
        facilitiesOptions: [],
        cities: [],
        subscriptionTypes: [
          { value: 'basic', text: 'basic' },
          { value: 'premium', text: 'premium' }
        ],
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