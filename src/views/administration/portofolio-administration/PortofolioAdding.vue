<template>
    <div class="admin-portofolio">
         <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin">Adăugare imagine</p>
        <b-row class="row-admin">
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="image" class="label-form">Imagine portofoliu<span class="mandatory-field">*</span>:</label>
                <b-form-file v-model="file1" :state="Boolean(file1)" @change="deleteImage(file1)" @input="uploadImage()" placeholder="Alegeți o imagine" drop-placeholder="Trageți imaginea aici"></b-form-file>
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
        addedImage: {
          image: ""
        },
        file1: [],
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
          console.log(result);
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
                this.addedImage.image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
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