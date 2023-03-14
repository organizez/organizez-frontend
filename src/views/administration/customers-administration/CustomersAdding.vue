<template>
    <div class="admin-customers">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="add-form-section">
        <p class="title-admin">Adăugare clienți</p>
        <b-row class="row-admin">
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label style="color: #C68E17;" for="company" class="label-form">Companie</label>
                <b-form-input id="company" class="input-admin-form" placeholder="Companie" v-model="addedCustomer.company"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="subscription-type" class="label-form">Tip abonament:</label>
                <b-select v-model="addedCustomer.subscriptionType" :options="subscriptionTypes" class="select-admin-form"></b-select>    
              </b-col>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="first-name-representative" class="label-form">Prenume Reprezentant:</label>
                <b-form-input id="first-name-representative" class="input-admin-form" placeholder="Prenume Reprezentant" v-model="addedCustomer.firstNameRepresentative"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="last-name-representative" class="label-form">Nume Reprezentant:</label>
                <b-form-input id="last-name-representative" class="input-admin-form" placeholder="Nume Reprezentant" v-model="addedCustomer.lastNameRepresentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="email-representative" class="label-form">Email Reprezentant:</label>
                <b-form-input id="email-representative" class="input-admin-form" placeholder="Email Reprezentant" v-model="addedCustomer.emailRepresentative"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="phone-representative" class="label-form">Telefon Reprezentant:</label>
                <b-form-input id="phone-representative" class="input-admin-form" placeholder="Telefon Reprezentant" v-model="addedCustomer.phoneRepresentative"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="name" class="label-form">Denumire:</label>
                <b-form-input id="name" class="input-admin-form" placeholder="Denumire" v-model="addedCustomer.name"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="website" class="label-form">Website:</label>
                <b-form-input id="website" class="input-admin-form" placeholder="Site" v-model="addedCustomer.website"></b-form-input>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label style="color: #C68E17;" for="location" class="label-form">Locație:</label>
                <b-form-input id="location" class="input-admin-form" placeholder="Oraș, stradă, număr" v-model="addedCustomer.location"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="counties" class="label-form">Județ<span class="mandatory-field">*</span>:</label>
                <b-select v-model="addedCustomer.idCunty"  :options="counties" class="select-admin-form"></b-select>             
              </b-col>
            </b-row>    
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="company-email" class="label-form">Email companie</label>
                <b-form-input id="company-email" class="input-admin-form" placeholder="Email companie" v-model="addedCustomer.companyEmail"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="website" class="label-form">Telefon companie:</label>
                <b-form-input id="website" class="input-admin-form" placeholder="Telefon" v-model="addedCustomer.phone"></b-form-input>
              </b-col>
            </b-row>   
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label style="color: #C68E17;" for="short-description" class="label-form">Descriere scurtă:</label>
                <b-form-textarea id="textarea-form" rows="8" class="input-admin-form" placeholder="Descriere scurtă" v-model="addedCustomer.shortDescription"></b-form-textarea>            
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="long-description" class="label-form">Descriere lungă:</label>
                <b-form-textarea id="textarea-form" rows="8" class="input-admin-form" placeholder="Descriere lungă" v-model="addedCustomer.longDescription"></b-form-textarea> 
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                 <label style="color: #C68E17;" for="image1" class="label-form">Imagine 1:</label>
                <b-form-file v-model="file1" :state="Boolean(file1)" @change="deleteImage(file1)" @input="uploadImage1()" placeholder="Alegeți imaginea 1" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                 <label style="color: #C68E17;" for="image2" class="label-form">Imagine 2:</label>
                <b-form-file v-model="file2" :state="Boolean(file2)" @change="deleteImage(file2)" @input="uploadImage2()" placeholder="Alegeți imaginea 2" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                 <label style="color: #C68E17;" for="image3" class="label-form">Imagine 3:</label>
                <b-form-file v-model="file3" :state="Boolean(file3)" @change="deleteImage(file3)" @input="uploadImage3()" placeholder="Alegeți imaginea 3" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                 <label style="color: #C68E17;" for="image4" class="label-form">Imagine 4:</label>
                <b-form-file v-model="file4" :state="Boolean(file4)" @change="deleteImage(file4)" @input="uploadImage4()" placeholder="Alegeți imaginea 4" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file5" :state="Boolean(file5)" @change="deleteImage(file5)" @input="uploadImage5()" placeholder="Alegeți imaginea 5" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file6" :state="Boolean(file6)" @change="deleteImage(file6)" @input="uploadImage6()" placeholder="Alegeți imaginea 6" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file7" :state="Boolean(file7)" @change="deleteImage(file7)" @input="uploadImage7()" placeholder="Alegeți imaginea 7" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file8" :state="Boolean(file8)" @change="deleteImage(file8)" @input="uploadImage8()" placeholder="Alegeți imaginea 8" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file9" :state="Boolean(file9)" @change="deleteImage(file9)" @input="uploadImage9()" placeholder="Alegeți imaginea 9" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file10" :state="Boolean(file10)" @change="deleteImage(file10)" @input="uploadImage10()" placeholder="Alegeți imaginea 10" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file11" :state="Boolean(file11)" @change="deleteImage(file11)" @input="uploadImage11()" placeholder="Alegeți imaginea 11" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file12" :state="Boolean(file12)" @change="deleteImage(file12)" @input="uploadImage12()" placeholder="Alegeți imaginea 12" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file13" :state="Boolean(file13)" @change="deleteImage(file13)" @input="uploadImage13()" placeholder="Alegeți imaginea 13" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file14" :state="Boolean(file14)" @change="deleteImage(file14)" @input="uploadImage14()" placeholder="Alegeți imaginea 14" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file15" :state="Boolean(file15)" @change="deleteImage(file15)" @input="uploadImage15()" placeholder="Alegeți imaginea 15" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file16" :state="Boolean(file16)" @change="deleteImage(file16)" @input="uploadImage16()" placeholder="Alegeți imaginea 16" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file17" :state="Boolean(file17)" @change="deleteImage(file17)" @input="uploadImage17()" placeholder="Alegeți imaginea 17" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file18" :state="Boolean(file18)" @change="deleteImage(file18)" @input="uploadImage18()" placeholder="Alegeți imaginea 18" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file9" :state="Boolean(file19)" @change="deleteImage(file19)" @input="uploadImage19()" placeholder="Alegeți imaginea 19" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <b-form-file v-model="file10" :state="Boolean(file20)" @change="deleteImage(file20)" @input="uploadImage20()" placeholder="Alegeți imaginea 20" drop-placeholder="Trageți imaginea aici"></b-form-file>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label style="color: #C68E17;" for="category" class="label-form">Categorie<span class="mandatory-field">*</span>:</label>
                <b-select v-model="addedCustomer.idCategory" :options="categoriesServices" @change="getFacilitiesOptionsByCategory(addedCustomer.idCategory)" class="select-admin-form"></b-select>             
              </b-col>
              <b-col class="col-admin-form text" sm="12" md="12" lg="6" xl="6">
                <b-form-group
                  label="Facilități" v-if="facilitiesOptions.length !== 0"
                  v-slot="{ ariaDescribedby }">
                  <b-form-checkbox
                    :aria-describedby="ariaDescribedby"
                    v-for="option in facilitiesOptions"
                    v-model="addedCustomer.selectedFacilitiesOptions"
                    :key="option.value"
                    :value="option.value"
                    class="checkbox-facility">
                    {{ option.text }}
                  </b-form-checkbox>
                </b-form-group>
                <p v-else>Nu există facilități pentru categoria selectată</p>
              </b-col>
            </b-row>
            <b-row class="row-admin-form" v-if="addedCustomer.idCategory === 4">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label style="color: #C68E17;" for="minimum-capacity" class="label-form">Capacitate minimă:</label>
                <b-form-input id="minimum-capacity" class="input-admin-form" placeholder="Capacitate minimă" v-model="addedCustomer.minimumCapacity"></b-form-input>
              </b-col>
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label style="color: #C68E17;" for="maximum-capacity" class="label-form">Capacitate maximă:</label>
                <b-form-input id="maximum-capacity" class="input-admin-form" placeholder="Capacitate maximă" v-model="addedCustomer.maximumCapacity"></b-form-input>
              </b-col>
            </b-row>  
            <b-row class="row-admin-form" v-if="addedCustomer.idCategory === 4">
              <b-col class="col-admin-form left" sm="12" md="12" lg="6" xl="6">
                <label for="number-hall" class="label-form">Număr săli:</label>
                <b-form-input id="number-hall" class="input-admin-form" placeholder="Număr săli" v-model="addedCustomer.numberHall"></b-form-input>
              </b-col>
            </b-row> 
            <b-row class="row-admin-form admin-buttons">
                <b-button class="action-admin-button" v-on:click="addCustomer()">Adăugare client</b-button>
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
import spaceConfig from "../../../../digital-ocean-space-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
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
          subscriptionType: "basic",
          name: "",
          location: "",
          website: "",
          phone: "",
          companyEmail: "",
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
          image11: "",
          image12: "",
          image13: "",
          image14: "",
          image15: "",
          image16: "",
          image17: "",
          image18: "",
          image19: "",
          image20: "",
          minimumCapacity: 0,
          maximumCapacity: 0,
          numberHall: 0,
          idCounty: 1,
          idCategory: 1,
          selectedFacilitiesOptions: []
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
        file11: [],
        file12: [],
        file13: [],
        file14: [],
        file15: [],
        file16: [],
        file17: [],
        file18: [],
        file19: [],
        file20: [],
        selectedFacilitiesOptions: [],
        categoriesServices: [],
        facilitiesOptions: [],
        counties: [],
        subscriptionTypes: [
          { value: 'basic', text: 'basic' },
          { value: 'premium', text: 'premium' }
        ],
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,
        action: ""
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
      getCounties() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/counties/getAllCounties"
        }).then(result => {
          if(result.data.length > 0) {
            let county = {
              value: 0,
              text: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              county = {
                value: result.data[i].id_county,
                text: result.data[i].county
              }
              this.counties.push(county);
            }
          }
        })
      },
      deleteImage(file) {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(file !== null && file !== undefined) {
          if(file.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: file.name
            };
            const deleteImage = async () => {
              try {
               await s3Client.send(new DeleteObjectCommand(bucketParams)).then(result => {
                  console.log("delete")
                });
                
                } catch (err) {
                  console.log("Error", err);
                }
              };
            deleteImage();
          }
        }
      },
      uploadImage1() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file1 !== null && this.file1 !== undefined) {
          if(this.file1.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file1.name,
              Body: this.file1,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image1 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                console.log("insert")
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage2() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file2 !== null && this.file2 !== undefined) {
          if(this.file2.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file2.name,
              Body: this.file2,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image2 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 2! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
       }
      },
      uploadImage3() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file3 !== null && this.file3 !== undefined) {
          if(this.file3.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file3.name,
              Body: this.file3,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image3 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 3! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage4() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file4 !== null && this.file4 !== undefined) {
          if(this.file4.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file4.name,
              Body: this.file4,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image4 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key);
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 4! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage5() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file5 !== null && this.file5 !== undefined) {
          if(this.file5.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file5.name,
              Body: this.file5,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image5 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key);
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 5! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage6() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file6 !== null && this.file6 !== undefined) {
          if(this.file6.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file6.name,
              Body: this.file6,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image6 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key);
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 6! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage7() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file7 !== null && this.file7 !== undefined) {
          if(this.file7.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file7.name,
              Body: this.file7,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image7 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key);
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 7! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage8() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file8 !== null && this.file8 !== undefined) {
          if(this.file8.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file8.name,
              Body: this.file8,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image8 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key);
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 8! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage9() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file9 !== null && this.file9 !== undefined) {
          if(this.file9.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file9.name,
              Body: this.file9,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image9 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key);
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 9! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage10() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
        if(this.file10 !== null && this.file10 !== undefined) {
          if(this.file10.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file10.name,
              Body: this.file10,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image10 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key);
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 10! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage11() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file11 !== null && this.file11 !== undefined) {
          if(this.file11.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file11.name,
              Body: this.file11,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image11 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage12() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file12 !== null && this.file12 !== undefined) {
          if(this.file12.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file12.name,
              Body: this.file12,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image12 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage13() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file13 !== null && this.file13 !== undefined) {
          if(this.file13.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file13.name,
              Body: this.file13,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image13 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage14() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file14 !== null && this.file14 !== undefined) {
          if(this.file14.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file14.name,
              Body: this.file14,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image14 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage15() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file15 !== null && this.file15 !== undefined) {
          if(this.file15.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file15.name,
              Body: this.file15,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image15 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage16() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file16 !== null && this.file16 !== undefined) {
          if(this.file16.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file16.name,
              Body: this.file16,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image16 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage17() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file17 !== null && this.file17 !== undefined) {
          if(this.file17.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file17.name,
              Body: this.file17,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image17 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage18() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file18 !== null && this.file18 !== undefined) {
          if(this.file18.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file18.name,
              Body: this.file18,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image18 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage19() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file19 !== null && this.file19 !== undefined) {
          if(this.file19.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file19.name,
              Body: this.file19,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image19 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
        }
      },
      uploadImage20() {
        const s3Client = new S3(
          spaceConfig.spaceConfig
        );
       if(this.file20 !== null && this.file20 !== undefined) {
          if(this.file20.length !== 0) {
            const bucketParams = {
              Bucket: "myBucket-test",
              Key: this.file20.name,
              Body: this.file20,
              ACL:'public-read'
            };
            const runImage = async () => {
              try {
                await s3Client.send(new PutObjectCommand(bucketParams)).then(result => {
                  this.addedCustomer.image20 = "https://organizez-images.fra1.digitaloceanspaces.com/" + bucketParams.Bucket + "/" + encodeURIComponent(bucketParams.Key)
                });
              } catch (err) {
                  this.titleInfoModal = "Încărcare imagine";
                  this.textInfoModal = "A apărut o eroare la încărcarea imaginii 1! Vă rugăm reîncercați";
                  this.showInfoModal = true;
              }
            };
            runImage();
          }
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
          console.log(result);
          // this.addedCustomer = {
          //   idCustomer: 0,
          //   company: "",
          //   firstNameRepresentative: "",
          //   lastNameRepresentative: "",
          //   emailRepresentative: "",
          //   phoneRepresentative: "",
          //   subscriptionType: "",
          //   name: "",
          //   location: "",
          //   website: "",
          //   phone: "",
          //   shortDescription: "",
          //   longDescription: "",
          //   image1: "",
          //   image2: "",
          //   image3: "",
          //   image4: "",
          //   image5: "",
          //   image6: "",
          //   image7: "",
          //   image8: "",
          //   image9: "",
          //   image10: "",
          //   minimumCapacity: "",
          //   maximumCapacity: "",
          //   numberHall: "",
          //   idCity: "",
          //   idCategory: "",
          // },
          this.action = "adding";
          this.titleInfoModal = "Adăugare client";
          this.textInfoModal = "Clientul a fost adăugat cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
            this.titleInfoModal = "Adăugare client";
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
      closeAddCustomer() {
        this.$router.push('/administrare/clienti/' + this.$route.params.idUser);
      },
      okInfoModal() {
        if(this.action === "adding") {
          this.$router.push('/administrare/clienti/' + this.$route.params.idUser);
        }
      }
    },
    mounted() {
      this.getCategories();
      this.getCounties();
      this.getFacilitiesOptionsByCategory(1)
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
      width: 100% !important;
    }
    .col-admin-form.text {
      display: flex !important;
      align-items: center !important;
    }
    .col-admin-form.text p {
      margin-bottom: 0px !important;
    }
    .label-form {
      padding-left: 0px !important;
    }
</style>