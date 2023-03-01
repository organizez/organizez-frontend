<template>
    <div class="admin-termsConditions-component">
      <b-row class="table-section" v-if="enabledEditTermsConditions === false">
        <p class="title-admin-component">Termeni și condiții</p>
        <b-row class="row-admin-component">
          <b-table bordered striped :fields="fieldsTable" :items="termsConditions" :busy="isLoading" responsive="sm" class="termsConditions-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(titleTermsConditions)>Titlu</template>
              <template #head(textTermsConditions)>Text</template>
              <template #head(action)>Acțiune</template>
             <template #cell(titleTermsConditions)="data">
                {{data.item.titleTermsConditions}}
              </template>
             <template #cell(textTermsConditions)="data">
                {{data.item.textTermsConditions}}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="editTermsConditions(data.item)"/>
              </template>
          </b-table>
        </b-row>
         <b-row class="row-admin-component">
          <b-pagination
            @input="getTermsConditions()"
            class="admin-pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row class="edit-form-section" v-else-if="enabledEditTermsConditions === true">
        <p class="title-admin-component">Editare</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="titleTermsConditions" class="label-form">Titlu<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Titlu" v-model="editedTermsConditions.titleTermsConditions"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="textTermsConditions" class="label-form">Text<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Text" v-model="editedTermsConditions.textTermsConditions"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateTermsConditions()">Actualizare</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditTermsConditions()">Close</b-button>
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
        termsConditions: [],
        isLoading: true,
        fieldsTable: [{ key: 'titleTermsConditions', label: 'Title' }, { key: 'textTermsConditions', label: 'Text' }, { key: 'action', label: 'Acțiune'}],
        enabledEditTermsConditions: false,
        editedTermsConditions: {
        idTermsConditions: 0,
        titleTermsConditions: "",
        textTermsConditions: ""
        },
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
      getTermsConditions() {
        let thisRef = this;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.termsConditions = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/termsConditions/getTermsConditions"
        }).then(result => {
          if(result.data.length > 0) {
            let item = {
              idTermsConditions: 0,
              titleTermsConditions: "",
              textTermsConditions: "",
            }
            item = {
                idTermsConditions: result.data[0].id_terms_conditions,
                titleTermsConditions: result.data[0].title_terms_conditions,
                textTermsConditions: result.data[0].text_terms_conditions
                }
        this.termsConditions.push(item);
        }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        )
      },
      editTermsConditions(termsConditions) {
        this.enabledEditTermsConditions = true;
        this.editedTermsConditions = {
          idTermsConditions: termsConditions.idTermsConditions,
          titleTermsConditions: termsConditions.titleTermsConditions,
          textTermsConditions: termsConditions.textTermsConditions
        }
      },
      updateTermsConditions() {
        axios({
          method: 'put',
          url: 'http://localhost:3000/termsConditions/updateTermsConditions',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedTermsConditions
        }).then(result => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare";
          this.textInfoModal = "Actualizarea s-a realizat cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare";
          this.textInfoModal = "A apărut o eroare la acțiunea de actualizare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
       closeEditTermsConditions() {
        this.enabledEditTermsConditions = false;
        this.editedTermsConditions = {
          idTermsConditions: "",
          titleTermsConditions: "",
          textTermsConditions: ""
        }
      },
      okInfoModal() {
        switch(this.actionInfoModal) {
          case "updating":
            this.enabledEditTermsConditions = false;
            break;
        }
      },
    },
    mounted() {
    }
  }
</script>
<style>
 .admin-termsConditions-component {
      padding: 30px;
    }
    .termsConditions-table {
      padding: 0 !important;
    }
    .termsConditions-table th:first-child  {
      width: 5% !important;
    }
    .termsConditions-table th:last-child, .termsConditions-table td:last-child  {
      text-align: center !important;
    }
</style>