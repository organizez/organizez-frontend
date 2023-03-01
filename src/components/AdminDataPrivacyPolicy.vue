<template>
    <div class="admin-dataPrivacyPolicy-component">
      <b-row class="table-section" v-if="enabledEditDataPrivacyPolicy === false">
        <p class="title-admin-component">Politică de confidențialitate a datelor</p>
        <b-row class="row-admin-component">
          <b-table bordered striped :fields="fieldsTable" :items="dataPrivacyPolicies" :busy="isLoading" responsive="sm" class="dataPrivacyPolicy-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(titleDataPrivacyPolicy)>Titlu</template>
              <template #head(textDataPrivacyPolicy)>Text</template>
              <template #head(action)>Acțiune</template>
             <template #cell(titleDataPrivacyPolicy)="data">
                {{data.item.titleDataPrivacyPolicy}}
              </template>
             <template #cell(textDataPrivacyPolicy)="data">
                {{data.item.textDataPrivacyPolicy}}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="editDataPrivacyPolicy(data.item)"/>
              </template>
          </b-table>
        </b-row>
         <b-row class="row-admin-component">
          <b-pagination
            @input="getDataPrivacyPolicy()"
            class="admin-pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row class="edit-form-section" v-else-if="enabledEditDataPrivacyPolicy === true">
        <p class="title-admin-component">Editare</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="titleDataPrivacyPolicy" class="label-form">Titlu<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Titlu" v-model="editedDataPrivacyPolicy.titleDataPrivacyPolicy"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="textDataPrivacyPolicy" class="label-form">Text<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Text" v-model="editedDataPrivacyPolicy.textDataPrivacyPolicy"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateDataPrivacyPolicy()">Actualizare</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditDataPrivacyPolicy()">Close</b-button>
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
        dataPrivacyPolicies: [],
        isLoading: true,
        fieldsTable: [{ key: 'titleDataPrivacyPolicy', label: 'Title' }, { key: 'textDataPrivacyPolicy', label: 'Text' }, { key: 'action', label: 'Acțiune'}],
        enabledEditDataPrivacyPolicy: false,
        editedDataPrivacyPolicy: {
        idDataPrivacyPolicy: 0,
        titleDataPrivacyPolicy: "",
        textDataPrivacyPolicy: ""
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
      getDataPrivacyPolicy() {
        let thisRef = this;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.dataPrivacyPolicies = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/dataPrivacyPolicy/getDataPrivacyPolicy"
        }).then(result => {
          if(result.data.length > 0) {
            let dataPrivacyPolicy = {
              idDataPrivacyPolicy: 0,
              titleDataPrivacyPolicy: "",
              textDataPrivacyPolicy: "",
            }
            dataPrivacyPolicy = {
                idDataPrivacyPolicy: result.data[0].id_data_privacy_policy,
                titleDataPrivacyPolicy: result.data[0].title_data_privacy_policy,
                textDataPrivacyPolicy: result.data[0].text_data_privacy_policy
                }
        this.dataPrivacyPolicies.push(dataPrivacyPolicy);
        }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        )
      },
      editDataPrivacyPolicy(dataPrivacyPolicy) {
        this.enabledEditDataPrivacyPolicy = true;
        this.editedDataPrivacyPolicy = {
          idDataPrivacyPolicy: dataPrivacyPolicy.idDataPrivacyPolicy,
          titleDataPrivacyPolicy: dataPrivacyPolicy.titleDataPrivacyPolicy,
          textDataPrivacyPolicy: dataPrivacyPolicy.textDataPrivacyPolicy
        }
      },
      updateDataPrivacyPolicy() {
        axios({
          method: 'put',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/dataPrivacyPolicy/updateDataPrivacyPolicy',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedDataPrivacyPolicy
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
       closeEditDataPrivacyPolicy() {
        this.enabledEditDataPrivacyPolicy = false;
        this.editedDataPrivacyPolicy = {
          idDataPrivacyPolicy: "",
          titleDataPrivacyPolicy: "",
          textDataPrivacyPolicy: ""
        }
      },
      okInfoModal() {
        switch(this.actionInfoModal) {
          case "updating":
            this.enabledEditDataPrivacyPolicy = false;
            break;
        }
      },
    },
    mounted() {
    }
  }
</script>
<style>
 .admin-dataPrivacyPolicy-component {
      padding: 30px;
    }
    .dataPrivacyPolicy-table {
      padding: 0 !important;
    }
    .dataPrivacyPolicy-table th:first-child  {
      width: 5% !important;
    }
    .dataPrivacyPolicy-table th:last-child, .dataPrivacyPolicy-table td:last-child  {
      text-align: center !important;
    }
</style>