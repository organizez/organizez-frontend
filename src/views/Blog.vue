<template>
    <div class="blog-page">
        <Main-Header></Main-Header>
        <div class="blog-container">
            <b-row class="row-blog header">
                <p class="title-blog">BLOG</p>
            </b-row>
            <b-row class="row-blog container">
                <b-row class="row-blog-article">
                    <b-col sm="12" md="12" lg="12" xl="5">

                    </b-col>
                    <b-col sm="12" md="12" lg="12" xl="7">

                    </b-col>
                </b-row>
                <b-row class="row-blog-article">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="blogArticlesNumber"
                        :per-page="perPageBlogArticles"
                        @input="getBlogArticles()"
                        class="pagination-table"
                    ></b-pagination>
                </b-row>
            </b-row>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import MainHeader from "../components/MainHeader.vue";
import Footer from "../components/Footer.vue";
import axios from 'axios';
// import $ from "jquery";
 export default {
    components: {
        MainHeader,
        Footer
    },
    data() {
      return {
        isLoading: false,
        blogArticlesNumber: 0,
        blogArticles: [],
        currentPage: 1,
        perPageBlogArticles: 5,
        iteration: 0,  
      }
    },
    methods: {
      getBlogArticlesNumber() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/blog/getBlogArticlesNumber"
        }).then(result => {
          this.blogArticlesNumber = result.data[0].blog_articles_number;
          this.getBlogArticles();
        })
      },
      getBlogArticles() {
        let thisRef = this;
        this.iteration = (this.currentPage - 1) * this.perPageBlogArticles;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.blogArticles = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/blog/getAllBlogArticles/" + this.iteration
        }).then(result => {
            if(result.data.length > 0) {
                let blogArticle = {
                    idBlogArticle: 0,
                    nameArticle: "",
                    dateArticle: new Date(),
                    author: "",
                    image: "",
                    shortDescription: ""
                }
                for(var i = 0; i < result.data.length; i++) {
                    blogArticle = {
                        idBlogArticle: result.data[i].id_article,
                        nameArticle: result.data[i].name_article,
                        dateArticle: result.data[i].date_article,
                        author: result.data[i].author,
                        image: result.data[i].image,
                        shortDescription: result.data[i].short_description
                    } 
                    this.blogArticles.push(blogArticle);                   
                }
                setTimeout(function() {
                    thisRef.isLoading = false;
                }, 1000);
            }
        })
      },
    },
    mounted() {
       
    },
  }
</script>
<style>
    .blog-container {
        width: 100%;
        margin: auto;;
    }
    .row-blog.header {
        background-color: rgb(163, 177, 138, 0.2);
        padding: 30px !important;
        margin: 0 0 60px 0 !important;
    }
    .title-blog {
        color: #9c876e;
        line-height: 2;
        letter-spacing: 0.15em;
        font-size: 20px;
        text-align: center;
        font-family: 'Nord Book';
        font-weight: 500;
        margin-bottom: 0px !important;
    }
</style>