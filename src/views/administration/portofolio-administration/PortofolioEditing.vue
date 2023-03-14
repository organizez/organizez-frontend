<template>
    <div class="admin-portofolio">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="edit-form-section">
        <p class="title-admin">Editare imagine</p>
        <b-row class="row-admin">
        <b-overlay :show="isLoading" rounded="sm" class="portofolio-administration-spinner" spinner-type="grow">
        <b-row class="row-admin">
            <b-row class="row-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="image" class="label-form">Imagine portofoliu<span class="mandatory-field">*</span>:</label>
                <b-form-file v-model="file1" :state="Boolean(file1)" @change="deleteImage(file1)" @input="uploadImage()" placeholder="Alegeți o imagine" drop-placeholder="Trageți imaginea aici"></b-form-file>
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
        idUser: "",
        idImage: "",
        isLoading: true,
        perPageImages: 15,
        portofolioImage: {
          idImage: 0,
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
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/portofolio/getImageById/" + this.idImage
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
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/portofolio/updateImage',
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
                this.portofolioImage.image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
              });
            } catch (err) {
                this.titleInfoModal = "Încărcare imagine";
                this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                this.showInfoModal = true;
            }
          };
          runImage();
        }
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