<template>
    <div class="admin-services-component">
      <b-row class="table-section" v-if="enabledAddService == false && enabledEditService==false">
        <p class="title-admin-component">Servicii <span class="small-element-title">({{servicesNumber}})</span></p>
        <b-row class="row-admin-component add-button">
          <b-button class="initiate-add-button" v-on:click="initiateAddService()"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare serviciu</b-button>
        </b-row>
        <b-row class="row-admin-component">
          <b-table bordered striped :fields="fieldsTable" :items="services" :busy="isLoading" responsive="sm" class="services-table">
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align=middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #head(index)>Index</template>
            <template #head(nameService)>Serviciu</template>
            <template #head(location)>Locație</template>
            <template #head(image)>Imagine</template>
            <template #head(shortDescription)>Descriere scurtă</template>
            <template #head(longDescription)>Descriere detaliată</template>
            <template #head(company)>Companie</template>
            <template #head(action)>Acțiune</template>
            <template #cell(index)="data">
              <b>{{ data.index + iteration + 1}}</b>
            </template>
            <template #cell(nameService)="data">
              {{data.item.nameService}}
            </template>
            <template #cell(location)="data">
              {{data.item.location}}
            </template>
            <template #cell(image)="data">
              {{data.item.image}}
            </template>
             <template #cell(shortDescription)="data">
              {{data.item.shortDescription}}
            </template>
             <template #cell(longDescription)="data">
              {{data.item.longDescription}}
            </template>
             <template #cell(company)="data">
              {{data.item.company}}
            </template>
             <template #cell()="data">
              <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon" @click="editService(data.item)"/>
              <font-awesome-icon icon="fa-solid fa-trash-can" class="trash-icon" @click="initiateDeleteService(data.item.idService, data.item.nameService)"/>
            </template>
          </b-table>
        </b-row>
        <b-row class="row-admin-component">
          <b-pagination
          v-model="currentPage"
          :total-rows="servicesNumber"
          :per-page="perPageServices"
          @input="getServices()"
          class="pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
      <b-row class="add-form-section" v-else-if="enabledAddService === true && enabledEditService === false">
        <p class="title-admin-component">Adaugare serviciu</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="nameService" class="label-form">Serviciu<span class="mandatory-field">*</span>:</label>
                <b-form-input id="nameService" class="input-form" placeholder="Serviciu" v-model="addedService.nameService"></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="location" class="label-form">Locație<span class="mandatory-field">*</span>:</label>
                <b-form-input id="location" class="input-form" placeholder="Locație" v-model="addedService.location"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="shortDescription" class="label-form">Scurtă descriere<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Scurtă descriere" v-model="addedService.shortDescription"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="longDescription" class="label-form">Descriere detaliată<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Descriere detaliată" v-model="addedService.longDescription"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="company" class="label-form">Furnizori<span class="mandatory-field">*</span></label>
                <b-select v-model="addedService.idProvider" :options="providers" class="select-from"></b-select>
              </b-col>
              <b-col class="col-form left">
                <label for="image" class="label-form">Imagine<span class="mandatory-field">*</span></label>
                 <!-- <b-form-file v-model="addedService.image" class="mt-3" ></b-form-file> -->
              </b-col>
            </b-row>
        </b-row>
      </b-row>
    </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
 export default {
    data() {
      return {
        servicesNumber:"",
        isLoading: true,
        services: [],
        fieldsTable:['Index', { key: 'nameService', label: 'Name Service'}, { key: 'location', label: 'Location'}, { key: 'image', label: 'Image'}, 
        { key: 'shortDescription', label: 'Short Description'}, { key: 'longDescription', label: 'Long Description'},
        { key: 'company', label: 'Company'}, { key: 'action', label: 'Acțiune'}],
        currentPage: 1,
        perPageServices: 15,
        iteration: 0,
        enabledAddService: false,
        addedService:{
          nameService: "",
          location: "",
          image: "",
          shortDescription: "",
          longDescription: "",
          idProvider: "",
          company: ""
        },
        providers: [],
        enabledEditService: false,
      }
    },
    methods: {
      getServicesNumber(){
        axios({
          method: "get",
          headers: {"accept": "application/json"},
          url: "http://localhost:3000/services/getServicesNumber"
        }).then(result => {
          this.servicesNumber = result.data[0].services_number;
          this.getServices();
        })
      },
      getServices(){
        let thisRef = this;
        this.iteration = (this.currentPage - 1) * this.perPageServices;
        if(this.isLoading !== true){
          this.isLoading = true;
        }
        this.services = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/services/getAllServices/" + this.iteration
        }).then(result => {
          if(result.data.length > 0) {
            let service = {
              idService: 0,
              nameService: "",
              location: "",
              image: "",
              shortDescription: "",
              longDescription: "",
              id_provider: 0,
              company: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              service = {
                idService: result.data[i].id_service,
                nameService: result.data[i].name_service,
                location: result.data[i].location,
                image: result.data[i].image_service.substring(0,18) + '...',
                shortDescription: result.data[i].short_description,
                longDescription: result.data[i].long_description,
                idProvider: result.data[i].id_provider,
                company: result.data[i].company
              }
              this.services.push(service);
            }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        })
      },
      initiateAddService() {
        this.enabledAddService = true;
      },
      closeAddService() {
        this.enabledAddService = false;
        this.addedService = {
          nameService: "",
          location: "",
          image: "",
          shortDescription: "",
          longDescription: "",
          idProvider: "",
          company: ""
        }
      },
      getProviders() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/providers/getProvidersCompany"
        }).then(result => {
          if(result.data.length > 0){
            let provider = {
              value: 0,
              text: ""
            }
            for(var i = 0; i < result.data.length; i++){
              provider = {
                value: result.data[i].id_provider,
                text: result.data[i].company
              }
              this.providers.push(provider);
            }
          }
        })
      }
    },
    mounted() {
      this.getServicesNumber();
      this.getProviders();
    }
  }
</script>
<style>
  .admin-services-component{
    padding: 30px;
  }
  .services-table{
    padding: 0 !important;
  }
  .services-table th:first-child  {
    width: 5% !important;
  }
  .services-table th:last-child, .services-table td:last-child  {
    text-align: center !important;
  }
</style>