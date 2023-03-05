<template>
    <div class="admin-aboutUs-component">
      <b-row class="table-section" v-if="enabledEditAboutUs === false">
        <p class="title-admin-component">Despre noi</p>
        <b-row class="row-admin-component">
          <b-table bordered striped :fields="fieldsTable" :items="aboutUs" :busy="isLoading" responsive="sm" class="aboutUs-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(titleAboutUs)>Titlu</template>
              <template #head(textAboutUs)>Text</template>
              <template #head(imageAboutUs)>Imagine</template>
              <template #head(action)>Acțiune</template>
             <template #cell(titleAboutUs)="data">
                {{data.item.titleAboutUs}}
              </template>
               <template #cell(textAboutUs)="data">
                {{data.item.textAboutUs}}
              </template>
              <template #cell(imageAboutUs)="data">
                {{data.item.imageAboutUs}}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="editAboutUs(data.item)"/>
              </template>
          </b-table>
        </b-row>
         <b-row class="row-admin-component">
          <b-pagination
            @input="getAboutUs()"
            class="admin-pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row class="edit-form-section" v-else-if="enabledEditAboutUs === true">
        <p class="title-admin-component">Editare</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="titleAboutUs" class="label-form">Titlu<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Titlu" v-model="editedAboutUs.titleAboutUs"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="textAboutUs" class="label-form">Text<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Text" v-model="editedAboutUs.textAboutUs"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="imageAboutUs" class="label-form">Imagine:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine" v-model="editedAboutUs.imageAboutUs"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateAboutUs()">Actualizare</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditAboutUs()">Close</b-button>
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
        aboutUs: [],
        isLoading: true,
        fieldsTable: [{ key: 'titleAboutUs', label: 'Title' }, { key: 'textAboutUs', label: 'Text' }, { key: 'imageAboutUs', label: 'Image' }, { key: 'action', label: 'Acțiune'}],
        enabledEditAboutUs: false,
        editedAboutUs: {
        idAboutUs: 0,
        titleAboutUs: "",
        textAboutUs: "",
        imageAboutUs: ""
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
      getAboutUs() {
        let thisRef = this;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.aboutUs = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/aboutUs/getAboutUs"
        }).then(result => {
          if(result.data.length > 0) {
            let ab = {
              idAboutUs: 0,
              titleAboutUs: "",
              textAboutUs: "",
              imageAboutUs: ""
            }
           
                ab = {
                    idAboutUs: result.data[0].id_about_us,
                    titleAboutUs: result.data[0].title_about_us,
                    textAboutUs: result.data[0].text_about_us,
                    imageAboutUs: result.data[0].image_about_us.substring(0,55) + "...",
                }
        this.aboutUs.push(ab);
        }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        )
      },
      editAboutUs(aboutUs) {
        this.enabledEditAboutUs = true;
        this.editedAboutUs = {
          idAboutUs: aboutUs.idAboutUs,
          titleAboutUs: aboutUs.titleAboutUs,
          textAboutUs: aboutUs.textAboutUs,
          imageAboutUs: aboutUs.imageAboutUs,
        }
      },
      updateAboutUs() {
        axios({
          method: 'put',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/aboutUs/updateAboutUs',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedAboutUs
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
       closeEditAboutUs() {
        this.enabledEditAboutUs = false;
        this.editedAboutUs = {
          idAboutUs: "",
          titleAboutUs: "",
          textAboutUs: "",
          imageAboutUs: "",
        }
      },
      okInfoModal() {
        switch(this.actionInfoModal) {
          case "updating":
            this.enabledEditAboutUs = false;
            break;
        }
      },
    },
    mounted() {
    }
  }
</script>
<style>
 .admin-aboutUs-component {
      padding: 30px;
    }
    .aboutUs-table {
      padding: 0 !important;
    }
    .aboutUs-table th:first-child  {
      width: 5% !important;
    }
    .aboutUs-table th:last-child, .aboutUs-table td:last-child  {
      text-align: center !important;
    }
</style>