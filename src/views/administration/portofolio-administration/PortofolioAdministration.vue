<template>
    <div class="admin-portofolio-component">
      <b-row class="table-section" v-if="enabledAddImage === false && enabledEditImage === false">
        <p class="title-admin-component">Imagini portofoliu <span class="small-element-title">({{imagesNumber}})</span></p>
        <b-row class="row-admin-component add-button"> 
           <b-button class="initiate-add-button" v-on:click="initiateAddImage()"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare imagine</b-button>
        </b-row>
        <b-row class="row-admin-component">
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
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="editImage(data.item)"/>
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
      <b-row class="add-form-section" v-else-if="enabledAddImage === true && enabledEditImage === false">
        <p class="title-admin-component">Adăugare imagine</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
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
      <b-row class="edit-form-section" v-else-if="enabledEditImage === true && enabledAddImage === false">
        <p class="title-admin-component">Editare imagine</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image" class="label-form">Imagine portofoliu<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine portofoliu" v-model="editedImage.image"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateImage()">Actualizare imagine</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditImage()">Close</b-button>
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
        imagesNumber: "",
        isLoading: true,
        images: [],
        fieldsTable: ['Index', { key: 'image', label: 'Image' }, { key: 'action', label: 'Acțiune'}],
        currentPage: 1,
        perPageImages: 15,
        iteration: 0,
        enabledAddImage: false,
        addedImage: {
          image: ""
        },
        enabledEditImage: false,
        editedImage: {
        idImage: 0,
        image: ""
        },
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
          url: "http://localhost:3000/portofolio/getImagesNumber"
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
          url: "http://localhost:3000/portofolio/getAllImages/" + this.iteration
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
      initiateAddImage() {
        this.enabledAddImage = true;
      },
      closeAddImage() {
        this.enabledAddImage = false;
        this.addedImage = {
          image: "",
        }
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
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare imagine";
          this.textInfoModal = "Imaginea a fost adăugată cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare imagine";
          this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      editImage(image) {
        this.enabledAddImage = false;
        this.enabledEditImage = true;
        this.editedImage = {
          idImage: image.idImage,
          image: image.image,
        }
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
          data: this.editedImage
        }).then(result => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare imagine";
          this.textInfoModal = "Imaginea a fost actualizată cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare imagine";
          this.textInfoModal = "A apărut o eroare la acțiunea de actualizare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
       closeEditImage() {
        this.enabledEditImage = false;
        this.editedImage = {
          idImage: "",
          image: "",
        }
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
          url: 'http://localhost:3000/portofolio/deleteImage/' + this.idDeletedImage,
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
        switch(this.actionInfoModal) {
          case "adding":
            this.enabledAddImage = false;
            this.getImages();
            break;
          case "updating":
            this.enabledEditImage = false;
            this.getImages();
            break;
          case "deleting":
            this.idDeletedImage = 0;
            this.getImages();
            break;
        }
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
 .admin-portofolio-component {
      padding: 30px;
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