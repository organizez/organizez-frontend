<template>
    <div class="blog-page">
        <Unauthenticated-User-Header v-if="this.$route.params.idUser === undefined || this.$route.params.idUser === ''"></Unauthenticated-User-Header>
        <Authenticated-User-Header v-else :idUser="this.$route.params.idUser"></Authenticated-User-Header>
        <div class="blog-container">
            <b-row class="row-blog header">
                <p class="title-blog">BLOG</p>
            </b-row>
            <b-row class="row-blog-articles container">
                <b-row class="row-blog-article" v-for="blogArticle in blogArticles" :key="blogArticle.idBlogArticle">
                    <b-col class="col-article" sm="12" md="5" lg="5" xl="4">
                        <b-img-lazy v-bind="propsImage" :src="blogArticle.image" fluid alt="image" class="image-blog"></b-img-lazy>
                    </b-col>
                    <b-col class="col-article large" sm="12" md="7" lg="7" xl="8">
                        <p class="blog-article-date"><i>{{blogArticle.dateArticle}}</i></p>
                        <p class="blog-article-name">{{blogArticle.nameArticle}}</p>
                        <p class="blog-article-shortDescription">{{blogArticle.shortDescription}}</p>
                        <b-button class="view-article-button second-button" @click="redirectToBlogArticle(blogArticle.idBlogArticle)">Citește articolul <font-awesome-icon icon="fa-solid fa-angle-right" class="angle-right-icon"/></b-button>
                    </b-col>
                </b-row>
                <b-row class="row-blog-article pagination">
                    <b-pagination
                        v-model="currentPage"
                        :total-rows="blogArticlesNumber"
                        :per-page="perPageBlogArticles"
                        @input="getBlogArticles()"
                        class="site-pagination-table"
                    ></b-pagination>
                </b-row>
            </b-row>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import UnauthenticatedUserHeader from "../components/UnauthenticatedUserHeader.vue";
import AuthenticatedUserHeader from '../components/AuthenticatedUserHeader.vue';
import Footer from "../components/Footer.vue";
import axios from 'axios';
import moment from 'moment';
import $ from "jquery";
 export default {
    components: {
        UnauthenticatedUserHeader,
        AuthenticatedUserHeader,
        Footer
    },
    data() {
        return {
            idUser: "",
            isLoading: false,
            blogArticlesNumber: 0,
            blogArticles: [],
            currentPage: 1,
            perPageBlogArticles: 5,
            iteration: 0, 
            propsImage: {
                blankColor: '#f6f2f0',
                blankHeight: 250,
                class: 'image-blog'
            } 
        }
    },
    methods: {
        getParam() {
            if(this.$route.params.idUser !== undefined) {
                this.idUser = this.$route.params.idUser;
            }  
            this.getBlogArticlesNumber();      
        },
        getBlogArticlesNumber() {
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "https://squid-app-q7qzv.ondigitalocean.app/be/blog/getBlogArticlesNumber"
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
                url: "https://squid-app-q7qzv.ondigitalocean.app/be/blog/getAllBlogArticles/" + this.iteration
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
                            dateArticle:  moment(result.data[i].date_article).format('LL'),
                            author: result.data[i].author,
                            image: result.data[i].image,
                            shortDescription: result.data[i].short_description
                        } 
                        this.blogArticles.push(blogArticle);                   
                    }
                    console.log(result)
                    setTimeout(function() {
                        thisRef.isLoading = false;
                    }, 1000);
                }
            })
        },
        redirectToBlogArticle(idBlogArticle) {
            if(this.idUser !== undefined) {
                this.$router.push('/blog/articol/' + idBlogArticle + '/' + this.idUser);
            } else {
                this.$router.push('/blog/articol/' + idBlogArticle);
            }
        }
    },
    mounted() {
        moment.locale('ro');
        $(".nav-link").removeClass("active");
        $(".blog-item .nav-link").addClass("active"); 
        this.getParam();
    },
  }
</script>
<style>
    .blog-container {
        width: 100%;
        margin: auto;
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
    .row-blog-articles.container {
        width: 80%;
        margin: auto;
    }
    .row-blog-article {
        padding: 0px !important;
        background-color: rgba(249,248,246,1);
        padding: 20px !important;
        margin: 0 0 30px 0 !important;
        justify-content: center;
        align-items: center;
    }
    .col-article {
        padding: 0px !important;
    }
    .col-article.large {
        padding: 0 30px !important;
    } 
    .row-blog-article.pagination {
        background-color: #FFFFFF;
        margin-bottom: 0px !important;
        padding: 0px !important;
    }
    .row-blog-article:nth-child(even) {
        flex-direction: row-reverse;
    }
    .image-blog {
        min-width: 100% !important;
        min-height: auto !important;
        border-radius: 10px;
    }
    .blog-article-date {
        margin-bottom: 0px !important;
        color: #a9927d;
        line-height: 1.8;
        letter-spacing: 0.11em;
        font-size: 14px;
        text-align: center;
        font-family: 'Nord Light';
        font-weight: 400;
        font-style: normal;
    }
    .blog-article-name {
        margin-bottom: 0px !important;
        color: #3a5a40;
        text-transform: uppercase;
        line-height: 1.8;
        letter-spacing: 0.11em;
        font-size: 16px;
        text-align: center;
        font-family: 'Nord Light';
        font-weight: 500;
        padding-bottom: 10px !important;
    }
    .blog-article-shortDescription {
        margin-bottom: 0px !important;
        color: #5e503f;
        font-size: 15px;
        text-align: center;
        font-family: 'Nord Light';
        font-weight: 400;   
    }
    .view-article-button {
        width: auto !important;
        padding: 5px 20px !important;
        background-color: #9c876e !important;
        border-radius: 0px !important;
        border-color: #a99985 !important;
        margin: 20px 0 0 0 !important;
        cursor: pointer;
    }
    .pagination-table .blog {
        padding: 0px !important;
    }
    @media only screen and (max-width: 992px) {
        .row-blog-articles.container {
            width: 90%;
            margin: auto;
            padding: 0px !important;
        }
        .col-article.large {
            padding: 0 !important;
        }
        .image-blog {
            min-width: 100% !important;
            height: auto !important;
            border-radius: 10px;
            margin-bottom: 10px !important;
        }
    }
    @media only screen and (max-width: 1200px) and (min-width: 768px) {
        .row-blog-articles.container {
            width: 90%;
            margin: auto;
            padding: 0px !important;
        }
        .col-article.large {
            padding: 0 30px !important;
        }
        .image-blog {
            min-width: 100% !important;
            height: auto !important;
            border-radius: 10px;
        }
    }
</style>