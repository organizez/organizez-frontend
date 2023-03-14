<template>
   <div class="admin-blog">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="edit-form-section">
        <p class="title-admin">Editare blog</p>
        <b-row class="row-admin">
            <b-overlay :show="isLoading" rounded="sm" class="blog-administration-spinner" spinner-type="grow">
                <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                    <label for="nameArticle" class="label-form">Titlu articol<span class="mandatory-field">*</span>:</label>
                    <b-form-input id="nameArticle" class="input-admin-form" placeholder="Titlu articol" v-model="blogArticle.nameArticle"></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                    <label for="author" class="label-form">Autor<span class="mandatory-field">*</span>:</label>
                    <b-form-input id="author" class="input-admin-form" placeholder="Autor" v-model="blogArticle.author"></b-form-input>
                </b-col>
                </b-row>
                <b-row class="row-admin-form">
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                    <label for="dateArticle" class="label-form">Dată publicare articol<span class="mandatory-field">*</span>:</label>
                    <b-form-input id="dateArticle" class="input-admin-form" type="date" placeholder="Dată publicare eveniment" v-model="blogArticle.dateArticle" ></b-form-input>
                </b-col>
                <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                    <label for="image" class="label-form">Imagine<span class="mandatory-field">*</span>:</label>
                    <b-form-file v-model="file1" :state="Boolean(file1)" @change="deleteImage(file1)" @input="uploadImage()" placeholder="Alegeți o imagine" drop-placeholder="Trageți imaginea aici"></b-form-file>
                </b-col>
                </b-row>
                <b-row class="row-admin-form">
                    <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                        <label for="shortDescription" class="label-form">Descriere scurtă<span class="mandatory-field">*</span>:</label>
                        <b-form-textarea id="textarea-form" rows="8" class="input-admin-form" placeholder="Descriere scurtă" v-model="blogArticle.shortDescription"></b-form-textarea>            
                    </b-col>
                    <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                        <label for="text" class="label-form">Text<span class="mandatory-field">*</span>:</label>
                        <b-form-textarea id="textarea-form" rows="8" class="input-admin-form" placeholder="Text" v-model="blogArticle.text"></b-form-textarea>            
                    </b-col>
                </b-row>
                <b-row class="row-admin-form admin-buttons">
                    <b-button class="action-admin-button" v-on:click="updateBlog()">Actualizare blog</b-button>
                    <b-button class="close-admin-button" v-on:click="closeEditBlog()">Close</b-button>
                </b-row>
            </b-overlay>
        </b-row>
      </b-row>
      <b-row>
        <b-modal id="admin-info-modal" v-model="showInfoModal" :title="titleInfoModal" ok-only>
          <p>{{textInfoModal}}</p>
        </b-modal>
      </b-row>
  </div>
</template>
<script>
import { S3 } from "@aws-sdk/client-s3";
import { CreateBucketCommand } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import spaceConfig from "../../../../digital-ocean-space-config";
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
        idBlogArticle: "",
        isLoading: true,
        blogArticle: {
            idArticle: 0,
            nameArticle: "",
            dateArticle: "",
            author: "",
            image: "",
            shortDescription: "",
            text: ""
        },
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,
        file: []
      }
    },
    methods: {
        getParams() {
            this.idUser = this.$route.params.idUser;
            this.idBlogArticle = this.$route.params.idBlogArticle;
            this.getBlogArticle();
        },
        getBlogArticle() {
            let thisRef = this;
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "http://localhost:3000/blog/getBlogArticleById/" + this.idBlogArticle
            }).then(result => {
                this.blogArticle = {
                    idArticle: result.data.id_article,
                    nameArticle: result.data.name_article,
                    dateArticle: result.data.date_article,
                    author: result.data.author,
                    image: result.data.image,
                    shortDescription: result.data.short_description,
                    text: result.data.text,
                }
                setTimeout(function() {
                    thisRef.isLoading = false;
                }, 1000);
            })
        },
        updateBlog() {
            axios({
                method: 'put',
                url: 'http://localhost:3000/blog/updateBlog',
                mode: 'no-cors',
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
                contentType: "application/json;odata=verbose",
                data: this.blogArticle
            }).then(result => {
                this.titleInfoModal = "Actualizare blog";
                this.textInfoModal = "Blogul a fost actualizat cu succes!";
                this.showInfoModal = true;
            }).catch(error => {
                this.titleInfoModal = "Actualizare blog";
                this.textInfoModal = "A apărut o eroare la acțiunea de actualizare! Vă rugăm reîncercați";
                this.showInfoModal = true;
            })
        },
        closeEditBlog() {
            this.$router.push('/administrare/blog/' + this.idUser);
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
                this.blogArticle.image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
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
        console.log(spaceConfig.spaceConfig)
      this.getParams();
    }
  }
</script>
<style>
    .admin-blog {
      padding: 0px;
    }
    .blogs-table {
      padding: 0 !important;
      overflow: overlay;
    }
    .blogs-table th:first-child  {
      width: 5% !important;
    }
    .blogs-table th:last-child, .blogs-table td:last-child  {
      text-align: center !important;
    }
    .blog-administration-spinner {
        display: flex;
        flex-direction: column;
        padding: 0px !important;
        row-gap: 25px;
    }
</style>