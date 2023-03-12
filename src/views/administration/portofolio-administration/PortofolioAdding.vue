<template>
    <div class="admin-portofolio">
         <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin">Adăugare imagine</p>
        <b-row class="row-admin">
            <b-row class="row-admin-form">
              <b-col class="col-form left">
                <label for="image" class="label-form">Imagine portofoliu<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine portofoliu" v-model="addedImage.image"></b-form-textarea>            
              </b-col>
            </b-row>          
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="addImage()">Adăugare imagine</b-button>
                <b-button class="close-admin-button" v-on:click="closeAddImage()">Close</b-button>
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
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
     components: {
      AdminHeader
    },
    data() {
      return {
        addedImage: {
          image: ""
        },
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,
      }
    },
    methods: {
      closeAddImage() {
        this.addedImage = {
          image: "",
        }
        this.$router.push('/administrare/portofoliu/' + this.idUser);

      },
      addImage() {
        axios({
          method: 'post',
          url: 'http://localhost:3000/portofolio/addImage',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.addedImage
        }).then(result => {
          this.addedImage = {
            image: "",
          }
          this.titleInfoModal = "Adăugare imagine";
          this.textInfoModal = "Imaginea a fost adăugată cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.titleInfoModal = "Adăugare imagine";
          this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
    },
    mounted() {
    }
  }
</script>
<style>
 .admin-portofolio {
      padding: 0px !important;
    }
    .images-table {
      padding: 0 !important;
      overflow: overlay;

    }
    .images-table th:first-child  {
      width: 5% !important;
    }
    .images-table th:last-child, .images-table td:last-child  {
      text-align: center !important;
    }
</style>