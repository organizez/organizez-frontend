<template>
    <div class="admin-customers">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin">Adăugare furnizor</p>
        <b-row class="row-admin">
            <b-row class="row-admin-form">
                <label for="company" class="label-form">Companie</label>
                <b-form-input id="company" class="input-admin-form" placeholder="Companie" v-model="addedCustomer.company"></b-form-input>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="first-name-representative" class="label-form">Prenume Reprezentant:</label>
                <b-form-input id="first-name-representative" class="input-admin-form" placeholder="Prenume Reprezentant" v-model="addedCustomer.firstNameReprezentative"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="last-name-representative" class="label-form">Nume Reprezentant:</label>
                <b-form-input id="last-name-representative" class="input-admin-form" placeholder="Nume Reprezentant" v-model="addedCustomer.lastNameReprezentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="email-representative" class="label-form">Email Reprezentant:</label>
                <b-form-input id="email-representative" class="input-admin-form" placeholder="Email Reprezentant" v-model="addedCustomer.emailReprezentative"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="phone-representative" class="label-form">Telefon Reprezentant:</label>
                <b-form-input id="phone-representative" class="input-admin-form" placeholder="Telefon Reprezentant" v-model="addedCustomer.phoneReprezentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="name" class="label-form">Denumire:</label>
                <b-form-input id="name" class="input-admin-form" placeholder="Denumire" v-model="addedCustomer.name"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="subscription-type" class="label-form">Tip abonament:</label>
                <b-form-input id="subscription-type" class="input-admin-form" placeholder="Tip abonament" v-model="addedCustomer.subscriptionType"></b-form-input>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="location" class="label-form">Locație:</label>
                <b-form-input id="location" class="input-admin-form" placeholder="Locație" v-model="addedCustomer.location"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="website" class="label-form">Site:</label>
                <b-form-input id="website" class="input-admin-form" placeholder="Site" v-model="addedCustomer.website"></b-form-input>
              </b-col>
            </b-row>      
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="short-description" class="label-form">Descriere scurtă:</label>
                <b-form-input id="short-description" class="input-admin-form" placeholder="Descriere scurtă" v-model="addedCustomer.shortDescription"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="long-description" class="label-form">Descriere lungă:</label>
                <b-form-input id="long-description" class="input-admin-form" placeholder="Descriere lungă" v-model="addedCustomer.longDescription"></b-form-input>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file1" :state="Boolean(file1)" placeholder="Alegeți imaginea 1" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file2" :state="Boolean(file2)" placeholder="Alegeți imaginea 2" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file3" :state="Boolean(file3)" placeholder="Alegeți imaginea 3" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file4" :state="Boolean(file4)" placeholder="Alegeți imaginea 4" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file5" :state="Boolean(file5)" placeholder="Alegeți imaginea 5" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file6" :state="Boolean(file6)" placeholder="Alegeți imaginea 6" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file7" :state="Boolean(file7)" placeholder="Alegeți imaginea 7" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file8" :state="Boolean(file8)" placeholder="Alegeți imaginea 8" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file9" :state="Boolean(file9)" placeholder="Alegeți imaginea 9" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file10" :state="Boolean(file10)" placeholder="Alegeți imaginea 10" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="minimum-capacity" class="label-form">Capacitate minimă:</label>
                <b-form-input id="minimum-capacity" class="input-admin-form" placeholder="Capacitate minimă" v-model="addedCustomer.minimumCapacity"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="maximum-capacity" class="label-form">Capacitate maximă:</label>
                <b-form-input id="maximum-capacity" class="input-admin-form" placeholder="Capacitate maximă" v-model="addedCustomer.maximumCapacity"></b-form-input>
              </b-col>
            </b-row>   
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="number-hall" class="label-form">Număr săli</label>
                <b-form-input id="number-hall" class="input-admin-form" placeholder="Număr săli" v-model="addedCustomer.numberHall"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="maximum-capacity" class="label-form">Capacitate maximă:</label>
                <b-form-input id="maximum-capacity" class="input-admin-form" placeholder="Capacitate maximă" v-model="addedCustomer.maximumCapacity"></b-form-input>
              </b-col>
            </b-row>   
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="cities" class="label-form">Orașe<span class="mandatory-field">*</span>:</label>
                <b-select v-model="addedCustomer.idCity"  :options="cities" class="select-admin-form"></b-select>             
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="category" class="label-form">Categorie<span class="mandatory-field">*</span>:</label>
                <b-select v-model="addedCustomer.idCategory" :options="categoriesServices" @change="getFacilitiesOptionsByCategory(addedCustomer.idCategory)" class="select-admin-form"></b-select>             
              </b-col>
            </b-row>
            <b-row>
              <b-form-group
                label="Facilități"
                v-slot="{ ariaDescribedby }">
                <b-form-checkbox
                  :aria-describedby="ariaDescribedby"
                  v-for="option in facilitiesOptions"
                  v-model="selectedFacilitiesOptions"
                  :key="option.value"
                  :value="option.value"
                  class="checkbox-facility">
                  {{ option.text }}
                </b-form-checkbox>
              </b-form-group>
            </b-row>
            <b-row class="row-admin-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="uploadImages()">Adăugare furnizor</b-button>
                <b-button class="action-admin-button" v-on:click="addCustomer()">Adăugare furnizor</b-button>
                <b-button class="close-admin-button" v-on:click="closeAddCustomer()">Close</b-button>
            </b-row>
        </b-row>
      </b-row>
      <b-row>
        <b-modal id="admin-info-modal" v-model="showInfoModal" :title="titleInfoModal" ok-only @ok="okInfoModal">
          <p>{{textInfoModal}}</p>
        </b-modal>
      </b-row>
  </div>
