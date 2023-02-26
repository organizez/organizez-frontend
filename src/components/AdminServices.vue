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
            <template #head(image1Service)>Imagine 1</template>
            <template #head(image2Service)>Imagine 2</template>
            <template #head(image3Service)>Imagine 3</template>
            <template #head(image4Service)>Imagine 4</template>
            <template #head(siteLink)>Link site</template>
            <template #head(shortDescription)>Descriere scurtă</template>
            <template #head(longDescription)>Descriere detaliată</template>
            <template #head(company)>Companie</template>
            <template #head(category)>Categorie</template>
            <template #head(city)>Oras</template>
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
            <template #cell(image1Service)="data">
              {{data.item.image1Service}}
            </template>
             <template #cell(image2Service)="data">
              {{data.item.image2Service}}
            </template>
             <template #cell(image3Service)="data">
              {{data.item.image3Service}}
            </template>
             <template #cell(image4Service)="data">
              {{data.item.image4Service}}
            </template>
            <template #cell(siteLink)="data">
              {{data.item.siteLink}}
            </template>
            <template #cell(capacity)="data">
              {{data.item.capacity}}
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
            <template #cell(category)="data">
                <i>{{ data.item.category }}</i>
            </template>
            <template #cell(city)="data">
                {{ data.item.city }}
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
                <label for="cities" class="label-form">Orașe<span class="mandatory-field">*</span>:</label>
                <b-select v-model="addedService.idCity" :options="cities" class="select-form"></b-select>             
              </b-col>
              <b-col class="col-form left">
                <label for="category" class="label-form">Categorie<span class="mandatory-field">*</span>:</label>
                <b-select v-model="addedService.idCategory" :options="categoriesServices" class="select-form"></b-select>             
              </b-col>
               <b-col class="col-form left">
                <label for="capacity" class="label-form">Capacitate:</label>
                <b-form-input id="capacity" class="input-form" placeholder="Capacitate" v-model="addedService.capacity"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="siteLink" class="label-form">Link Site<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Site Link" v-model="addedService.siteLink"></b-form-textarea>
              </b-col>
            </b-row>
             <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image1Service" class="label-form">Imagine 1<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine 1" v-model="addedService.image1Service"></b-form-textarea>
              </b-col>
            </b-row>
             <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image2Service" class="label-form">Imagine 2:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine 2" v-model="addedService.image2Service"></b-form-textarea>
              </b-col>
            </b-row>
             <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image3Service" class="label-form">Imagine 3:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine 3" v-model="addedService.image3Service"></b-form-textarea>
              </b-col>
            </b-row>
             <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image4Service" class="label-form">Imagine 4:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine 4" v-model="addedService.image4Service"></b-form-textarea>
              </b-col>
            </b-row>
            <!-- <b-row>
               <b-col class="col-form left">
                <label for="image" class="label-form">Imagine<span class="mandatory-field">*</span></label>
                 <b-form-file v-model="addedService.image" class="mt-3" ></b-form-file> 
                  <template>
                    <b-container >
                      <b-form>
                        <div class="mb-3">
                          <b-form-file v-model="addedService.image" placeholder="Choose an image" ></b-form-file>
                          <b-button v-if="hasImage" variant="danger" class="ml-3" @click="clearImage">Sterge imaginea</b-button>
                        </div>
                      </b-form>
                    </b-container>
                  </template>
              </b-col>
            </b-row> -->
            <b-row class="row-form admin-buttons">
              <b-button class="action-admin-button" v-on:click="addService()">Adaugă serviciu</b-button>
              <b-button class="close-admin-button" v-on:click="closeAddService()">Închide</b-button>
            </b-row>
        </b-row>
      </b-row>
      <b-row class="edit-form-section" v-else-if="enabledEditService === true && enabledAddService === false">
        <p class="title-admin-component">Editare serviciu</p>
        <b-row class="row-admin-component">
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="nameService" class="label-form">Serviciu<span class="mandatory-field">*</span>:</label>
                <b-form-input id="nameService" class="input-form" placeholder="Serviciu" v-model="editedService.nameService"></b-form-input>
              </b-col>
              <b-col class="col-form left">
                <label for="location" class="label-form">Locație<span class="mandatory-field">*</span>:</label>
                <b-form-input id="location" class="input-form" placeholder="Locație" v-model="editedService.location"></b-form-input>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="shortDescription" class="label-form">Scurtă descriere<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Scurtă descriere" v-model="editedService.shortDescription"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="longDescription" class="label-form">Descriere detaliată<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Descriere detaliată" v-model="editedService.longDescription"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="siteLink" class="label-form">Site Link<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Site Link" v-model="editedService.siteLink"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row class="row-form">
              <b-col class="col-form left">
                <label for="company" class="label-form">Furnizori<span class="mandatory-field">*</span></label>
                <b-select v-model="editedService.idProvider" :options="providers" class="select-from"></b-select>
              </b-col>
              <b-col class="col-form left">
                <label for="cities" class="label-form">Orașe<span class="mandatory-field">*</span>:</label>
                <b-select v-model="editedService.idCity" :options="cities" class="select-form"></b-select>             
              </b-col>
              <b-col class="col-form left">
                <label for="category" class="label-form">Categorie<span class="mandatory-field">*</span>:</label>
                <b-select v-model="editedService.idCategory" :options="categoriesServices" class="select-form"></b-select>             
              </b-col>
             <b-col class="col-form left">
                <label for="capacity" class="label-form">Capacitate:</label>
                <b-form-input id="capacity" class="input-form" placeholder="Capacitate" v-model="editedService.capacity"></b-form-input>
              </b-col>
              <!-- <b-col class="col-form left">
                <label for="image" class="label-form">Imagine<span class="mandatory-field">*</span></label>
                 <b-form-file v-model="addedService.image" class="mt-3" ></b-form-file>
                  <template>
                    <b-container >
                      <b-form>
                        <div class="mb-3">
                          <b-form-file v-model="editedService.image" placeholder="Choose an image" ></b-form-file>
                          <b-button v-if="hasImage" variant="danger" class="ml-3" @click="clearImage">Sterge imaginea</b-button>
                        </div>
                      </b-form>
                    </b-container>
                  </template>
              </b-col> -->
            </b-row>
             <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image1Service" class="label-form">Imagine 1<span class="mandatory-field">*</span>:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine 1" v-model="editedService.image1Service"></b-form-textarea>
              </b-col>
            </b-row>
             <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image2Service" class="label-form">Imagine 2:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine 2" v-model="editedService.image2Service"></b-form-textarea>
              </b-col>
            </b-row>
             <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image3Service" class="label-form">Imagine 3:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine 3" v-model="editedService.image3Service"></b-form-textarea>
              </b-col>
            </b-row>
             <b-row class="row-form">
              <b-col class="col-form left">
                <label for="image4Service" class="label-form">Imagine 4:</label>
                <b-form-textarea id="textarea-form" placeholder="Imagine 4" v-model="editedService.image4Service"></b-form-textarea>
              </b-col>
            </b-row>
            <b-row class="row-form admin-buttons">
              <b-button class="action-admin-button" v-on:click="updateService()">Actualizare serviciu</b-button>
              <b-button class="close-admin-button" v-on:click="closeEditService()">Închide</b-button>
            </b-row>
        </b-row>
      </b-row>
       <b-row>
        <b-modal id="admin-info-modal" v-model="showInfoModal" :title="titleInfoModal" ok-only @ok="okInfoModal">
          <p>{{textInfoModal}}</p>
        </b-modal>
      </b-row>
      <b-row>
        <b-modal id="admin-delete-modal" v-model="showConfirmationModal" :title="titleConfirmationModal" @ok="okConfirmationModal">
          <p>{{textConfirmationModal}}</p>
        </b-modal>
      </b-row>
    </div>
