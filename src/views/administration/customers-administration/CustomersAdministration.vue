<template>
    <div class="admin-customers">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="table-section">
        <p class="title-admin">Clienți <span class="small-element-title">({{customersNumber}})</span></p>
        <b-row class="row-admin add-button"> 
           <b-button class="initiate-add-button" @click="redirectToPage('/administrare/adaugare-client/' + $route.params.idUser)"><font-awesome-icon class="plus-icon" icon="fa-solid fa-plus"/>Adăugare client</b-button>
        </b-row>
        <b-row class="row-admin">
          <b-table bordered striped :fields="fieldsTable" :items="customers" :busy="isLoading" responsive="sm" class="customers-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(index)>Index</template>
              <template #head(company)>Nume companie</template>
              <template #head(completeNameRepresentative)>Nume Reprezentant</template>
              <template #head(emailRepresentative)>Email Reprezentant</template>
              <template #head(phoneRepresentative)>Telefon Reprezentant</template>
              <template #head(subscriptionType)>Tip abonament</template>
              <template #head(name)>Denumire</template>
              <template #head(location)>Locație</template>
              <template #head(city)>Oraș</template>
              <template #head(website)>Site</template>
              <template #head(phone)>Telefon companie</template>
              <template #head(companyEmail)>Email companie</template>
              <template #head(shortDescription)>Descriere scurtă</template>
              <template #head(longDescription)>Descriere detaliată</template>
              <template #head(image1)>Imagine 1</template>
              <template #head(image2)>Imagine 2</template>
              <template #head(image3)>Imagine 3</template>
              <template #head(image4)>Imagine 4</template>
              <template #head(image5)>Imagine 5</template>
              <template #head(image6)>Imagine 6</template>
              <template #head(image7)>Imagine 7</template>
              <template #head(image8)>Imagine 8</template>
              <template #head(image9)>Imagine 9</template>
              <template #head(image10)>Imagine 10</template>
              <template #head(image11)>Imagine 11</template>
              <template #head(image12)>Imagine 12</template>
              <template #head(image13)>Imagine 13</template>
              <template #head(image14)>Imagine 14</template>
              <template #head(image15)>Imagine 15</template>
              <template #head(image16)>Imagine 16</template>
              <template #head(image17)>Imagine 17</template>
              <template #head(image18)>Imagine 18</template>
              <template #head(image19)>Imagine 19</template>
              <template #head(image20)>Imagine 20</template>
              <template #head(minimumCapacity)>Capacitate minimă</template>
              <template #head(maximumCapacity)>Capacitate maximă</template>
              <template #head(numberHall)>Număr săli</template>
              <template #head(category)>Categorie</template>
              <template #head(action)>Acțiune</template>
              <template #cell(index)="data">
                <b>{{ data.index + iteration + 1 }}</b>
              </template>
              <template #cell(company)="data">
                {{data.item.company}}
              </template>
              <template #cell(completeNameRepresentative)="data">
                {{data.item.completeNameRepresentative}}
              </template>
              <template #cell(emailRepresentative)="data">
                {{ data.item.emailRepresentative }}
              </template>
              <template #cell(phoneRepresentative)="data">
                {{ data.item.phoneRepresentative }}
              </template>
              <template #cell(subscriptionType)="data">
                {{ data.item.subscriptionType }}
              </template>
              <template #cell(name)="data">
                {{ data.item.name }}
              </template>
              <template #cell(location)="data">
                {{ data.item.location }}
              </template>
              <template #cell(city)="data">
                {{ data.item.city }}
              </template>
              <template #cell(website)="data">
                {{ data.item.website }}
              </template>
              <template #cell(phone)="data">
                {{ data.item.phone }}
              </template>
              <template #cell(companyEmail)="data">
                {{ data.item.companyEmail }}
              </template>
              <template #cell(shortDescription)="data">
                {{ substring(data.item.shortDescription, 200) }}
              </template>
              <template #cell(longDescription)="data">
                {{ substring(data.item.longDescription, 300) }}
              </template>
              <template #cell(image1)="data">
                {{ substring(data.item.image1, 50) }}
              </template>
              <template #cell(image2)="data">
                {{ substring(data.item.image2, 50) }}
              </template>
              <template #cell(image3)="data">
                {{ substring(data.item.image3, 50) }}
              </template>
              <template #cell(image4)="data">
                {{ substring(data.item.image4, 50) }}
              </template>
              <template #cell(image5)="data">
                {{ substring(data.item.image5, 50) }}
              </template>
              <template #cell(image6)="data">
                {{ substring(data.item.image6, 50) }}
              </template>
              <template #cell(image7)="data">
                {{ substring(data.item.image7, 50) }}
              </template>
              <template #cell(image8)="data">
                {{ substring(data.item.image8, 50) }}
              </template>
              <template #cell(image9)="data">
                {{ substring(data.item.image9, 50) }}
              </template>
              <template #cell(image10)="data">
                {{ substring(data.item.image10, 50)}}
              </template>
              <template #cell(image11)="data">
                {{ substring(data.item.image11, 50) }}
              </template>
              <template #cell(image12)="data">
                {{ substring(data.item.image12, 50) }}
              </template>
              <template #cell(image13)="data">
                {{ substring(data.item.image13, 50) }}
              </template>
              <template #cell(image14)="data">
                {{ substring(data.item.image14, 50) }}
              </template>
              <template #cell(image15)="data">
                {{ substring(data.item.image15, 50) }}
              </template>
              <template #cell(image16)="data">
                {{ substring(data.item.image16, 50) }}
              </template>
              <template #cell(image17)="data">
                {{ substring(data.item.image17, 50) }}
              </template>
              <template #cell(image18)="data">
                {{ substring(data.item.image18, 50) }}
              </template>
              <template #cell(image19)="data">
                {{ substring(data.item.image19, 50) }}
              </template>
              <template #cell(image20)="data">
                {{ substring(data.item.image20, 50)}}
              </template>
             <template #cell(minimumCapacity)="data">
                {{ data.item.minimumCapacity }}
              </template>
              <template #cell(maximumCapacity)="data">
                {{ data.item.maximumCapacity }}
              </template>
              <template #cell(numberHall)="data">
                {{ data.item.numberHall }}
              </template>
              <template #cell(category)="data">
                {{ data.item.category }}
              </template>
              <template #cell()="data">
                <font-awesome-icon icon="fa-solid fa-pencil" class="pencil-icon" @click="redirectToPage('/administrare/editare-client/' + data.item.idCustomer + '/' + data.item.idCustomerService + '/'+ $route.params.idUser)"/>
                <font-awesome-icon icon="fa-solid fa-trash-can" class="trash-icon" @click="initiateDeleteCustomer(data.item.idCustomer, data.item.idCustomerService, data.item.company)"/>
              </template>
          </b-table>
        </b-row>
        <b-row class="row-admin">
          <b-pagination
            v-model="currentPage"
            :total-rows="customersNumber"
            :per-page="perPageCustomers"
            @input="getCustomers()"
            class="admin-pagination-table"
          ></b-pagination>
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
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
import $ from "jquery";
 export default {
    components: {
      AdminHeader
    },
    data() {
      return {
        customersNumber: "",
        isLoading: true,
        customers: [],
        fieldsTable: 
        ['Index', { key: 'company', label: 'Companie' }, { key: 'completeNameRepresentative', label: 'Nume Reprezentant'}, { key: 'emailRepresentative', label: 'Email Reprezentant'}, 
        { key: 'emailRepresentative', label: 'Email Reprezentant'}, { key: 'phoneRepresentative', label: 'Telefon Reprezentant'}, { key: 'subscriptionType', label: 'Tip abonament'},
        { key: 'name', label: 'Denumire'}, { key: 'location', label: 'Locație'}, { key: 'city', label: 'Oraș'}, { key: 'website', label: 'Site'}, { key: 'phone', label: 'Telefon'}, { key: 'companyEmail', label: 'Email'}, { key: 'shortDescription', label: 'Descriere Scurtă'}, 
        { key: 'longDescription', label: 'Descriere Lungă'}, { key: 'image1', label: 'Imagine 1'}, { key: 'image2', label: 'Imagine 2'}, { key: 'image3', label: 'Imagine 3'}, { key: 'image4', label: 'Imagine 4'}, 
        { key: 'image5', label: 'Imagine 5'}, { key: 'image6', label: 'Imagine 6'}, { key: 'image7', label: 'Imagine 7'}, { key: 'image8', label: 'Imagine 8'}, { key: 'image9', label: 'Imagine 9'}, { key: 'image10', label: 'Imagine 10'},
        { key: 'image11', label: 'Imagine 11'}, { key: 'image12', label: 'Imagine 12'}, { key: 'image13', label: 'Imagine 13'}, { key: 'image14', label: 'Imagine 14'}, 
        { key: 'image15', label: 'Imagine 15'}, { key: 'image16', label: 'Imagine 16'}, { key: 'image17', label: 'Imagine 17'}, { key: 'image18', label: 'Imagine 18'}, { key: 'image19', label: 'Imagine 19'}, { key: 'image20', label: 'Imagine 20'},
        { key: 'minimumCapacity', label: 'Capacitate minimă'}, { key: 'maximumCapacity', label: 'Capacitate maximă'}, { key: 'numberHall', label: 'Număr săli'},
        { key: 'category', label: 'Capacitate'}, { key: 'action', label: 'Acțiune'}],
        currentPage: 1,
        perPageCustomers: 15,
        iteration: 0,
        idDeletedCustomer: "",
        idDeletedCustomerService: "",
        titleInfoModal: "",
        textInfoModal: "",
        actionInfoModal: "",
        showInfoModal: false,
        titleConfirmationModal: "",
        textConfirmationModal: "",
        showConfirmationModal: false,       
      }
    },
    methods: {
      getCustomersNumber() {
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/customers/getCustomersNumber"
        }).then(result => {
          this.customersNumber = result.data.customers_number;
          this.getCustomers();
        })
      },
      getCustomers() {
        let thisRef = this;
        this.iteration = (this.currentPage - 1) * this.perPageCustomers;
        if(this.isLoading !== true) {
          this.isLoading = true;
        }
        this.customers = [];
        axios({
          method: "get",
          headers: {"accept":"application/json"},
          url: "http://localhost:3000/customers/getAllCustomers/" + this.iteration
        }).then(result => {
          console.log(result)
          if(result.data.length > 0) {
            let customer = {
                idCustomer: 0,
                company: "",
                completeNameRepresentative: "",
                emailRepresentative: "",
                phoneRepresentative: "",
                subscriptionType: "",
                idCustomerService: 0,
                name: "",
                location: "",
                city: "",
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
                minimumCapacity: "",
                maximumCapacity: "",
                numberHall: "",
                category: ""
            }
            for(var i = 0; i < result.data.length; i++) {
              customer = {
                idCustomer: result.data[i].id_customer,
                company: result.data[i].name_company,
                completeNameRepresentative: result.data[i].name_representative,
                emailRepresentative: result.data[i].email_representative,
                phoneRepresentative: result.data[i].phone_representative,
                subscriptionType: result.data[i].subscription_type,
                idCustomerService: result.data[i].id_customer_service,
                name: result.data[i].name,
                location: result.data[i].location,
                city: result.data[i].city,
                website: result.data[i].website,
                phone: result.data[i].phone,
                companyEmail: result.data[i].company_email,
                shortDescription: result.data[i].short_description,
                longDescription: result.data[i].long_description,
                image1: result.data[i].image1,
                image2: result.data[i].image2,
                image3: result.data[i].image3,
                image4: result.data[i].image4,
                image5: result.data[i].image5,
                image6: result.data[i].image6,
                image7: result.data[i].image7,
                image8: result.data[i].image8,
                image9: result.data[i].image9,
                image10: result.data[i].image10,
                image11: result.data[i].image11,
                image12: result.data[i].image12,
                image13: result.data[i].image13,
                image14: result.data[i].image14,
                image15: result.data[i].image15,
                image16: result.data[i].image16,
                image17: result.data[i].image17,
                image18: result.data[i].image18,
                image19: result.data[i].image19,
                image20: result.data[i].image20,
                minimumCapacity: result.data[i].minimum_capacity,
                maximumCapacity: result.data[i].maximum_capacity,
                numberHall: result.data[i].number_hall,
                category: result.data[i].category
              } 
              this.customers.push(customer);                   
            }
            setTimeout(function() {
              thisRef.isLoading = false;
            }, 1000);
          }
        })
      },
      substring(item, strings) {
        if(item !== "" && item !== null && item !== undefined) {
          return item.substring(0,strings) + '...';
        } else {
          return item;
        }
      },
      redirectToPage(path) {
        this.$router.push(path);
      },
      initiateDeleteCustomer(idCustomer, idDeletedCustomerService, companyCustomer) {
        console.log(idCustomer, idDeletedCustomerService)
        this.titleConfirmationModal = "Confirmare ștergere client"
        this.textConfirmationModal = "Sigur doriți să ștergeți clientul " + companyCustomer + "?";
        this.showConfirmationModal = true;
        this.idDeletedCustomer = idCustomer;
        this.idDeletedCustomerService = idDeletedCustomerService;
      },
      deleteCustomer() {
        axios({
          method: 'delete',
          url: 'http://localhost:3000/customers/deleteCustomer/' + this.idDeletedCustomer + '/' + this.idDeletedCustomerService,
          mode: 'no-cors',
          headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
          },
          contentType: "application/json;odata=verbose",
        }).then(result => {
          this.titleInfoModal = "Ștergere client";
          this.textInfoModal = "Clientul a fost șters cu succes!";
          this.showInfoModal = true;
        }).catch(error => {
          this.titleInfoModal = "Ștergere client";
          this.textInfoModal = "A apărut o eroare la acțiunea de ștergere! Vă rugăm reîncercați";
          this.showInfoModal = true;
        })
      },
      okInfoModal() {
        this.idDeletedCustomer = 0;
        this.getCustomers();
      },
      okConfirmationModal() {
        this.deleteCustomer();
      }
    },
    mounted() {
      this.getCustomersNumber();
    }
  }
</script>
<style>
    .admin-customers {
      padding: 30px;
    }
    .customers-table {
      padding: 0 !important;
      overflow: auto !important;
    }
    .customers-table th:first-child  {
      width: 5% !important;
    }
    .customers-table th:last-child, .customers-table td:last-child  {
      text-align: center !important;
    }
</style>