</template>
<script>
import { S3 } from "@aws-sdk/client-s3";
import { CreateBucketCommand } from "@aws-sdk/client-s3";
import spaceConfig from "../../../../digital-ocean-space-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
    components: {
      AdminHeader
    },
    data() {
      return {
        addedCustomer: {
          idCustomer: 0,
          company: "",
          firstNameRepresentative: "",
          lastNameRepresentative: "",
          emailRepresentative: "",
          phoneRepresentative: "",
          subscriptionType: "",
          name: "",
          location: "",
          website: "",
          phone: "",
          shortDescription: "",
          longDescription: "",
          image1: "",
          image2: "",
          image3: "",
          image4: "",
          image5: "",
          image6: "",
          image7: "",
          image8: "",
          image9: "",
          image10: "",
          minimumCapacity: "",
          maximumCapacity: "",
          numberHall: "",
          idCity: "",
          idCategory: "",
        },
        file1: [],
        file2: [],
        file3: [],
        file4: [],
        file5: [],
        file6: [],
        file7: [],
        file8: [],
        file9: [],
        file10: [],
        selectedFacilitiesOptions: [],
        categoriesServices: [],
        facilitiesOptions: [],
        cities: [],
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false   
      }
    },
    methods: {
      getCategories() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/categoriesServices/getAllServicesCategories"
        }).then(result => {
          if(result.data.length > 0) {
            let categoriesServices = {
              value: 0,
              text: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              categoriesServices = {
                value: result.data[i].id_category,
                text: result.data[i].category
              }
              this.categoriesServices.push(categoriesServices);
            }
          }
        })
      },
      getCities() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/cities/getAllCities"
        }).then(result => {
          if(result.data.length > 0) {
            let city = {
              value: 0,
              text: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              city = {
                value: result.data[i].id_city,
                text: result.data[i].city
              }
              this.cities.push(city);
            }
          }
        })
      },
      uploadImages() {
        console.log(this.file1)
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file1 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file1.name,
            Body: this.file1,
            ACL:'public-read'
          };
          const runImage1 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage1();
          }
        if(this.file2 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file2.name,
            Body: this.file2,
            ACL:'public-read'
          };
          const runImage2 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage2();
          }
       if(this.file3 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file3.name,
            Body: this.file3,
            ACL:'public-read'
          };
          const runImage3 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage3();
          }
        if(this.file4 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file4.name,
            Body: this.file4,
            ACL:'public-read'
          };
          const runImage4 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage4();
          }
        if(this.file5 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file5.name,
            Body: this.file5,
            ACL:'public-read'
          };
          const runImage5 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage5();
          }  
        if(this.file6 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file6.name,
            Body: this.file6,
            ACL:'public-read'
          };
          const runImage6 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage6();
          }
        if(this.file7 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file7.name,
            Body: this.file7,
            ACL:'public-read'
          };
          const runImage7 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage7();
          }
        if(this.file8 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file8.name,
            Body: this.file8,
            ACL:'public-read'
          };
          const runImage8 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage8();
          }
        if(this.file9 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file9.name,
            Body: this.file9,
            ACL:'public-read'
          };
          const runImage9 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage9();
          }
        if(this.file10 !== []) {
          const bucketParams = {
            Bucket: "myBucket-test",
            Key: this.file10.name,
            Body: this.file10,
            ACL:'public-read'
          };
          const runImage10 = async () => {
             try {
               const data = await s3Client.send(new PutObjectCommand(bucketParams));
               let image = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                 console.log(image);
                 return data;
               } catch (err) {
                console.log("Error", err);
              }
            };

            runImage10();
          }

      },
      addCustomer() {
        axios({
          method: 'post',
          url: 'http://localhost:3000/customers/addCustomer',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.addedCustomer
        }).then(result => {
          this.addedCustomer = {
            idCustomer: 0,
            company: "",
            firstNameRepresentative: "",
            lastNameRepresentative: "",
            emailRepresentative: "",
            phoneRepresentative: "",
            subscriptionType: "",
            name: "",
            location: "",
            website: "",
            phone: "",
            shortDescription: "",
            longDescription: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            image5: "",
            image6: "",
            image7: "",
            image8: "",
            image9: "",
            image10: "",
            minimumCapacity: "",
            maximumCapacity: "",
            numberHall: "",
            idCity: "",
            idCategory: "",
          },
          this.titleInfoModal = "Adăugare furnizor";
          this.textInfoModal = "Furnizorul a fost adăugat cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
            this.titleInfoModal = "Adăugare furnizor";
            this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
            this.showInfoModal = true;
        })
      },
      getFacilitiesOptionsByCategory(idCategory) {
        this.facilitiesOptions = [];
        this.selectedFacilitiesOptions = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/facilities/getFacilititesByCategory/" + idCategory
         }).then(result => {
          console.log(result)
          if(result.data.length > 0) {
            let facility = {
              value: 0,
              text: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              facility = {
                value: result.data[i].id_facility,
                text: result.data[i].facility
              }
              this.facilitiesOptions.push(facility);
            }
          }
        })
      },
        okInfoModal() {
          this.getCustomers();
        },
    },
    mounted() {
      this.getCategories();
      this.getCities();
    }
  }
</script>
<style>
    .admin-customers {
      padding: 0px;
    }
    .customers-table {
      padding: 0 !important;
      overflow: overlay;
    }
    .customers-table th:first-child  {
      width: 5% !important;
    }
    .customers-table th:last-child, .customers-table td:last-child  {
      text-align: center !important;
    }
    .checkbox-facility .custom-control-label, legend {
      text-align: left !important;
      color: #000000 !important;
      font-size: 16px !important;
    }
    .form-group {
      padding: 0px !important;
    }
</style>