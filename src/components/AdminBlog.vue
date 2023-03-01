<template>
   <div class="admin-blog-component">
      <b-row class="table-section" v-if="enabledAddBlog === false && enabledEditBlog === false">
        <p class="title-admin-component">Bloguri <span class="small-element-title">({{blogsNumber}})</span></p>
        <b-row class="row-admin-component add-button"> 
           <b-button class="initiate-add-button" v-on:click="initiateAddBlog()"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare blog</b-button>
        </b-row>
        <b-row class="row-admin-component">
          <b-table bordered striped :fields="fieldsTable" :items="blogs" :busy="isLoading" responsive="sm" class="blogs-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(index)>Index</template>
              <template #head(nameArticle)>Nume articol</template>
              <template #head(dateArticle)>Data publicării</template>
              <template #head(author)>Autor</template>
              <template #head(image)>Imagine</template>
              <template #head(shortDescription)>Descriere scurtă</template>
              <template #head(text)>Text</template>
              <template #head(action)>Acțiune</template>
              <template #cell(index)="data">
                <b>{{ data.index + iteration + 1 }}</b>
              </template>
              <template #cell(nameArticle)="data">
                {{data.item.nameArticle}}
              </template>
              <template #cell(dateArticle)="data">
                {{data.item.dateArticle}}
              </template>
              <template #cell(author)="data">
                {{ data.item.author }}
              </template>
              <template #cell(image)="data">
                <i>{{ data.item.image }}</i>
              </template>
              <template #cell(shortDescription)="data">
                {{ data.item.shortDescription }}
              </template>
              <template #cell(text)="data">
                {{ data.item.text }}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="editBlog(data.item)"/>
                <font-awesome-icon icon="fa-solid fa-trash-can" class="trash-icon" @click="initiateDeleteBlog(data.item.idArticle, data.item.nameArticle)"/>
              </template>
          </b-table>
        </b-row>
        <b-row class="row-admin-component">
          <b-pagination
            v-model="currentPage"
            :total-rows="blogsNumber"
            :per-page="perPageBlogs"
            @input="getBlogs()"
            class="admin-pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row class="add-form-section" v-else-if="enabledAddBlog === true && enabledEditBlog === false">
        <p class="title-admin-component">Adăugare blog</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="nameArticle" class="label-form">Titlu articol<span class="mandatory-field">*</span>:</label>
                <b-form-input id="nameArticle" class="input-form" placeholder="Titlu articol" v-model="addedBlog.nameArticle"></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="author" class="label-form">Autor<span class="mandatory-field">*</span>:</label>
                <b-form-input id="author" class="input-form" placeholder="Autor" v-model="addedBlog.author"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
             <b-col class="col-form left">
                <label for="dateArticle" class="label-form">Dată publicare articol<span class="mandatory-field">*</span>:</label>
                <b-form-input id="dateArticle" class="input-form" type="date" placeholder="Dată publicare eveniment" v-model="addedBlog.dateArticle" ></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="image" class="label-form">Imagine<span class="mandatory-field">*</span>:</label>
                <b-form-input id="image" class="input-form"  placeholder="Imagine" v-model="addedBlog.image"></b-form-input>              
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="shortDescription" class="label-form">Descriere scurtă<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Descriere scurtă" v-model="addedBlog.shortDescription"></b-form-textarea>            
              </b-col>
            </b-row>
              <b-row class="row-form">
              <b-col class="col-form left">
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
      <b-row class="edit-form-section" v-else-if="enabledEditBlog === true && enabledAddBlog === false">
        <p class="title-admin-component">Editare blog</p>
        <b-row class="row-admin-component">
           <b-row class="row-form">
              <b-col class="col-form left">
                <label for="nameArticle" class="label-form">Titlu articol<span class="mandatory-field">*</span>:</label>
                <b-form-input id="nameArticle" class="input-form" placeholder="Titlu articol" v-model="editedBlog.nameArticle"></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="author" class="label-form">Autor<span class="mandatory-field">*</span>:</label>
                <b-form-input id="author" class="input-form" placeholder="Autor" v-model="editedBlog.author"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
             <b-col class="col-form left">
                <label for="dateArticle" class="label-form">Dată publicare articol<span class="mandatory-field">*</span>:</label>
                <b-form-input id="dateArticle" class="input-form" type="date" placeholder="Dată publicare eveniment" v-model="editedBlog.dateArticle" ></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="image" class="label-form">Imagine<span class="mandatory-field">*</span>:</label>
                <b-form-input id="image" class="input-form" tyep="image" placeholder="Imagine" v-model="editedBlog.image"></b-form-input>              
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="shortDescription" class="label-form">Descriere scurtă<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Descriere scurtă" v-model="editedBlog.shortDescription"></b-form-textarea>            
              </b-col>
            </b-row>
              <b-row class="row-form">
              <b-col class="col-form left">
                <label for="text" class="label-form">Text<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Text" v-model="editedBlog.text"></b-form-textarea>            
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="updateBlog()">Actualizare blog</b-button>
                <b-button class="close-admin-button" v-on:click="closeEditBlog()">Close</b-button>
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
        blogsNumber: "",
        isLoading: true,
        blogs: [],
        fieldsTable: ['Index', { key: 'nameArticle', label: 'Name article' }, { key: 'dateArticle', label: 'Date article'}, 
        { key: 'author', label: 'Author'}, { key: 'image', label: 'Image'}, { key: 'shortDescription', label: 'Short description'},
        { key: 'text', label: 'Text'}, { key: 'action', label: 'Acțiune'}],
        currentPage: 1,
        perPageBlogs: 15,
        iteration: 0,
        enabledAddBlog: false,
        addedBlog: {
          nameArticle: "",
          dateArticle: "",
          author: "",
          image: "",
          shortDescription: "",
          text: "",
        },
        enabledEditBlog: false,
        editedBlog: {
          idArticle: 0,
          nameArticle: "",
          dateArticle: "",
          author: "",
          image: "",
          shortDescription: "",
          text: "",
        },
        idDeletedBlog: "",
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
          url: "https://squid-app-q7qzv.ondigitalocean.app/blog/getBlogsNumber"
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
          url: "https://squid-app-q7qzv.ondigitalocean.app/blog/getAllBlogs/" + this.iteration
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
                image: result.data[i].image.substring(0,18) + '...',
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
      initiateAddBlog() {
        this.enabledAddBlog = true;
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
          url: 'https://squid-app-q7qzv.ondigitalocean.app/blog/addBlog',
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
      },
      editBlog(blog) {
        this.enabledAddBlog = false;
        this.enabledEditBlog = true;
        this.editedBlog = {
          idArticle: blog.idArticle,
          nameArticle: blog.nameArticle,
          dateArticle: blog.dateArticle,
          author: blog.author,
          image: blog.image,
          shortDescription: blog.shortDescription,
          text: blog.text,
        }
      },
      updateBlog() {
        axios({
          method: 'put',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/blog/updateBlog',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedBlog
        }).then(result => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare blog";
          this.textInfoModal = "Blogul a fost actualizat cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare blog";
          this.textInfoModal = "A apărut o eroare la acțiunea de actualizare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      closeEditBlog() {
        this.enabledEditBlog = false;
        this.editedBlog = {
              idArticle: "",
              nameArticle: "",
              dateArticle: "",
              author: "",
              image: "",
              shortDescription: "",
              text: "",
        }
      },
      initiateDeleteBlog(idArticle, nameArticle) {
        this.titleConfirmationModal = "Confirmare ștergere blog"
        this.textConfirmationModal = "Sigur doriți să ștergeți blogul " + nameArticle + "?";
        this.showConfirmationModal = true;
        this.idDeletedBlog = idArticle;
      },
      deleteBlog() {
        axios({
          method: 'delete',
          url: 'https://squid-app-q7qzv.ondigitalocean.app/blog/deleteBlog/' + this.idDeletedBlog,
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
        }).then(result => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere blog";
          this.textInfoModal = "Blogul a fost șters cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere blog";
          this.textInfoModal = "A apărut o eroare la acțiunea de ștergere! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      okInfoModal() {
        switch(this.actionInfoModal) {
          case "adding":
            this.enabledAddBlog = false;
            this.getBlogs();
            break;
          case "updating":
            this.enabledEditBlog = false;
            this.getBlogs();
            break;
          case "deleting":
            this.idDeletedBlog = 0;
            this.getBlogs();
            break;
        }
      },
      okConfirmationModal() {
        this.deleteBlog();
      }
    },
    mounted() {
      this.getBlogsNumber();
    }
  }
</script>
<style>
 .admin-blog-component {
      padding: 30px;
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