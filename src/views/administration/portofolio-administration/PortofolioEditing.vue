<template>
    <div class="admin-portofolio">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="edit-form-section">
        <p class="title-admin">Editare imagine</p>
        <b-row class="row-admin">
        <b-overlay :show="isLoading" rounded="sm" class="portofolio-administration-spinner" spinner-type="grow">
        <b-row class="row-admin">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image" class="label-form">Imagine portofoliu<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine portofoliu" v-model="portofolioImage.image"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateImage()">Actualizare imagine</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditImage()">Close</b-button>
            </b-row>
           </b-row>
          </b-overlay>
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
        idUser: "",
        idImage: "",
        isLoading: true,
        perPageImages: 15,
        portofolioImage: {
          idImage: 0,
          image: ""
        },
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,
      }
    },
    methods: {
     getParams() {
            this.idUser = this.$route.params.idUser;
            this.idImage = this.$route.params.idImage;
            this.getImage();
        },
      getImage() {
        let thisRef = this;
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/portofolio/getImageById/" + this.idImage
        }).then(result => {
           this.portofolioImage = {
              idImage: result.data.id_image,
              image: result.data.image
           }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
        })
      },
      updateImage() {
        axios({
          method: 'put',
          url: 'http://localhost:3000/portofolio/updateImage',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.portofolioImage
        }).then(result => {
          this.titleInfoModal = "Actualizare imagine";
          this.textInfoModal = "Imaginea a fost actualizată cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.titleInfoModal = "Actualizare imagine";
          this.textInfoModal = "A apărut o eroare la acțiunea de actualizare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
       closeEditImage() {
       this.$router.push('/administrare/portofoliu/' + this.idUser);
      },
    },
    mounted() {
      this.getParams();    }
  }
</script>
<style>
 .admin-portofolio {
      padding: 0px;
    }
    .images-table {
      padding: 0 !important;
    }
    .images-table th:first-child  {
      width: 5% !important;
    }
    .images-table th:last-child, .images-table td:last-child  {
      text-align: center !important;
    }
</style>