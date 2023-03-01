<template>
    <div class="portofolio-page">
        <Main-Header></Main-Header>
        <div class="portofolio-container">
            <b-row class="row-portofolio header">
                <p class="title-portofolio">GALERIE FOTO <i>Organizez.ro</i></p>
            </b-row>
            <b-row class="row-portofolio gallery">
                <b-col v-for="(item, index) in portofolio" :key="item.idImage" class="col-gallery" @click="changeSlide(index)">
                    <b-img-lazy v-bind="propsImage" :src="item.image" fluid alt="image" class="image-portofolio" ></b-img-lazy>
                </b-col>
            </b-row>
            <b-row class="row-portofolio">
                <b-modal id="portofolioGallery" v-model="modalShow" size="lg" title="GALERIE FOTO Organizez.ro" hide-footer>
                    <b-carousel
                        v-model="slide"
                        class="carousel-portofolio-gallery"
                        controls
                        background="#ababab"
                        img-width="1024"
                        img-height="450"
                        style="text-shadow: 1px 1px 2px #333;">
                        <b-carousel-slide v-for="(item, index) in portofolio" :key="index"
                        :img-src="item.image"
                        ></b-carousel-slide>
                    </b-carousel>
                    <p class="pagination-carousel">{{slide+1}} / {{imagesTotalNumber}}</p>
                </b-modal>         
            </b-row>
            <b-row class="row-portofolio button">
                <b-button class="view-more-images-button second-button" @click="getImagesFromPortofolio()">Mai multe imagini</b-button>
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
        portofolio: [],
        propsImage: {
          blankColor: '#f6f2f0',
          blankHeight: 250,
          class: 'image-portofolio'
        },
        slide: 0,
        modalShow: false,
        imagesTotalNumber: 0,
        iteration: 0
      }
    },
    methods: {
        changeSlide(index) {
            this.slide = index;
            this.modalShow = true;
        },
        getImagesFromPortofolio() {
            axios({
                method: "get",
                headers: {"accept": "application/json"},
                url: "https://squid-app-q7qzv.ondigitalocean.app/portofolio/getAllImages/" + this.iteration
            }).then(result => {
                if(result.data.length > 0) {
                    let image = {
                        idImage: 0,
                        image: ""
                    }
                    for(var i = 0; i < result.data.length; i++) {
                        image = {
                            idImage: result.data[i].id_image,
                            image: result.data[i].image
                        }
                        this.portofolio.push(image);
                    }
                    this.imagesTotalNumber = this.portofolio.length;
                    this.iteration += 12;
                }
            })
        },
    },
    mounted() {
        this.getImagesFromPortofolio();
    },
  }
</script>
<style>
    .portofolio-container {
        width: 100%;
        margin: auto;;
    }
    .row-portofolio.header {
        background-color: rgb(163, 177, 138, 0.2);
        padding: 30px !important;
        margin: 0 0 60px 0 !important;
    }
    .title-portofolio {
        color: #9c876e;
        line-height: 2;
        letter-spacing: 0.15em;
        font-size: 20px;
        text-align: center;
        font-family: 'Nord Book';
        font-weight: 500;
        margin-bottom: 0px !important;
    }
    .row-portofolio.gallery {
        width: 80%;
        margin: auto; 
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        column-gap: 3%;
        row-gap: 25px;
    }
    .row-portofolio.button {
        justify-content: center;
        margin: 40px 0 0 0 !important;
    }
    .col-gallery {
        width: 31.33% !important;
        height: 250px !important;
        margin: 0px !important;
        padding: 0px !important;
        flex: none !important;
        overflow: hidden;
    }
    .image-portofolio {
        cursor: pointer;
        object-fit: cover;
        width: 100% !important;
        height: 100% !important;
        vertical-align: middle;
        border-radius: 5px;
        transition: transform .5s ease;
    }
    .image-portofolio:hover {
        transform: scale(1.3);
    }
    #portofolioGallery {
        overflow: hidden;
    }
    #portofolioGallery .modal-title {
        font-size: 20px;
        text-align: left;
        font-weight: 500;
        color: #9c876e !important;
        font-family: 'Petrona';
    }
    #portofolioGallery .modal-content {
        width: 85% !important;
        margin: auto !important;
    }
    .carousel-portofolio-gallery {
        background: #ffffff !important;
    }
    .carousel-portofolio-gallery .carousel-indicators {
        display: none !important;
    }
    .carousel-portofolio-gallery .carousel-inner {
        border-radius: 0 !important;
    }
    .carousel-portofolio-gallery .img-fluid {
        height: 440px !important;
        width: auto !important;
        margin: auto !important; 
    }
    .carousel-portofolio-gallery .carousel-item {
        background: #ffffff !important;
    }
    .carousel-portofolio-gallery .carousel-control-prev-icon, .carousel-portofolio-gallery .carousel-control-next-icon {
        background-color: #9c876e !important;
        border-radius: 10px !important;
        padding: 20px !important;
    }
    .pagination-carousel {
        margin-bottom: 0px !important;
        color: #000000;
        text-align: center;
        font-size: 16px;
        padding: 5px 0 0 0;
        font-family: 'Petrona';
    }
    .view-more-images-button {
        width: auto !important;
        padding: 5px 20px !important;
        background-color: #9c876e !important;
        border-radius: 0px !important;
        border-color: #a99985 !important;
        margin: 0 !important;
        cursor: pointer;
    }
</style>