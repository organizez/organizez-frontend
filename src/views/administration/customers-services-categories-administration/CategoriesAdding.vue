<template>
    <div class="admin-category">
    <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin-component">Adăugare categorie serviciu</p>
        <b-row class="row-form">
          <b-col class="col-form left">
            <label for="categoryName" class="label-form">Denumire Categorie<span class="mandatory-field">*</span>:</label>
            <b-form-input id="categoryName"  class="input-form" placeholder="Categorie" v-model="addedCategory.category"></b-form-input>            
          </b-col>
        </b-row>
        <b-row class="row-form">
         <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
           <label for="image" class="label-form">Imagine portofoliu<span class="mandatory-field">*</span>:</label>
           <b-form-file v-model="file1" :state="Boolean(file1)" @change="deleteImage(file1)" @input="uploadImage()" placeholder="Alegeți o imagine" drop-placeholder="Trageți imaginea aici"></b-form-file>
          </b-col>
        </b-row>
        <b-row class="row-form admin-buttons">
          <b-button class="action-admin-button" v-on:click="addCategory()">Adăugare categorie</b-button>
          <b-button class="close-admin-button" v-on:click="closeAddCategory()">Close</b-button>
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
import { S3 } from "@aws-sdk/client-s3";
import spaceConfig from "../../../../digital-ocean-space-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
    components: {
      AdminHeader
    },
    data() {
      return {
        file1: [],
        addedCategory: {
          category: "",
          categoryImage: ""
        },
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,  
      }
    },
    methods: {
      closeAddCategory(category) {
        this.addedCategory = {
          category: ""
        }
        this.$router.push('/administrare/categorii/' + this.idUser);
      },
      addCategory() {
        axios({
          method: 'post',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/categoriesServices/addCategoriesServices',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.addedCategory
        }).then(result => {
          this.addedCategory = {
            category: "",
            categoryImage: ""
          }
          this.titleInfoModal = "Adăugare categorie";
          this.textInfoModal = "Categoria a fost adăugată cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.titleInfoModal = "Adăugare categorie";
          this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      deleteImage(file) {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: file.name
          };
          const deleteImage = async () => {
            try {
              const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
                return data;
              } catch (err) {
                console.log("Error", err);
              }
            };
          deleteImage();
        }
      },
      uploadImage() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file1 !== null && this.file1 !== undefined) {
        if(this.file1.length !== 0) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file1.name,
            Body: this.file1,
            ACL:'public-read'
          };
          const runImage = async () => {
            try {
              await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                this.addedCategory.categoryImage = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
              });
            } catch (err) {
                this.titleInfoModal = "Încărcare imagine";
                this.textInfoModal = "A apărut o eroare la încărcarea imaginii! Vă rugăm reîncercați";
                this.showInfoModal = true;
            }
          };
          runImage();
        }
        }
      },
    },
    mounted() {
    }
  }
</script>
<style>
    .admin-category {
      padding: 0px;
    }
    .categories-providers-table {
      padding: 0 !important;
      overflow: overlay;
    }
    .categories-providers-table th:last-child, .categories-providers-table td:last-child  {
      text-align: center !important;
    }
</style>