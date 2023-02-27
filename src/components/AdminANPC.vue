<template>
    <div class="admin-anpc-component">
      <b-row class="table-section" v-if="enabledEditAnpc === false">
        <p class="title-admin-component">ANPC</p>
        <b-row class="row-admin-component">
          <b-table bordered striped :fields="fieldsTable" :items="anpc" :busy="isLoading" responsive="sm" class="anpc-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(titleAnpc)>Titlu</template>
              <template #head(textAnpc)>Text</template>
              <template #head(action)>Acțiune</template>
             <template #cell(titleAnpc)="data">
                {{data.item.titleAnpc}}
              </template>
             <template #cell(textAnpc)="data">
                {{data.item.textAnpc}}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="editAnpc(data.item)"/>
              </template>
          </b-table>
        </b-row>
         <b-row class="row-admin-component">
          <b-pagination
            @input="getAnpc()"
            class="pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row class="edit-form-section" v-else-if="enabledEditAnpc === true">
        <p class="title-admin-component">Editare</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="titleAnpc" class="label-form">Titlu<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Titlu" v-model="editedAnpc.titleAnpc"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="textAnpc" class="label-form">Text<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Text" v-model="editedAnpc.textAnpc"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateAnpc()">Actualizare</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditAnpc()">Close</b-button>
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
        anpc: [],
        isLoading: true,
        fieldsTable: [{ key: 'titleAnpc', label: 'Title' }, { key: 'textAnpc', label: 'Text' }, { key: 'action', label: 'Acțiune'}],
        enabledEditAnpc: false,
        editedAnpc: {
        idAnpc: 0,
        titleAnpc: "",
        textAnpc: ""
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
      getAnpc() {
        let thisRef = this;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.anpc = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/anpc/getAnpc"
        }).then(result => {
          if(result.data.length > 0) {
            let item = {
              idAnpc: 0,
              titleAnpc: "",
              textAnpc: "",
            }
            item = {
                idAnpc: result.data[0].id_anpc,
                titleAnpc: result.data[0].title_anpc,
                textAnpc: result.data[0].text_anpc
                }
        this.anpc.push(item);
        }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        )
      },
      editAnpc(anpc) {
        this.enabledEditAnpc = true;
        this.editedAnpc = {
          idAnpc: anpc.idAnpc,
          titleAnpc: anpc.titleAnpc,
          textAnpc: anpc.textAnpc
        }
      },
      updateAnpc() {
        axios({
          method: 'put',
          url: 'http://localhost:3000/anpc/updateAnpc',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedAnpc
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
       closeEditAnpc() {
        this.enabledEditAnpc = false;
        this.editedAnpc = {
          idAnpc: "",
          titleAnpc: "",
          textAnpc: ""
        }
      },
      okInfoModal() {
        switch(this.actionInfoModal) {
          case "updating":
            this.enabledEditAnpc = false;
            break;
        }
      },
    },
    mounted() {
    }
  }
</script>
<style>
 .admin-anpc-component {
      padding: 30px;
    }
    .anpc-table {
      padding: 0 !important;
    }
    .anpc-table th:first-child  {
      width: 5% !important;
    }
    .anpc-table th:last-child, .anpc-table td:last-child  {
      text-align: center !important;
    }
</style>