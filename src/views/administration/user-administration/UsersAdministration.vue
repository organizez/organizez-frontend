<template>
    <div class="admin-users">
      <Admin-Header :idUser="$route.params.idUser"></Admin-Header>
      <b-row class="table-section">
        <p class="title-admin">Utilizatori <span class="small-element-title">({{usersNumber}})</span></p>
        <b-row class="row-admin">
          <b-table bordered striped :fields="fieldsTable" :items="users" :busy="isLoading" responsive="sm" class="users-table">
              <template #table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong>Loading...</strong>
                </div>
              </template>
              <template #head(index)>Index</template>
              <template #head(firstName)>Prenume</template>
              <template #head(lastName)>Nume</template>
              <template #head(email)>Email</template>
              <template #head(role)>Rol</template>
              <template #cell(index)="data">
                {{ data.index + iteration + 1 }}
              </template>
              <template #cell(firstName)="data">
                {{data.item.firstName}}
              </template>
              <template #cell(lastName)="data">
                {{data.item.lastName}}
              </template>
              <template #cell(email)="data">
                {{ data.item.email }}
              </template>
              <template #cell(role)="data">
                <i>{{ data.item.role }}</i>
              </template>
          </b-table>
        </b-row>
        <b-row class="row-admin">
          <b-pagination
            v-model="currentPage"
            :total-rows="usersNumber"
            :per-page="perPageUsers"
            @input="getUsers()"
            class="admin-pagination-table"
          ></b-pagination>
        </b-row>
      </b-row>
    </div>
</template>
<script>
import AdminHeader from "../../../components/AdminHeader.vue";
import axios from 'axios';
// import $ from "jquery";
 export default {
    components: {
      AdminHeader
    },
    data() {
        return {
            isLoading: true,
            usersNumber: "",
            users: [],
            fieldsTable: ['Index', { key: 'firstName', label: 'Prenume' },{ key: 'lastName', label: 'Nume'}, { key: 'email', label: 'Email'},{ key: 'role', label: 'Rol'}],
            currentPage: 1,
            perPageUsers: 15,
            iteration: 0
        }
    },
    methods: {
        getUsers() {
            let thisRef = this;
            this.iteration = (this.currentPage - 1) * this.perPageUsers;
            if(this.isLoading !== true) {
              this.isLoading = true;
            }
            console.log("iteration", this.iteration)
            this.users = [];
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "https://squid-app-q7qzv.ondigitalocean.app/be/users/getAllUsers/" + this.iteration
            }).then(result => {
                console.log(result)
                if(result.data.length > 0) {
                  let user = {
                    idUser: 0,
                    firstName: "",
                    lastName: "",
                    email: "",
                    role: ""
                  }
                  for(var i = 0; i < result.data.length; i++) {
                    user = {
                      idUser: result.data[i].id_user,
                      firstName: result.data[i].first_name,
                      lastName: result.data[i].last_name,
                      email: result.data[i].email,
                      role: result.data[i].role
                    } 
                    this.users.push(user);                   
                  }
                  setTimeout(function() {
                    thisRef.isLoading = false;
                  }, 1000);
                }
            })
        },
        getUsersNumber() {
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "https://squid-app-q7qzv.ondigitalocean.app/be/users/getUsersNumber"
            }).then(result => {
                this.usersNumber = result.data[0].users_number;
                this.getUsers();
            })
        }
    },
    mounted() {
        this.getUsersNumber();
    }
  }
</script>

<style>
    .title-admin {
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }
    .small-element-title {
      color: #8a817c;
      font-weight: 500;
    }
    .sr-only {
      display: none !important;
    }
    .admin-users {
      padding: 0px;
    }
    .users-table {
      padding: 0 !important;
      overflow: overlay;
    }
    .users-table th:first-child, .users-table th:nth-child(5) {
      width: 15% !important;
    }
    .users-table th:nth-child(2), .users-table th:nth-child(3) {
      width: 20% !important;
    }
    .users-table th:nth-child(4) {
      width: 30% !important;
    } 
    .table > :not(caption) > * > * {
      padding: 5px 15px !important;
      text-align: left !important;
      font-size: 14px;
      vertical-align: middle;
    }
</style>