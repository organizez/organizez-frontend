<template>
   <div class="admin-blog">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin">Adăugare blog</p>
        <b-row class="row-admin">
            <b-row class="row-form">
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="nameArticle" class="label-form">Titlu articol<span class="mandatory-field">*</span>:</label>
                <b-form-input id="nameArticle" class="input-form" placeholder="Titlu articol" v-model="addedBlog.nameArticle"></b-form-input>
              </b-col>
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="author" class="label-form">Autor<span class="mandatory-field">*</span>:</label>
                <b-form-input id="author" class="input-form" placeholder="Autor" v-model="addedBlog.author"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
             <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="dateArticle" class="label-form">Dată publicare articol<span class="mandatory-field">*</span>:</label>
                <b-form-input id="dateArticle" class="input-form" type="date" placeholder="Dată publicare eveniment" v-model="addedBlog.dateArticle" ></b-form-input>
              </b-col>
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="image" class="label-form">Imagine<span class="mandatory-field">*</span>:</label>
                <b-form-input id="image" class="input-form"  placeholder="Imagine" v-model="addedBlog.image"></b-form-input>              
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="shortDescription" class="label-form">Descriere scurtă<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Descriere scurtă" v-model="addedBlog.shortDescription"></b-form-textarea>            
              </b-col>
            </b-row>
              <b-row class="row-form">
              <b-col class="col-form left" sm="12" md="12" lg="6" xl="6">
                <label for="text" class="label-form">Text<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Text" v-model="addedBlog.text"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="addBlog()">Adăugare blog</b-button>
                <b-button class="close-admin-button" v-on:click="closeAddBlog()">Close</b-button>
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
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
    components: {
      AdminHeader
    },
    data() {
      return {
        isLoading: true,
        addedBlog: {
          nameArticle: "",
          dateArticle: "",
          author: "",
          image: "",
          shortDescription: "",
          text: "",
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
        getBlogsNumber() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/blog/getBlogsNumber"
        }).then(result => {
          this.blogsNumber = result.data[0].blogs_number;
          this.getBlogs();
        })
      },
      getBlogs() {
        let thisRef = this;
        this.iteration = (this.currentPage - 1) * this.perPageBlogs;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.blogs = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/blog/getAllBlogs/" + this.iteration
        }).then(result => {
          if(result.data.length > 0) {
            let blog = {
              idArticle: 0,
              nameArticle: "",
              dateArticle: "",
              author: "",
              image: "",
              shortDescription: "",
              text: "",
            }
            for(var i = 0; i < result.data.length; i++) {
              blog = {
                idArticle: result.data[i].id_article,
                nameArticle: result.data[i].name_article,
                dateArticle: result.data[i].date_article.substring(0,10),
                author: result.data[i].author,
                image: result.data[i].image,
                shortDescription: result.data[i].short_description,
                text: result.data[i].text,
              } 
              this.blogs.push(blog);                   
            }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        })
      },
      closeAddBlog() {
        this.enabledAddBlog = false;
        this.addedBlog = {
              nameArticle: "",
              dateArticle: "",
              author: "",
              image: "",
              shortDescription: "",
              text: "",
        }
      },
      addBlog() {
        axios({
          method: 'post',
          url: 'http://localhost:3000/blog/addBlog',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.addedBlog
        }).then(result => {
          this.addedBlog = {
              nameArticle: "",
              dateArticle: "",
              author: "",
              image: "",
              shortDescription: "",
              text: "",
          }
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare blog";
          this.textInfoModal = "Blogul a fost adăugat cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare blog";
          this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      }
    },
    mounted() {
      
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
</style>