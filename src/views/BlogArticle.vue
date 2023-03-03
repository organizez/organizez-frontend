<template>
    <div class="blog-page">
        <Main-Header :idUser="idUser"></Main-Header>
        <div class="blog-article-container">
            <b-row class="row-article container">
                <p class="article-name">{{nameArticle}}</p>
                <b-img-lazy v-bind="propsImage" :src="image" fluid alt="image" class="image-blog-article"></b-img-lazy>
                <p class="article-info">{{author}} | <i>{{dateArticle}}</i></p>
                <p class="article-long-description">{{articleText}}</p>
            </b-row>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import MainHeader from "../components/MainHeader.vue";
import Footer from "../components/Footer.vue";
import axios from 'axios';
import moment from 'moment';
// import $ from "jquery";
 export default {
    components: {
        MainHeader,
        Footer
    },
    data() {
        return {
            idUser: "",
            idBlogArticle: 0,
            nameArticle: "",
            dateArticle: new Date(),
            author: "",
            image: "",
            articleText: "",
            propsImage: {
                blankColor: '#f6f2f0',
                blankHeight: 250,
                class: 'image-blog-article'
            } 
        }
    },
    methods: {
        getParams() {
            if(this.$route.params.idUser !== undefined) {
                this.idUser = this.$route.params.idUser;
            }
            this.idBlogArticle = this.$route.params.idBlogArticle;
            this.getBlogArticle();
        },
        getBlogArticle() {
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "https://squid-app-q7qzv.ondigitalocean.app/be/blog/getBlogArticleById/" + this.idBlogArticle
            }).then(result => {
                console.log(result)
                this.nameArticle = result.data.name_article,
                this.dateArticle = moment(result.data.date_article).format('LL'),
                this.author = result.data.author,
                this.image = result.data.image,
                this.articleText = result.data.text
            })
        },
    },
    mounted() {
        moment.locale('ro');
        this.getParams();
    },
  }
</script>
<style>
    .row-article.header {
        background-color: rgb(163, 177, 138, 0.2);
        padding: 30px !important;
        margin: 0 0 60px 0 !important;
    }
    .article-name {
        color: #3a5a40;;
        line-height: 2;
        letter-spacing: 0.15em;
        font-size: 20px;
        text-align: center;
        font-family: 'Nord Book';
        font-weight: 600;
        margin-bottom: 0px !important;
        padding: 0 0 20px 0 !important;
    }
    .row-article.container {
        width: 80%;
        margin: auto;
        background-color: rgba(249,248,246,1);
        padding: 50px 100px !important;
    }
    .image-blog-article {
        width: 100%;
        height: auto !important;
        min-height: 300px !important;
        max-height: 500px !important;
        padding: 0px !important;
    }
    .article-info {
        margin-bottom: 0px !important;
        color: #a9927d;
        line-height: 1.8;
        letter-spacing: 0.11em;
        font-size: 15px;
        text-align: center;
        font-family: 'Nord Light';
        font-weight: 400;
        font-style: normal;
        text-align: left;
        padding: 20px 0 !important;
    }
    .article-long-description {
        padding: 0px !important;
        text-align: left;
        margin-bottom: 0px !important;
        color: #000000;
        font-size: 16px;
        text-align: justify;
        font-family: 'Nord Light';
        font-weight: 400;   
    }
</style>