</template>
<script>
import axios from 'axios';
import $ from "jquery";
// const base64Encode = data =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(data);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
 export default {
    data() {
      return {
        servicesNumber:"",
        isLoading: true,
        services: [],
        fieldsTable: ['Index', { key: 'nameService', label: 'Name Service'}, { key: 'location', label: 'Location'}, { key: 'image1Service', label: 'Image 1'}, 
        { key: 'image2Service', label: 'Image 2'}, { key: 'image3Service', label: 'Image 3'}, { key: 'image4Service', label: 'Image 4'}, { key: 'shortDescription', label: 'Short Description'}, { key: 'longDescription', label: 'Long Description'},
        { key: 'siteLink', label: 'Site Link'}, { key: 'capacity', label: 'Capacity'}, { key: 'company', label: 'Company'}, { key: 'category', label: 'Category'},
        { key: 'city', label: 'City'},{ key: 'action', label: 'Acțiune'}],
        currentPage: 1,
        perPageServices: 15,
        iteration: 0,
        enabledAddService: false,
        addedService:{
          nameService: "",
          location: "",
          image1Service: "",
          image2Service: "",
          image3Service: "",
          image4Service: "",
          shortDescription: "",
          longDescription: "",
          siteLink: "",
          capacity: "",
          idProvider: "",
          company: "",
          idCity: "",
          city: "",
          idCategory: "",
          category: ""
        },
        enabledEditService: false,
        editedService: {
          idService: 0,
          nameService: "",
          location: "",
          image1Service: "",
          image2Service: "",
          image3Service: "",
          image4Service: "",
          shortDescription: "",
          longDescription: "",
          siteLink: "",
          capacity: "",
          idProvider: "",
          company: "",
          idCity: "",
          city: "",
          idCategory: "",
          category: ""
        },
        providers: [],
        idDeletedService: "",
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,
        titleConfirmationModal: "",
        textConfirmationModal: "",
        showConfirmationModal: false,
        categoriesServices: [],
        cities: [],
        // imageSrc: null,
        // image: null

      }
    },
    methods: {
      getServicesNumber() {
        axios({
          method: "get",
          headers: {"accept": "application/json"},
          url: "http://localhost:3000/services/getServicesNumber"
        }).then(result => {
          this.servicesNumber = result.data[0].services_number;
          this.getServices();
        })
      },
      getServices() {
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
              image1Service: "",
              image2Service: "",
              image3Service: "",
              image4Service: "",
              shortDescription: "",
              longDescription: "",
              siteLink: "",
              capacity: "",
              id_provider: 0,
              company: "",
              id_city: 0,
              city: "",
              id_category: 0,
              category: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              service = {
                idService: result.data[i].id_service,
                nameService: result.data[i].name_service,
                location: result.data[i].location,
                image1Service: result.data[i].image1_service.substring(0,18) + '...',
                image2Service: result.data[i].image2_service.substring(0,18) + '...',
                image3Service: result.data[i].image3_service.substring(0,18) + '...',
                image4Service: result.data[i].image4_service.substring(0,18) + '...',
                shortDescription: result.data[i].short_description.substring(0,18) + '...',
                longDescription: result.data[i].long_description.substring(0,18) + '...',
                siteLink: result.data[i].site_link.substring(0,18) + '...',
                capacity: result.data[i].capacity,
                idProvider: result.data[i].id_provider,
                company: result.data[i].company,
                idCity: result.data[i].id_city,
                city: result.data[i].city,
                idCategory: result.data[i].id_category,
                category: result.data[i].category
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
          image1Service: "",
          image2Service: "",
          image3Service: "",
          image4Service: "",
          shortDescription: "",
          longDescription: "",
          siteLink: "",
          idProvider: "",
          company: "",
          idCity: "",
          city: "",
          idCategory: "",
          category: "",
          capacity: ""
        }
      },
      getCategoriesServices() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/categoriesServices/getAllCategoriesServices"
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
      }, 
      addService() {
        axios({
          method: "post",
          url: "http://localhost:3000/services/addService",
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.addedService
        }).then(result => {
          this.addedService = {
            nameService: "",
            location: "",
            image1Service: "",
            image2Service: "",
            image3Service: "",
            image4Service: "",
            shortDescription: "",
            longDescription: "",
            siteLink: "",
            idProvider: "",
            company: "",
            idCity: "",
            city: "",
            idCategory: "",
            category: "",
            capacity: ""
        }
        this.actionInfoModal = "adding";
        this.titleInfoModal = "Adăugare serviciu";
        this.textInfoModal = "Serviciul a fost adăugat cu succes!";
        this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "adding";
          this.titleInfoModal = "Adăugare serviciu";
          this.textInfoModal = "A apărut o eroare la acțiunea de adăugare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      editService(service) {
        this.enabledAddService = false;
        this.enabledEditService = true;
        this.editedService = { 
          idService: service.idService,
          nameService: service.nameService,
          location: service.location,
          image1Service: service.image1Service,
          image2Service: service.image2Service,
          image3Service: service.image3Service,
          image4Service: service.image4Service,
          shortDescription: service.shortDescription,
          longDescription: service.longDescription,
          siteLink: service.siteLink,
          idProvider: service.idProvider,
          idCity: service.idCity,
          idCategory: service.idCategory,
          capacity: service.capacity
        }
      },
      updateService() {
        axios({
          method: 'put',
          url: 'http://localhost:3000/services/updateService',
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
          data: this.editedService
        }).then(result => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare serviciu";
          this.textInfoModal = "Serviciul a fost actualizat cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "updating";
          this.titleInfoModal = "Actualizare serviciu";
          this.textInfoModal = "A apărut o eroare la acțiunea de actualizare! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      closeEditService(){
        this.enabledEditService = false;
        this.editedService = {
          idService:"",
          nameService: "",
          location: "",
          image1Service: "",
          image2Service: "",
          image3Service: "",
          image4Service: "",
          shortDescription: "",
          longDescription: "",
          siteLink: "",
          idProvider: "",
          company: "",
          idCity: "",
          city: "",
          idCategory: "",
          category: "",
          capacity: ""
        }
      },
      initiateDeleteService(idService, nameService) {
        this.titleConfirmationModal = "Confirmare ștergere serviciu"
        this.textConfirmationModal = "Sigur doriți să ștergeți serviciul " + nameService + "?";
        this.showConfirmationModal = true;
        this.idDeletedService = idService;
      },
      deleteService() {
        axios({
          method: 'delete',
          url: 'http://localhost:3000/services/deleteService/' + this.idDeletedService,
           headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
        }).then(result => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere serviciu";
          this.textInfoModal = "Serviciul a fost șters cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.actionInfoModal = "deleting";
          this.titleInfoModal = "Ștergere serviciu";
          this.textInfoModal = "A apărut o eroare la acțiunea de ștergere! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      okInfoModal() {
        switch(this.actionInfoModal) {
          case "adding":
            this.enabledAddService = false;
            this.getServices();
            break;
          case "updating":
            this.enabledEditService = false;
            this.getServices();
            break;
          case "deleting":
            this.idDeletedService = 0;
            this.getServices();
            break;
        }
      },
      okConfirmationModal() {
        this.deleteService();
      }
    },
    mounted() {
      this.getServicesNumber();
      this.getProviders();
      this.getCategoriesServices();
      this.getCities();
    },
  computed: {
    hasImage() {
      return !!this.image;
    }
  },
  // watch: {
  //   image(newValue, oldValue) {
  //     if (newValue !== oldValue) {
  //       if (newValue) {
  //         base64Encode(newValue)
  //           .then(value => {
  //             this.imageSrc = value;
  //           })
  //           .catch(() => {
  //             this.imageSrc = null;
  //           });
  //       } else {
  //         this.imageSrc = null;
  //       }
  //     }
  //   }
  // }
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