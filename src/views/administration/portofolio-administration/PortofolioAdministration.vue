<template>
    <div class="admin-portofolio">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="table-section">
        <p class="title-admin">Imagini portofoliu <span class="small-element-title">({{imagesNumber}})</span></p>
        <b-row class="row-admin add-button"> 
           <b-button class="initiate-add-button" v-on:click="redirectToPage('/administrare/adaugare-portofoliu/' + $route.params.idUser)"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare imagine</b-button>
        </b-row>
        <b-row class="row-admin">
          <b-table bordered striped :fields="fieldsTable" :items="images" :busy="isLoading" responsive="sm" class="images-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(index)>Index</template>
              <template #head(company)>Image</template>
              <template #head(action)>Acțiune</template>
              <template #cell(index)="data">
                <b>{{ data.index + iteration + 1 }}</b>
              </template>
              <template #cell(image)="data">
                {{data.item.image}}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="redirectToPage('/administrare/editare-portofoliu/' + data.item.idImage + '/' + $route.params.idUser)"/>
                <font-awesome-icon icon="fa-solid fa-trash-can" class="trash-icon" @click="initiateDeleteImage(data.item.idImage, data.item.image)"/>
              </template>
          </b-table>
        </b-row>
         <b-row class="row-admin-component">
          <b-pagination
            v-model="currentPage"
            :total-rows="imagesNumber"
            :per-page="perPageImages"
            @input="getImages()"
            class="admin-pagination-table"
          ></b-pagination>
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
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
  components: {
      AdminHeader
    },
    data() {
      return {
        imagesNumber: "",
        isLoading: true,
        images: [],
        fieldsTable: ['Index', { key: 'image', label: 'Image' }, { key: 'action', label: 'Acțiune'}],
        currentPage: 1,
        perPageImages: 15,
        iteration: 0,
        idDeletedImage: "",
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
      getImagesNumber() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/portofolio/getImagesNumber"
        }).then(result => {
          this.imagesNumber = result.data[0].images_number;
          this.getImages();
        })
      },
      getImages() {
        let thisRef = this;
        this.iteration = (this.currentPage - 1) * this.perPageImages;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.images = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/portofolio/getAllImages/" + this.iteration
        }).then(result => {
          if(result.data.length > 0) {
            let image = {
              idImage: 0,
              image: "",
            }
            for(var i = 0; i < result.data.length; i++) {
              image = {
                idImage: result.data[i].id_image,
                image: result.data[i].image,
              } 
              this.images.push(image);                   
            }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        })
      },
       redirectToPage(path) {
        this.$router.push(path);
      },
      initiateDeleteImage(idImage, image) {
        this.titleConfirmationModal = "Confirmare ștergere imagine"
        this.textConfirmationModal = "Sigur doriți să ștergeți imaginea  " + image + "?";
        this.showConfirmationModal = true;
        this.idDeletedImage = idImage;
      },
      deleteImage() {
        axios({
          method: 'delete',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/portofolio/deleteImage/' + this.idDeletedImage,
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
        }).then(result => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere imagine";
          this.textInfoModal = "Imaginea a fost ștearsă cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere imagine";
          this.textInfoModal = "A apărut o eroare la acțiunea de ștergere! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      okInfoModal() {
            this.idDeletedImage = 0;
            this.getImages();
        },
      
      okConfirmationModal() {
        this.deleteImage();
      }
    },
    mounted() {
      this.getImagesNumber();
    }
  }
</script>
<style>
 .admin-portofolio {
      padding: 0px;
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