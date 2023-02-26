<template>
    <div class="admin-providers-component">
      <b-row class="table-section" v-if="enabledAddProvider === false && enabledEditProvider === false">
        <p class="title-admin-component">Furnizori <span class="small-element-title">({{providersNumber}})</span></p>
        <b-row class="row-admin-component add-button"> 
           <b-button class="initiate-add-button" v-on:click="initiateAddProvider()"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare furnizor</b-button>
        </b-row>
        <b-row class="row-admin-component">
          <b-table bordered striped :fields="fieldsTable" :items="providers" :busy="isLoading" responsive="sm" class="providers-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(index)>Index</template>
              <template #head(company)>Company</template>
              <template #head(completeNameRepresentative)>Nume Reprezentant</template>
              <template #head(emailRepresentative)>Email Reprezentant</template>
              <template #head(addressCompany)>Adresa companiei</template>
              <template #head(action)>Acțiune</template>
              <template #cell(index)="data">
                <b>{{ data.index + iteration + 1 }}</b>
              </template>
              <template #cell(company)="data">
                {{data.item.company}}
              </template>
              <template #cell(completeNameRepresentative)="data">
                {{data.item.completeNameRepresentative}}
              </template>
              <template #cell(emailRepresentative)="data">
                {{ data.item.emailRepresentative }}
              </template>
              <template #cell(addressCompany)="data">
                {{ data.item.addressCompany }}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="editProvider(data.item)"/>
                <font-awesome-icon icon="fa-solid fa-trash-can" class="trash-icon" @click="initiateDeleteProvider(data.item.idProvider, data.item.company)"/>
              </template>
          </b-table>
        </b-row>
        <b-row class="row-admin-component">
          <b-pagination
            v-model="currentPage"
            :total-rows="providersNumber"
            :per-page="perPageProviders"
            @input="getProviders()"
            class="pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row class="add-form-section" v-else-if="enabledAddProvider === true && enabledEditProvider === false">
        <p class="title-admin-component">Adăugare furnizor</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="company" class="label-form">Companie<span class="mandatory-field">*</span>:</label>
                <b-form-input id="company" class="input-form" placeholder="Companie" v-model="addedProvider.company"></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="email" class="label-form">Email Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="email" class="input-form" type="email" placeholder="Adresa de e-mail" v-model="addedProvider.emailRepresentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="firstName" class="label-form">Prenume Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="firstName" class="input-form" placeholder="Prenume Reprezentant" v-model="addedProvider.firstNameRepresentative"></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="lastName" class="label-form">Nume Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="lastName" class="input-form" placeholder="Nume" v-model="addedProvider.lastNameRepresentative"></b-form-input>              
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="adressCompany" class="label-form">Adresa Companiei<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Adresa Companiei" v-model="addedProvider.addressCompany"></b-form-textarea>            
              </b-col>
            </b-row>          
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="addProvider()">Adăugare furnizor</b-button>
                <b-button class="close-admin-button" v-on:click="closeAddProvider()">Close</b-button>
            </b-row>
        </b-row>
      </b-row>
      <b-row class="edit-form-section" v-else-if="enabledEditProvider === true && enabledAddProvider === false">
        <p class="title-admin-component">Editare furnizor</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="company" class="label-form">Companie<span class="mandatory-field">*</span>:</label>
                <b-form-input id="company" class="input-form" placeholder="Companie" v-model="editedProvider.company"></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="email" class="label-form">Email Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="email" class="input-form" type="email" placeholder="Adresa de e-mail" v-model="editedProvider.emailRepresentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="firstName" class="label-form">Prenume Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="firstName" class="input-form" placeholder="Prenume Reprezentant" v-model="editedProvider.firstNameRepresentative"></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="lastName" class="label-form">Nume Reprezentant<span class="mandatory-field">*</span>:</label>
                <b-form-input id="lastName" class="input-form" placeholder="Nume" v-model="editedProvider.lastNameRepresentative"></b-form-input>              
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="adressCompany" class="label-form">Adresa Companiei<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Adresa Companiei" v-model="editedProvider.addressCompany"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateProvider()">Actualizare furnizor</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditProvider()">Close</b-button>
            </b-row>
        </b-row>
      </b-row>
      <b-row>
        <b-modal id="admin-info-modal" v-model="showInfoModal" :title="titleInfoModal" ok-only @ok="okInfoModal">
          <p>{{textInfoModal}}</p>
        </b-modal>
      </b-row>
      <b-row>
        <b-modal id="admin-delete-modal" v-model="showConfirmationModal" :title="titleConfirmationModal" @ok="okConfirmationModal">
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
        providersNumber: "",
        isLoading: true,
        providers: [],
        fieldsTable: ['Index', { key: 'company', label: 'Company' }, { key: 'completeNameRepresentative', label: 'Name Representative'}, 
        { key: 'emailRepresentative', label: 'Email Representative'}, { key: 'addressCompany', label: 'Address'},
        { key: 'action', label: 'Acțiune'}],
        currentPage: 1,
        perPageProviders: 15,
        iteration: 0,
        enabledAddProvider: false,
        addedProvider: {
          company: "",
          firstNameRepresentative: "",
          lastNameRepresentative: "",
          emailRepresentative: "",
          addressCompany: "",
        },
        enabledEditProvider: false,
        editedProvider: {
          idProvider: 0,
          company: "",
          firstNameRepresentative: "",
          lastNameRepresentative: "",
          emailRepresentative: "",
          addressCompany: "",
        },
        idDeletedProvider: "",
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
      getProvidersNumber() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/providers/getProvidersNumber"
        }).then(result => {
          this.providersNumber = result.data[0].providers_number;
          this.getProviders();
        })
      },
      getProviders() {
        let thisRef = this;
        this.iteration = (this.currentPage - 1) * this.perPageProviders;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.providers = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/providers/getAllProviders/" + this.iteration
        }).then(result => {
          if(result.data.length > 0) {
            let provider = {
              idProvider: 0,
              company: "",
              firstNameRepresentative: "",
              lastNameRepresentative: "",
              completeNameRepresentative: "",
              emailRepresentative: "",
              addressCompany: "",
            }
            for(var i = 0; i < result.data.length; i++) {
              provider = {
                idProvider: result.data[i].id_provider,
                company: result.data[i].company,
                firstNameRepresentative: result.data[i].first_name_representative,
                lastNameRepresentative: result.data[i].last_name_representative,
                completeNameRepresentative: result.data[i].name_representative,
                emailRepresentative: result.data[i].email_representative,
                addressCompany: result.data[i].address_company,
              } 
              this.providers.push(provider);                   
            }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        })
      },
      initiateAddProvider() {
        this.enabledAddProvider = true;
      },
      closeAddProvider() {
        this.enabledAddProvider = false;
        this.addedProvider = {
          company: "",
          firstNameRepresentative: "",
          lastNameRepresentative: "",
          emailRepresentative: "",
          addressCompany: "",
        }
      },
      addProvider() {
        axios({
          method: 'post',
          url: 'http://localhost:3000/providers/addProvider',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.addedProvider
        }).then(result => {
          this.addedProvider = {
            company: "",
            firstNameRepresentative: "",
            lastNameRepresentative: "",
            emailRepresentative: "",
            addressCompany: "",
          }
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare furnizor";
          this.textInfoModal = "Furnizorul a fost adăugat cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare furnizor";
          this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      editProvider(provider) {
        this.enabledAddProvider = false;
        this.enabledEditProvider = true;
        this.editedProvider = {
          idProvider: provider.idProvider,
          company: provider.company,
          firstNameRepresentative: provider.firstNameRepresentative,
          lastNameRepresentative: provider.lastNameRepresentative,
          emailRepresentative: provider.emailRepresentative,
          addressCompany: provider.addressCompany,
        }
      },
      updateProvider() {
        axios({
          method: 'put',
          url: 'http://localhost:3000/providers/updateProvider',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedProvider
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
      closeEditProvider() {
        this.enabledEditProvider = false;
        this.editedProvider = {
          idProvider: "",
          company: "",
          firstNameRepresentative: "",
          lastNameRepresentative: "",
          emailRepresentative: "",
          addressCompany: "",
        }
      },
      initiateDeleteProvider(idProvider, companyProvider) {
        this.titleConfirmationModal = "Confirmare ștergere furnizor"
        this.textConfirmationModal = "Sigur doriți să ștergeți furnizorul " + companyProvider + "?";
        this.showConfirmationModal = true;
        this.idDeletedProvider = idProvider;
      },
      deleteProvider() {
        axios({
          method: 'delete',
          url: 'http://localhost:3000/providers/deleteProvider/' + this.idDeletedProvider,
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
        }).then(result => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere furnizor";
          this.textInfoModal = "Furnizorul a fost șters cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere furnizor";
          this.textInfoModal = "A apărut o eroare la acțiunea de ștergere! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      okInfoModal() {
        switch(this.actionInfoModal) {
          case "adding":
            this.enabledAddProvider = false;
            this.getProviders();
            break;
          case "updating":
            this.enabledEditProvider = false;
            this.getProviders();
            break;
          case "deleting":
            this.idDeletedProvider = 0;
            this.getProviders();
            break;
        }
      },
      okConfirmationModal() {
        this.deleteProvider();
      }
    },
    mounted() {
      this.getProvidersNumber();
    }
  }
</script>
<style>
    .admin-providers-component {
      padding: 30px;
    }
    .providers-table {
      padding: 0 !important;
    }
    .providers-table th:first-child  {
      width: 5% !important;
    }
    .providers-table th:last-child, .providers-table td:last-child  {
      text-align: center !important;
    }
</style>