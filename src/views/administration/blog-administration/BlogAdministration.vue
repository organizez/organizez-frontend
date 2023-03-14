<template>
   <div class="admin-blog">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="table-section">
        <p class="title-admin">Bloguri <span class="small-element-title">({{blogsNumber}})</span></p>
        <b-row class="row-admin add-button"> 
           <b-button class="initiate-add-button" v-on:click="redirectToPage('/administrare/adaugare-blog/' + $route.params.idUser)"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare blog</b-button>
        </b-row>
        <b-row class="row-admin">
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
                {{ data.item.author}}
              </template>
              <template #cell(image)="data">
                <i>{{ data.item.image.substring(0,18) + '...' }}</i>
              </template>
              <template #cell(shortDescription)="data">
                {{ data.item.shortDescription.substring(0,50) + '...'}}
              </template>
              <template #cell(text)="data">
                {{ data.item.text.substring(0,100) + '...'}}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon"  @click="redirectToPage('/administrare/editare-blog/' + data.item.idArticle + '/' + $route.params.idUser)"/>
                <font-awesome-icon icon="fa-solid fa-trash-can" class="trash-icon" @click="initiateDeleteBlog(data.item.idArticle, data.item.nameArticle)"/>
              </template>
          </b-table>
        </b-row>
        <b-row class="row-admin">
          <b-pagination
            v-model="currentPage"
            :total-rows="blogsNumber"
            :per-page="perPageBlogs"
            @input="getBlogs()"
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
        blogsNumber: "",
        isLoading: true,
        blogs: [],
        fieldsTable: ['Index', { key: 'nameArticle', label: 'Name article' }, { key: 'dateArticle', label: 'Date article'}, 
        { key: 'author', label: 'Author'}, { key: 'image', label: 'Image'}, { key: 'shortDescription', label: 'Short description'},
        { key: 'text', label: 'Text'}, { key: 'action', label: 'Acțiune'}],
        currentPage: 1,
        perPageBlogs: 15,
        iteration: 0,
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
            url: "https://squid-app-q7qzv.ondigitalocean.app/be/blog/getBlogsNumber"
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
          url: "https://squid-app-q7qzv.ondigitalocean.app/be/blog/getAllBlogs/" + this.iteration
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
      redirectToPage(path) {
        this.$router.push(path);
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
          url: 'https://squid-app-q7qzv.ondigitalocean.app/be/blog/deleteBlog/' + this.idDeletedBlog,
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
        }).then(result => {
          this.titleInfoModal = "Ștergere blog";
          this.textInfoModal = "Blogul a fost șters cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.titleInfoModal = "Ștergere blog";
          this.textInfoModal = "A apărut o eroare la acțiunea de ștergere! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      okConfirmationModal() {
        this.deleteBlog();
      },
      okInfoModal() {
        this.idDeletedBlog = 0;
         this.getBlogs();
      }
    },
    mounted() {
      this.getBlogsNumber();
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