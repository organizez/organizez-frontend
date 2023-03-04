<template>
    <div class="homepage-card-blog-component">
        <div>
            <b-row class="row-homepage-blog-card">
                <b-col class="col-homepage-blog-card" v-for = "(blog, index) in blogs" :key="index">
                    <b-card class="homepage-blog-card"  :img-src="blog.image" img-alt="Image" img-height="200px" img-top :title="blog.nameArticle" >
                        <b-card-text class="homepage-blog-card-text" >
                            {{blog.shortDescription}}
                        </b-card-text>
                         <template #footer >
                             <small class="text-muted">Data publicare articol: {{blog.dateArticle}}</small>
                        </template>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
    
</template>
<script>
import axios from 'axios';
// import $ from "jquery";
 export default {
    components: {
    },
    data() {
      return {
        blogs: []
      }
    },
    methods: {
        getBlogsByDate() {
            this.blogs = [];
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "http://localhost:3000/blog/getBlogsByDate"
            }).then(result => {
                if(result.data.length > 0) {
                    let blog = {
                        image: "",
                        nameArticle: "",
                        shortDescription: "",
                        dateArticle: ""
                    }
                    for( var i = 0; i < result.data.length; i++) {
                        blog = {
                            image: result.data[i].image,
                            nameArticle: result.data[i].name_article,
                            shortDescription: result.data[i].short_description,
                            dateArticle: result.data[i].date_article.substring(0,10)
                        }
                        this.blogs.push(blog);
                    }
                    console.log(this.blogs)
                }
            })
        },

    },
    computed: {
    },
    mounted() {
        this.getBlogsByDate();
    }
  }
</script>
<style>
.homepage-card-blog-component {
    padding-bottom: 20px;
    position: relative;
    }
.homepage-blog-card {
    font-family: 'Petrona';
    font-weight: 300;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.homepage-blog-card-text {
    font-family: 'Petrona';
    font-weight: 300;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 30px !important;
}
.text-muted {
    font-family: 'Petrona';
    font-weight: 300;
    color: black;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
}
.row-homepage-blog-card {
    display: flex !important;
}
.col-homepage-blog-card {
    display: flex !important;
    /* background-image: url('https://i.pinimg.com/236x/72/1b/24/721b24010451bb0c0636991d4f7d1044.jpg')!important;  */
    background-image: url('https://i.pinimg.com/236x/ca/8e/c3/ca8ec3b3a1ab839332d391f7ec8ec897.jpg')!important; 
    background-repeat: repeat !important;
    background-size: 250px !important;
    background-position: center !important;
    padding-left: 100px !important;
    /* background-color: #f7f7f2 !important; */
    padding-bottom: 10px !important;
    padding-top: 10px !important;

}
.homepage-line {
    background-color: #ffd60a !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding-right: 100px;
    color: #ffc300 !important;
    height: 2px;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
}

</style>

