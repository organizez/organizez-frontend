<template>
    <div class="admin-dashboard-component">
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
      <b-button class="initiate-add-button" v-on:click="addImage()">Adăugare fisier</b-button>
    </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
 export default {
    data() {
      return {
        file: []
      }
    },
    methods: {
      addImage() {
        console.log(this.file)
        axios({
          method: "post",
          url: "http://localhost:3000/uploadFilesDigitalOcean/addImage",
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "Access-Control-Allow-Origin": "*",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.file
        }).then(result => {

        }).catch(error => {
        })
      },
    },
    mounted() {
    }
  }
</script>
<style>

</style>