<template>
    <div class="admin-dashboard-component">
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        
      ></b-form-file>
      <b-button class="initiate-add-button" v-on:click="upload()">Adăugare fisier</b-button>
    </div>
</template>
<script>
import { S3 } from "@aws-sdk/client-s3";
import { CreateBucketCommand } from "@aws-sdk/client-s3";
import axios from 'axios';
import $ from "jquery";
 export default {
    data() {
      return {
        file: [],
        objectPost: {
          id: 1,
          file: ""
        },
        
      }
    },
    methods: {
      upload() {
      const s3Client = new S3({
          region: "fra1",
          forcePathStyle: false,
          endpoint: 'https://organizez-images.fra1.digitaloceanspaces.com',
          ACL: "public-read",
          credentials: {
            accessKeyId: 'DO00YJP33MWMPX422XBC',
            secretAccessKey: 'sXe1ESW1vbSUIDulSL5vnrWS5SpCiuBu/mCdsvfBubc'
          }
      });

      const bucketParams = { Bucket: "example-bucket-name" };

      // Creates the new Space.
      const run = async () => {
        try {
          const data = await s3Client.send(new CreateBucketCommand(bucketParams));
          console.log("Success", data.Location);
          return data;
        } catch (err) {
          console.log("Error", err);
        }
      };

      run();
      },
      // addImage() {
      //   console.log(this.file)
      //   this.objectPost = {
      //     id: 1,
      //     file: this.file
      //   }
      //   axios({
      //     method: "post",
      //     url: "http://localhost:3000/uploadFilesDigitalOcean/addImage",
      //     mode: 'no-cors',
      //     headers: {
      //       "Accept": "application/json;odata=verbose",
      //       "Access-Control-Allow-Origin": "*",
      //       "X-RequestDigest": $("#__REQUESTDIGEST").val()
      //     },
      //     contentType: "application/json;odata=verbose",
      //     data: this.file
      //   }).then(result => {

      //   }).catch(error => {
      //   })
      // },
    },
    mounted() {
    }
  }
</script>
<style>

</style>