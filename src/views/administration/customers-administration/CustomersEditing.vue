<template>
    <div class="admin-customers">
      <b-row class="edit-form-section">
        <p class="title-admin">Editare furnizor</p>
        <b-row class="row-admin">
            <b-row class="row-form">
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="company" class="label-form">Companie<span class="mandatory-field">*</span>:</label>
                <b-form-input id="company" class="input-form" placeholder="Companie" v-model="editedCustomer.company"></b-form-input>
              </b-col>
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="email" class="label-form">Email Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="email" class="input-form" type="email" placeholder="Adresa de e-mail" v-model="editedCustomer.emailRepresentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="firstName" class="label-form">Prenume Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="firstName" class="input-form" placeholder="Prenume Reprezentant" v-model="editedCustomer.firstNameRepresentative"></b-form-input>
              </b-col>
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="lastName" class="label-form">Nume Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="lastName" class="input-form" placeholder="Nume" v-model="editedCustomer.lastNameRepresentative"></b-form-input>              
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="adressCompany" class="label-form">Adresa Companiei<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Adresa Companiei" v-model="editedCustomer.addressCompany"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateCustomer()">Actualizare furnizor</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditCustomer()">Close</b-button>
            </b-row>
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

import axios from 'axios';
import $ from "jquery";
 export default {
    data() {
      return {
        isLoading: true,
        enabledEditCustomer: false,
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